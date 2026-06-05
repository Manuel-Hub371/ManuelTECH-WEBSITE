import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'team_members',
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
export class TeamMember extends Document {
  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: null })
  image: string;

  @Prop({ default: null })
  github: string;

  @Prop({ default: null })
  linkedin: string;

  @Prop({ default: null })
  twitter: string;

  @Prop({ default: null })
  instagram: string;

  @Prop({ default: null })
  whatsapp: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  portfolio: string;

  @Prop({ default: null })
  email: string;

  @Prop({ default: 0 })
  sortOrder: number;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
