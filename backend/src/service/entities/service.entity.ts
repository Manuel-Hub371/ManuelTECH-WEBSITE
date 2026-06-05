import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'services',
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
export class Service extends Document {
  @Prop({ unique: true })
  slug: string;

  @Prop()
  title: string;

  @Prop({ default: 'Code2' })
  icon: string;

  @Prop()
  description: string;

  @Prop({ default: 'bg-primary-600' })
  accentColor: string;

  @Prop({ default: 'text-primary-600' })
  textAccent: string;

  @Prop({ default: 'border-l-primary-600' })
  borderAccent: string;

  @Prop({ default: null })
  image: string;

  @Prop({ default: '' })
  headline: string;

  @Prop({ type: [String], default: [] })
  body: string[];

  @Prop({ type: [String], default: [] })
  whoIsItFor: string[];

  @Prop({ type: [String], default: [] })
  outcomes: string[];

  @Prop({ type: [Object], default: [] })
  items: { name: string; description: string }[];

  @Prop({ type: [Object], default: [] })
  process: { title: string; desc: string }[];

  @Prop({ type: [Object], default: [] })
  faqs: { q: string; a: string }[];

  @Prop({ type: [String], default: [] })
  relatedIds: string[];

  @Prop({ default: 0 })
  sortOrder: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
