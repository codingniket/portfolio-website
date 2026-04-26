'use client';
import { useEffect, useState } from 'react';
import { ExternalLink, BookOpen, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setBlogs(data);
      } catch (e) {
        console.error("Failed to fetch blogs", e);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 px-6 py-20 md:px-10">
      <div className="atmosphere" aria-hidden="true" />

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-16">
        <header className="reveal-up text-center space-y-4">
          <div className="inline-flex p-2 rounded-lg bg-blue-100 text-blue-600 mb-2">
            <BookOpen size={20} />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter text-slate-950 md:text-7xl">
            The Learning Lab
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            How Niket thinks and what he learns are shared here.
            A collection of insights on AI, Cloud, and Product Engineering.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No articles shared yet. Check back soon!
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((blog: any) => (
              <a
                key={blog._id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group reveal-up rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all hover:translate-y-[-4px] hover:shadow-xl glass"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {blog.category}
                    </span>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mt-2">
                    Read on Medium <ArrowRight size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
