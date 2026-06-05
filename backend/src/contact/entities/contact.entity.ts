import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'contacts',
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
export class Contact extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ default: null })
  phone: string;

  @Prop()
  subject: string;

  @Prop()
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
