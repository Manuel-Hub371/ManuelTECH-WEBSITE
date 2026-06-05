import { IsString, IsOptional } from 'class-validator';

export class UpdateCompanyInfoDto {
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() tagline?: string;
  @IsOptional() @IsString() heroDescription?: string;
  @IsOptional() @IsString() storyParagraph1?: string;
  @IsOptional() @IsString() storyParagraph2?: string;
  @IsOptional() @IsString() storyParagraph3?: string;
  @IsOptional() @IsString() storyImage?: string;
  @IsOptional() @IsString() founderQuote?: string;
  @IsOptional() @IsString() founderName?: string;
  @IsOptional() @IsString() mission?: string;
  @IsOptional() @IsString() vision?: string;
  @IsOptional() @IsString() statYears?: string;
  @IsOptional() @IsString() statProjects?: string;
  @IsOptional() @IsString() statClients?: string;
  @IsOptional() @IsString() statCountries?: string;
  @IsOptional() @IsString() hiringEmail?: string;
  @IsOptional() @IsString() hiringText?: string;

  /* Contact */
  @IsOptional() @IsString() contactEmail?: string;
  @IsOptional() @IsString() contactPhone?: string;
  @IsOptional() @IsString() contactWhatsapp?: string;
  @IsOptional() @IsString() contactLocation?: string;
  @IsOptional() @IsString() contactMapEmbed?: string;
  @IsOptional() @IsString() businessHours?: string;

  /* Social */
  @IsOptional() @IsString() socialLinkedin?: string;
  @IsOptional() @IsString() socialTwitter?: string;
  @IsOptional() @IsString() socialInstagram?: string;
  @IsOptional() @IsString() socialFacebook?: string;
  @IsOptional() @IsString() socialYoutube?: string;
  @IsOptional() @IsString() socialGithub?: string;
}
