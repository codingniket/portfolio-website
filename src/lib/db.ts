import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = mongoose.connect(MONGODB_URI);
  (global as any).mongoose = cached;
}

export async function connectDB() {
  if (cached?.isConnected) return cached;
  if (!cached) {
    cached = await mongoose.connect(MONGODB_URI);
    (global as any).mongoose = cached;
  }
  return cached;
}

export default connectDB;
