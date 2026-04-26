import React from 'react';
import { Github, Twitter, Youtube, Linkedin, ExternalLink } from 'lucide-react';
import { socials } from '@/lib/constants';

export default function FollowMeCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 p-8 shadow-2xl transition-transform hover:scale-[1.01]">
      {/* Decorative Background Elements */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center text-white">
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Let's build the future together.
          </h2>
          <p className="mx-auto max-w-md text-lg opacity-90">
            I'm always open to collaborating on ambitious projects, discussing AI
            architecture, or sharing insights on product engineering.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:scale-105"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href={socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-md border border-white/30 transition-all hover:bg-white/30 hover:scale-105"
          >
            <span className="font-bold text-lg">𝕏</span> X
          </a>
          <a
            href={socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-md border border-white/30 transition-all hover:bg-white/30 hover:scale-105"
          >
            <Youtube size={18} /> YouTube
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium opacity-70">
          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Currently exploring Generative AI & Cloud Native Scale
        </div>
      </div>
    </section>
  );
}
