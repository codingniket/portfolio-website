'use client';
import { useState } from 'react';
import { Lock, Trash2, Plus, ExternalLink } from 'lucide-react';

export default function AdminBlogPage() {
  const [secret, setSecret] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', url: '', description: '', category: 'Engineering' });

  async function checkAuth() {
    if (secret.length < 4) return;
    setIsAuthorized(true);
    fetchBlogs();
  }

  async function fetchBlogs() {
    const res = await fetch('/api/blog');
    const data = await res.json();
    setBlogs(data);
  }

  async function addBlog(e) {
    e.preventDefault();
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, secret }),
    });
    if (res.ok) {
      setForm({ title: '', url: '', description: '', category: 'Engineering' });
      fetchBlogs();
    } else {
      alert('Unauthorized or error adding blog');
    }
  }

  async function deleteBlog(id) {
    if (!confirm('Delete this blog link?')) return;
    const res = await fetch(`/api/blog/${id}?secret=${secret}`, { method: 'DELETE' });
    if (res.ok) {
      fetchBlogs();
    } else {
      alert('Unauthorized or error deleting blog');
    }
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
          <div className="flex flex-col items-center gap-4 text-center mb-6">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Access</h2>
            <p className="text-slate-500 text-sm">Enter the secret key to manage blog posts</p>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Secret Key"
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <button onClick={checkAuth} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
          <button
            onClick={() => setIsAuthorized(false)}
            className="text-sm text-slate-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-md border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus size={18} /> Add New Medium Article
          </h2>
          <form onSubmit={addBlog} className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Article Title"
              className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              placeholder="Medium URL"
              className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
            />
            <input
              placeholder="Short Description"
              className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <select
              className="px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Engineering">Engineering</option>
              <option value="AI">AI</option>
              <option value="Product">Product</option>
              <option value="General">General</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Publish Link
            </button>
          </form>
        </section>

        <section className="grid gap-4">
          <h2 className="text-lg font-semibold text-slate-700">Published Articles</h2>
          {blogs.length === 0 ? (
            <p className="text-slate-500 text-center py-10">No articles found.</p>
          ) : (
            blogs.map((blog: any) => (
              <div key={blog._id} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-900">{blog.title}</span>
                  <span className="text-xs text-slate-500 truncate max-w-md">{blog.url}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href={blog.url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                  <button onClick={() => deleteBlog(blog._id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
