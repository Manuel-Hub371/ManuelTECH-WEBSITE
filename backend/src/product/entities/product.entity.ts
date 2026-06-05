import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'products',
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
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  tagline: string;

  @Prop()
  category: string;

  @Prop()
  status: string;

  @Prop()
  description: string;

  @Prop({ default: null })
  longDescription: string;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: [String], default: [] })
  techStack: string[];

  @Prop({ default: null })
  image: string;

  @Prop({ default: 'bg-primary-600' })
  accentColor: string;

  @Prop({ default: 'text-primary-600' })
  textAccent: string;

  @Prop({ default: 'border-l-primary-600' })
  borderAccent: string;

  @Prop({ default: null })
  tryUrl: string;

  @Prop({ default: null })
  downloadUrl: string;

  @Prop({ default: null })
  readMoreUrl: string;

  @Prop({ default: null })
  learnMoreUrl: string;

  @Prop({ default: true })
  showInPortfolio: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
