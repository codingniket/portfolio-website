import React from "react";

interface TimelineNodeProps {
  item: {
    role: string;
    company: string;
    period: string;
    location: string;
    summary: string;
  };
}

export function TimelineNode({ item }: TimelineNodeProps) {
  return (
    <article className="timeline-row">
      <div className="timeline-track" aria-hidden="true">
        <span className="timeline-node" />
      </div>
      <div className="flex-1 rounded-2xl border border-white/40 bg-white/40 p-5 glass">
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
  );
}
