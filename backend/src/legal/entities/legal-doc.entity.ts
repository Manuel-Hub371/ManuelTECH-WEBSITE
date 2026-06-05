import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  _id: false,
})
export class LegalSection {
  @Prop({ required: true })
  heading: string;

  @Prop({ type: [String], default: [] })
  paragraphs: string[];
}

export const LegalSectionSchema = SchemaFactory.createForClass(LegalSection);

@Schema({
  timestamps: true,
  collection: 'legal_docs',
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
export class LegalDoc extends Document {
  @Prop({ required: true, unique: true, index: true })
  type: string; // 'privacy' | 'terms' | 'cookies' | 'disclaimer'

  @Prop({ required: true })
  title: string;

  @Prop({ default: Date.now })
  lastUpdated: Date;

  @Prop({ type: [LegalSectionSchema], default: [] })
  sections: LegalSection[];
}

export const LegalDocSchema = SchemaFactory.createForClass(LegalDoc);
