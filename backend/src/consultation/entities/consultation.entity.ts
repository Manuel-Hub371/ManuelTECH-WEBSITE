import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'consultations',
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
export class Consultation extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  company: string;

  @Prop({ default: null })
  serviceInterest: string;

  @Prop({ default: null })
  preferredDate: string;

  @Prop({ default: null })
  message: string;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
