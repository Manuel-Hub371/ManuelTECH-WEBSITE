import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'company_info',
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
export class CompanyInfo extends Document {
  @Prop({ default: 1 })
  id: number; // Keep this field for singleton compatibility

  @Prop({ default: 'ManuelTECH' })
  companyName: string;

  @Prop({ default: '' })
  tagline: string;

  @Prop({ default: '' })
  heroDescription: string;

  @Prop({ default: '' })
  storyParagraph1: string;

  @Prop({ default: '' })
  storyParagraph2: string;

  @Prop({ default: '' })
  storyParagraph3: string;

  @Prop({ default: '' })
  storyImage: string;

  @Prop({ default: '' })
  founderQuote: string;

  @Prop({ default: '' })
  founderName: string;

  @Prop({ default: '' })
  mission: string;

  @Prop({ default: '' })
  vision: string;

  @Prop({ default: '8+' })
  statYears: string;

  @Prop({ default: '50+' })
  statProjects: string;

  @Prop({ default: '30+' })
  statClients: string;

  @Prop({ default: '5' })
  statCountries: string;

  @Prop({ default: '' })
  hiringEmail: string;

  @Prop({ default: '' })
  hiringText: string;

  @Prop({ default: '' })
  contactEmail: string;

  @Prop({ default: '' })
  contactPhone: string;

  @Prop({ default: '' })
  contactWhatsapp: string;

  @Prop({ default: '' })
  contactLocation: string;

  @Prop({ default: '' })
  contactMapEmbed: string;

  @Prop({ default: '' })
  businessHours: string;

  @Prop({ default: '' })
  socialLinkedin: string;

  @Prop({ default: '' })
  socialTwitter: string;

  @Prop({ default: '' })
  socialInstagram: string;

  @Prop({ default: '' })
  socialFacebook: string;

  @Prop({ default: '' })
  socialYoutube: string;

  @Prop({ default: '' })
  socialGithub: string;
}

export const CompanyInfoSchema = SchemaFactory.createForClass(CompanyInfo);
