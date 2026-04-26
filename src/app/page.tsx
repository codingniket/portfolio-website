'use client';
import { useState } from "react";
import DigitalTwinChat from "@/components/digital-twin-chat";
import { Mail, Linkedin, Phone, User, Store, Cpu, Award, Briefcase, Github, Youtube } from "lucide-react";
import {
  aiExperience,
  designAndBusinessExperience,
  skills,
  certifications,
  socials
} from "@/lib/constants";
import { TimelineNode } from "@/components/timeline-node";
import FollowMeCTA from "@/components/follow-me-cta";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'ai' | 'business'>('ai');

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="atmosphere" aria-hidden="true" />

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/20 glass px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 transition-transform group-hover:rotate-12" />
            <span className="text-lg font-bold tracking-tight text-slate-900">NB</span>
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition-all hover:text-blue-600 hover:translate-y-[-1px]">About</a>
            <a href="#experience" className="transition-all hover:text-blue-600 hover:translate-y-[-1px]">Experience</a>
            <a href="#ai" className="transition-all hover:text-blue-600 hover:translate-y-[-1px]">AI Twin</a>
            <a href="/blog" className="transition-all hover:text-blue-600 hover:translate-y-[-1px]">Blog</a>
          </nav>
          <a
            href="https://www.linkedin.com/in/niketbachhawat"
            target="_blank"
            rel="noopener noreferrer"
            className="action action-primary py-2 text-xs flex items-center gap-2"
          >
            <Linkedin size={14} /> Connect
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-20 pt-32 md:px-10">
        {/* Hero Section */}
        <section id="about" className="reveal-up grid gap-10 rounded-3xl border border-white/40 bg-white/60 p-8 shadow-2xl backdrop-blur-md md:grid-cols-[1.2fr_0.8fr] md:p-12 glass">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-2">
              <p className="chip w-fit">Available for strategic product engineering roles</p>
            </div>
            <div className="space-y-5">
              <h1 className="text-5xl leading-tight font-extrabold tracking-tighter text-slate-950 md:text-7xl">
                Niket Bachhawat
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
                Associate Software Engineer blending{" "}
                <span className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4">enterprise execution</span> with{" "}
                <span className="text-cyan-600 font-bold underline decoration-cyan-200 underline-offset-4">creative product instinct</span>. I build AI-aware,
                cloud-ready software experiences that are practical, polished,
                and built to scale.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={socials.email} className="action action-secondary flex items-center gap-2">
                <Mail size={16} /> Email Me
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="action action-secondary flex items-center gap-2"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="action action-secondary flex items-center gap-2">
                <Github size={16} /> GitHub
              </a>
              <a href={socials.x} target="_blank" rel="noopener noreferrer" className="action action-secondary flex items-center gap-2">
                <span className="font-bold text-xs">𝕏</span> X
              </a>
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="action action-secondary flex items-center gap-2">
                <Youtube size={16} /> YouTube
              </a>
              <a href={socials.phone} className="action action-secondary flex items-center gap-2">
                <Phone size={16} /> Call
              </a>
            </div>
          </div>

          <aside className="reveal-up-delayed space-y-6 rounded-2xl p-6 text-slate-900 glass">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <User size={16} />
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase">Professional Snapshot</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card">
                <p className="metric-value text-slate-900">6+</p>
                <p className="metric-label text-slate-600">Roles Across Design + Engineering</p>
              </div>
              <div className="metric-card">
                <p className="metric-value text-slate-900">3</p>
                <p className="metric-label text-slate-600">Core Tracks: Cloud, AI, Product</p>
              </div>
              <div className="metric-card col-span-2">
                <p className="metric-value text-slate-900">2021 - 2025</p>
                <p className="metric-label text-slate-600">B.Tech in CSE (Data Science), Techno Main Salt Lake</p>
              </div>
            </div>
          </aside>
        </section>

        {/* Content Grid */}
        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <article id="about-me" className="reveal-up rounded-3xl border border-white/40 bg-white/60 p-7 shadow-lg backdrop-blur-md md:p-10 glass">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <User size={20} />
              </div>
              <h2 className="section-title">About Me</h2>
            </div>
            <p className="text-base leading-relaxed text-slate-700 md:text-lg">
              I enjoy solving complex business problems through thoughtful
              software. My background started in visual design and evolved into
              software engineering, which gives me a rare balance: I care deeply
              about architecture <em className="text-blue-600 font-semibold italic">and</em> experience. I am currently focused
              on cloud-native delivery, prompt-centric AI workflows, and
              practical systems that move from idea to impact quickly.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </article>

          <article className="reveal-up-delayed rounded-3xl border border-white/40 bg-white/60 p-7 shadow-lg backdrop-blur-md md:p-10 glass">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                <Award size={20} />
              </div>
              <h2 className="section-title">Certifications</h2>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {certifications.map((item) => (
                <li key={item} className="list-row">
                  <span className="list-dot" aria-hidden="true" />
                  <span className="hover:text-blue-600 transition-colors cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Career Experience Split */}
        <section id="experience" className="flex flex-col gap-12">
          <div className="flex justify-center mb-4">
            <div className="inline-flex p-1 rounded-full bg-white/40 border border-white/60 backdrop-blur-md glass shadow-sm">
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeTab === 'ai'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AI & Engineering
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeTab === 'business'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Business & Design
              </button>
            </div>
          </div>

          <div key={activeTab}>
            {activeTab === 'ai' ? (
              <div className="reveal-up space-y-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Cpu size={24} />
                  </div>
                  <h2 className="section-title">AI & Software Engineering</h2>
                </div>
                <div className="space-y-6">
                  {aiExperience.map((item, index) => (
                    <TimelineNode key={`${item.role}-${item.company}-${index}`} item={item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="reveal-up-delayed space-y-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                    <Store size={24} />
                  </div>
                  <h2 className="section-title">Business & Design</h2>
                </div>
                <div className="space-y-6">
                  {designAndBusinessExperience.map((item, index) => (
                    <TimelineNode key={`${item.role}-${item.company}-${index}`} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* AI Digital Twin */}
        <div id="ai" className="reveal-up-delayed">
           <DigitalTwinChat />
        </div>

        <div className="reveal-up">
          <FollowMeCTA />
        </div>

        {/* Footer */}
        <footer className="mx-auto w-full max-w-6xl border-t border-white/20 py-12 text-center text-slate-500">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400" />
              <p className="text-sm font-medium text-slate-700">Niket Bachhawat</p>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href={socials.x} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                <span className="font-bold text-lg">𝕏</span>
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                <Youtube size={20} />
              </a>
              <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                <span className="text-xs font-bold">LeetCode</span>
              </a>
            </div>

            <p className="text-xs">
              &copy; {new Date().getFullYear()} All rights reserved. Built with Next.js & Ollama.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
