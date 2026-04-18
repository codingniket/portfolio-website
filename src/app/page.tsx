import DigitalTwinChat from "@/components/digital-twin-chat";

const experience = [
  {
    role: "Associate Software Engineer",
    company: "EY",
    period: "Nov 2025 - Present",
    location: "Kolkata, India",
    summary:
      "Building cloud-forward solutions and AI-enabled workflows with an emphasis on reliability, delivery speed, and enterprise standards.",
  },
  {
    role: "Information Technology Intern",
    company: "The Antonym Collections",
    period: "Jul 2025 - Sep 2025",
    location: "Kolkata, India",
    summary:
      "Contributed to internal systems and workflow automation while partnering across teams to ship production-ready features.",
  },
  {
    role: "Software Engineer Intern",
    company: "SimpliFin.ai",
    period: "Dec 2024 - Feb 2025",
    location: "Kolkata, India",
    summary:
      "Worked on product features, implementation quality, and iteration cycles in a fast-moving fintech environment.",
  },
  {
    role: "Software Development Intern",
    company: "RoarInk",
    period: "Aug 2024 - Oct 2024",
    location: "Kolkata, India",
    summary:
      "Delivered web development tasks and strengthened full-stack engineering fundamentals through hands-on product work.",
  },
  {
    role: "UI Designer",
    company: "Skillarena.in",
    period: "Nov 2023 - Dec 2023",
    location: "India",
    summary:
      "Designed user-facing interfaces with a focus on usability, visual hierarchy, and strong interaction clarity.",
  },
  {
    role: "Graphic Designer",
    company: "Loud Revel & PLD Industries",
    period: "Jun 2022 - Aug 2023",
    location: "India",
    summary:
      "Built visual communication assets and sharpened design storytelling that now informs product and engineering decisions.",
  },
];

const skills = [
  "Cloud Computing",
  "Prompt Engineering",
  "Artificial Intelligence",
  "Python",
  "UI/UX Thinking",
];

const certifications = [
  "Microsoft Certified: Azure Fundamentals",
  "Cloud Bootcamp - Sponsored by Google for Developers",
  "Python for Machine Learning & Data Science Masterclass",
  "The Complete Python Bootcamp",
  "Figma UI UX Design Essentials",
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="atmosphere" aria-hidden="true" />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-20 pt-14 md:px-10">
        <section className="reveal-up grid gap-10 rounded-3xl border border-white/50 bg-white/70 p-8 shadow-[0_30px_100px_-50px_rgba(5,44,85,0.65)] backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div className="flex flex-col gap-7">
            <p className="chip w-fit">
              Available for strategic product engineering roles
            </p>
            <div className="space-y-5">
              <h1 className="text-4xl leading-tight font-bold tracking-tight text-slate-950 md:text-6xl">
                Niket Bachhawat
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
                Associate Software Engineer blending{" "}
                <strong>enterprise execution</strong> with{" "}
                <strong>creative product instinct</strong>. I build AI-aware,
                cloud-ready software experiences that are practical, polished,
                and built to scale.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:niketbachhawat7@gmail.com"
                className="action action-primary"
              >
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/niketbachhawat"
                target="_blank"
                rel="noopener noreferrer"
                className="action action-secondary"
              >
                LinkedIn
              </a>
              <a href="tel:+916289906866" className="action action-secondary">
                Call
              </a>
            </div>
          </div>

          <aside className="reveal-up-delayed space-y-5 rounded-2xl bg-slate-950 p-6 text-slate-100">
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-200">
              Snapshot
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card">
                <p className="metric-value">6+</p>
                <p className="metric-label">
                  Roles Across Design + Engineering
                </p>
              </div>
              <div className="metric-card">
                <p className="metric-value">3</p>
                <p className="metric-label">Core Tracks: Cloud, AI, Product</p>
              </div>
              <div className="metric-card col-span-2">
                <p className="metric-value">2021 - 2025</p>
                <p className="metric-label">
                  B.Tech in CSE (Data Science), Techno Main Salt Lake
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <article className="reveal-up rounded-3xl border border-slate-200/70 bg-white/80 p-7 shadow-[0_24px_70px_-50px_rgba(18,56,96,0.7)] backdrop-blur md:p-10">
            <h2 className="section-title">About Me</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              I enjoy solving complex business problems through thoughtful
              software. My background started in visual design and evolved into
              software engineering, which gives me a rare balance: I care deeply
              about architecture <em>and</em> experience. I am currently focused
              on cloud-native delivery, prompt-centric AI workflows, and
              practical systems that move from idea to impact quickly.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </article>

          <article className="reveal-up-delayed rounded-3xl border border-slate-200/70 bg-white/80 p-7 shadow-[0_24px_70px_-50px_rgba(18,56,96,0.7)] backdrop-blur md:p-10">
            <h2 className="section-title">Certifications</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {certifications.map((item) => (
                <li key={item} className="list-row">
                  <span className="list-dot" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="reveal-up rounded-3xl border border-slate-200/70 bg-white/85 p-7 shadow-[0_24px_70px_-50px_rgba(18,56,96,0.7)] backdrop-blur md:p-10">
          <h2 className="section-title">Career Journey</h2>
          <div className="mt-8 space-y-6">
            {experience.map((item) => (
              <article
                key={`${item.role}-${item.company}`}
                className="timeline-row"
              >
                <div className="timeline-track" aria-hidden="true">
                  <span className="timeline-node" />
                </div>
                <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.role} · {item.company}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {item.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                    {item.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <DigitalTwinChat />

        <section className="reveal-up-delayed rounded-3xl border border-cyan-200/60 bg-[linear-gradient(140deg,#e7f6ff_0%,#f3faff_45%,#e7fff8_100%)] p-7 shadow-[0_28px_80px_-55px_rgba(24,94,120,0.8)] md:p-10">
          <h2 className="section-title">Portfolio (Coming Soon)</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">
            A curated portfolio of engineering case studies, cloud projects, and
            AI experiments is in progress. The section will feature real
            delivery outcomes, architecture decisions, and measurable impact.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/niketbachhawat"
              target="_blank"
              rel="noopener noreferrer"
              className="action action-primary"
            >
              Follow Updates on LinkedIn
            </a>
            <button
              type="button"
              className="action action-disabled"
              aria-disabled="true"
            >
              Portfolio Link: Launching Soon
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
