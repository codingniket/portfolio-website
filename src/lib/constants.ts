import { Cpu, Store } from "lucide-react";

export const socials = {
  github: "https://github.com/codingniket",
  x: "https://x.com/peacemaker00111",
  youtube: "https://www.youtube.com/@RayanBoot",
  leetcode: "https://leetcode.com/u/codingniket/",
  linkedin: "https://www.linkedin.com/in/niketbachhawat",
  email: "mailto:niketbachhawat7@gmail.com",
  phone: "tel:+916289906866",
};

export interface ExperienceItem {

  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
}

export const aiExperience: ExperienceItem[] = [
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
];

export const designAndBusinessExperience: ExperienceItem[] = [
  {
    role: "Founder & Business Owner",
    company: "PIXCEL INDIA",
    period: "Present",
    location: "Kolkata, India",
    summary:
      "Leading a full-service printing enterprise providing high-quality jobwork. Specialized in corporate gifting, custom books, diaries, calendars, and comprehensive printing services.",
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

export const skills = [
  "Cloud Computing",
  "Prompt Engineering",
  "Artificial Intelligence",
  "Python",
  "UI/UX Thinking",
];

export const certifications = [
  "Microsoft Certified: Azure Fundamentals",
  "Cloud Bootcamp - Sponsored by Google for Developers",
  "Python for Machine Learning & Data Science Masterclass",
  "The Complete Python Bootcamp",
  "Figma UI UX Design Essentials",
];
