import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  url: string;
  description: string;
  category: string;
  createdAt: Date;
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'Engineering' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
