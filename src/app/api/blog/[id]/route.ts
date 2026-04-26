import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    const id = searchParams.get('id');

    if (secret !== process.env.BLOG_ADMIN_SECRET || !id) {
      return NextResponse.json({ error: 'Unauthorized or missing ID' }, { status: 401 });
    }

    await connectDB();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
