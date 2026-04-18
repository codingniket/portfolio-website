import OpenAI, { AzureOpenAI } from "openai";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT?.trim();
const apiKey = process.env.AZURE_OPENAI_API_KEY?.trim();
const apiVersion = process.env.AZURE_OPENAI_API_VERSION?.trim() ?? "2024-10-21";
const model = "gpt-5.3";
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT ?? model;
const explicitChatCompletionsUrl =
  process.env.AZURE_OPENAI_CHAT_COMPLETIONS_URL?.trim() ?? "";
const explicitResponsesUrl =
  process.env.AZURE_OPENAI_RESPONSES_URL?.trim() ?? "";

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

function trimSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function buildDeploymentChatUrls(baseEndpoint: string): string[] {
  const clean = trimSlash(baseEndpoint);
  const base = `${clean}/openai/deployments/${deployment}/chat/completions`;

  return [base, `${base}?api-version=${apiVersion}`];
}

function messageTranscript(messages: ChatMessage[]): string {
  return messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n");
}

function extractChatText(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const maybe = payload as {
    choices?: Array<{ message?: { content?: string } }>;
    output_text?: string;
  };

  if (typeof maybe.output_text === "string" && maybe.output_text.trim()) {
    return maybe.output_text.trim();
  }

  const content = maybe.choices?.[0]?.message?.content;
  return typeof content === "string" ? content.trim() : "";
}

async function requestOpenAICompatible(
  baseEndpoint: string,
  normalized: ChatMessage[],
): Promise<string> {
  const clean = trimSlash(baseEndpoint);
  const messages = [
    { role: "system", content: systemPrompt },
    ...normalized.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  ];

  const transcript =
    messageTranscript(normalized) || "Tell me about Niket Bachhawat.";

  const headers = {
    "content-type": "application/json",
    authorization: `Bearer ${apiKey}`,
    "api-key": apiKey as string,
  };

  const attempts: Array<{
    url: string;
    body: Record<string, unknown>;
    label: string;
  }> = [
    ...(explicitChatCompletionsUrl
      ? [
          {
            label: "explicit-chat-url",
            url: explicitChatCompletionsUrl,
            body: {
              model,
              messages,
              max_completion_tokens: 420,
            },
          },
        ]
      : []),
    ...(explicitResponsesUrl
      ? [
          {
            label: "explicit-responses-url",
            url: explicitResponsesUrl,
            body: {
              model,
              input: [
                { role: "system", content: systemPrompt },
                { role: "user", content: transcript },
              ],
              max_output_tokens: 420,
            },
          },
        ]
      : []),
    ...buildDeploymentChatUrls(clean).map((url, index) => ({
      label:
        index === 0 ? "ey-deployment-chat" : "ey-deployment-chat-with-version",
      url,
      body: {
        messages,
        max_tokens: 420,
      },
    })),
    {
      label: "openai-chat-direct",
      url: `${clean}/chat/completions`,
      body: {
        model,
        messages,
        max_completion_tokens: 420,
      },
    },
    {
      label: "openai-chat-v1",
      url: `${clean}/v1/chat/completions`,
      body: {
        model,
        messages,
        max_completion_tokens: 420,
      },
    },
    {
      label: "openai-chat-openai-v1",
      url: `${clean}/openai/v1/chat/completions`,
      body: {
        model,
        messages,
        max_completion_tokens: 420,
      },
    },
    {
      label: "azure-deployment-chat",
      url: `${clean}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
      body: {
        messages,
        max_tokens: 420,
      },
    },
    {
      label: "openai-responses-direct",
      url: `${clean}/responses`,
      body: {
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transcript },
        ],
        max_output_tokens: 420,
      },
    },
    {
      label: "openai-responses-v1",
      url: `${clean}/v1/responses`,
      body: {
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transcript },
        ],
        max_output_tokens: 420,
      },
    },
    {
      label: "openai-responses-openai-v1",
      url: `${clean}/openai/v1/responses`,
      body: {
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transcript },
        ],
        max_output_tokens: 420,
      },
    },
  ];

  const errors: string[] = [];
  let pathNotFoundCount = 0;

  for (const attempt of attempts) {
    const response = await fetch(attempt.url, {
      method: "POST",
      headers,
      body: JSON.stringify(attempt.body),
    });

    const raw = await response.text();
    let parsed: unknown = null;
    try {
      parsed = raw ? (JSON.parse(raw) as unknown) : null;
    } catch {
      parsed = null;
    }

    if (response.ok) {
      const text = extractChatText(parsed);
      if (text) {
        return text;
      }

      errors.push(`${attempt.label}: empty response content`);
      continue;
    }

    const detail = raw ? raw.slice(0, 220) : "no body";
    errors.push(`${attempt.label}: ${response.status} ${detail}`);

    if ([404, 405].includes(response.status)) {
      pathNotFoundCount += 1;
    }

    if (![404, 405].includes(response.status)) {
      break;
    }
  }

  if (pathNotFoundCount === attempts.length) {
    throw new Error(
      `${errors.join(" | ")} | No compatible AI route was found. Set AZURE_OPENAI_CHAT_COMPLETIONS_URL to your gateway's exact chat endpoint URL.`,
    );
  }

  throw new Error(errors.join(" | "));
}

export async function POST(req: Request) {
  if (!endpoint || !apiKey) {
    return Response.json(
      {
        error:
          "Azure OpenAI is not configured. Set AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_API_KEY.",
      },
      { status: 500 },
    );
  }

  try {
    const body = (await req.json()) as { messages?: unknown };
    const normalized = normalizeMessages(body.messages);

    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
    });

    let text = "";

    try {
      const completion = await client.chat.completions.create({
        model: deployment,
        messages: [
          { role: "system", content: systemPrompt },
          ...normalized.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
        max_completion_tokens: 420,
      });

      text =
        typeof completion.choices?.[0]?.message?.content === "string"
          ? completion.choices[0].message.content.trim()
          : "";
    } catch {
      try {
        const response = await client.responses.create({
          model,
          input: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content:
                messageTranscript(normalized) ||
                "Tell me about Niket Bachhawat.",
            },
          ],
          max_output_tokens: 420,
        });

        text = (response.output_text ?? "").trim();
      } catch {
        const openAICompatible = new OpenAI({
          apiKey,
          baseURL: endpoint,
          defaultHeaders: {
            "api-key": apiKey,
          },
        });

        try {
          const response = await openAICompatible.responses.create({
            model,
            input: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content:
                  messageTranscript(normalized) ||
                  "Tell me about Niket Bachhawat.",
              },
            ],
            max_output_tokens: 420,
          });

          text = (response.output_text ?? "").trim();
        } catch {
          text = await requestOpenAICompatible(endpoint, normalized);
        }
      }
    }

    if (!text) {
      return Response.json(
        { error: "The Digital Twin returned an empty response." },
        { status: 502 },
      );
    }

    return Response.json({ answer: text });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return Response.json(
      { error: `Digital Twin request failed: ${message}` },
      { status: 500 },
    );
  }
}
