import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'blog_posts',
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      const anyRet = ret as any;
      anyRet.id = anyRet._id.toString();
      delete anyRet._id;
      delete anyRet.__v;
      return anyRet;
    },
  },
  toObject: {
    virtuals: true,
  },
})
export class BlogPost extends Document {
  @Prop({ unique: true })
  slug: string;

  @Prop()
  title: string;

  @Prop()
  excerpt: string;

  @Prop({ type: [String], default: [] })
  body: string[];

  @Prop()
  category: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  author: string;

  @Prop()
  authorRole: string;

  @Prop()
  authorImage: string;

  @Prop()
  publishedAt: string;

  @Prop()
  readTime: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  featured: boolean;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
