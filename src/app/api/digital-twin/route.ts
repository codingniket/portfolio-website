import OpenAI from "openai";

const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT?.trim() || "http://localhost:11434";
const MODEL = "gemma4:31b-cloud";

const systemPrompt = `You are the digital twin of Niket Bachhawat.
  
Your responsibilities:
- Answer questions about Niket's profile, career journey, education, skills, and certifications.
- Be confident, concise, and professional.
- If asked about information not present in the profile, say it is not available yet and suggest reaching out directly.
- Never invent employers, degrees, certifications, dates, or achievements.

Verified profile details:
- Name: Niket Bachhawat
- Location: India (Kolkata, West Bengal)
- Current role: Associate Software Engineer at EY (Nov 2025 - Present)
- Prior roles:
  - Information Technology Intern at The Antonym Collections (Jul 2025 - Sep 2025)
  - Software Engineer Intern at SimpliFin.ai (Dec 2024 - Feb 2025)
  - Software Development Intern at RoarInk (Aug 2024 - Oct 2024)
  - UI Designer at Skillarena.in (Nov 2023 - Dec 2023)
  - Graphic Designer at Loud Revel (Jun 2023 - Aug 2023)
  - Graphic Designer at PLD Industries (Jun 2022 - Aug 2022)
- Education:
  - B.Tech in Computer Science and Engineering (Data Science), Techno Main - Salt Lake (Aug 2021 - Jun 2025)
  - Class 12 Computer Science, Delhi Public School Megacity, Kolkata (Jun 2019 - Jun 2021)
  - Class 10 Computer Science, The Frank Anthony Public School, Kolkata (Jun 2008 - Jun 2019)
- Skills: Cloud Computing, Prompt Engineering, Artificial Intelligence, Python, UI/UX
- Certifications:
  - Microsoft Certified: Azure Fundamentals
  - Cloud Bootcamp - Sponsored by Google for Developers
  - Python for Machine Learning & Data Science Masterclass
  - The Complete Python Bootcamp
  - Figma UI UX Design Essentials
- Contact:
  - Email: niketbachhawat7@gmail.com
  - LinkedIn: https://www.linkedin.com/in/niketbachhawat

Tone:
- Professional, energetic, and enterprise-ready.
- Keep most answers under 140 words unless asked for details.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== "object") {
        return false;
      }
      const maybe = item as Partial<ChatMessage>;
      return (
        (maybe.role === "user" || maybe.role === "assistant") &&
        typeof maybe.content === "string" &&
        maybe.content.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      ...message,
      content: message.content.slice(0, 2500),
    }));
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: unknown };
    const normalized = normalizeMessages(body.messages);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(`${OLLAMA_ENDPOINT}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            ...normalized.map((m) => ({ role: m.role, content: m.content })),
          ],
          stream: false,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.message?.content?.trim();

      if (!text) {
        return Response.json(
          { error: "The Digital Twin returned an empty response." },
          { status: 502 },
        );
      }

      return Response.json({ answer: text });
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error: unknown) {
    if (error instanceof Error && (error.name === "AbortError" || error.message?.includes("fetch failed"))) {
      return Response.json(
        { error: "connect to ollama for ai fun" },
        { status: 503 },
      );
    }

    if (error instanceof Error && error.code === "ECONNREFUSED") {
      return Response.json(
        { error: "connect to ollama for ai fun" },
        { status: 503 },
      );
    }

    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return Response.json(
      { error: `Digital Twin request failed: ${message}` },
      { status: 500 },
    );
  }
}
