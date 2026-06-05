import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'case_studies',
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
export class CaseStudy extends Document {
  @Prop()
  title: string;

  @Prop()
  client: string;

  @Prop()
  category: string;

  @Prop()
  industry: string;

  @Prop()
  description: string;

  @Prop()
  challenge: string;

  @Prop()
  solution: string;

  @Prop({ type: [String], default: [] })
  results: string[];

  @Prop({ type: [String], default: [] })
  techStack: string[];

  @Prop({ default: null })
  image: string;
}

export const CaseStudySchema = SchemaFactory.createForClass(CaseStudy);
