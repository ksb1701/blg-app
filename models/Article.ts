import mongoose, { Schema, Document } from 'mongoose';

// 1. TypeScript Interface
export interface IArticle extends Document {
  title: string;
  slug: string;
  description: string;
  banner: string;
  content: string;
  featured: boolean; // Added this field
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema
const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    banner: { type: String, default: 'Banner Placeholder' },
    content: { type: String, required: true },
    featured: { type: Boolean, default: false }, // Added this field
  },
  { timestamps: true }
);

// 3. Export model
export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);