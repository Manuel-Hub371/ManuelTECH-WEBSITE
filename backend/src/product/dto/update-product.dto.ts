import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsIn,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  @IsIn(['AI', 'Software', 'Fintech', 'Developer Tools'])
  category?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Live', 'Beta', 'In Development'])
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  accentColor?: string;

  @IsOptional()
  @IsString()
  textAccent?: string;

  @IsOptional()
  @IsString()
  borderAccent?: string;

  @IsOptional()
  @IsString()
  tryUrl?: string;

  @IsOptional()
  @IsString()
  downloadUrl?: string;

  @IsOptional()
  @IsString()
  readMoreUrl?: string;

  @IsOptional()
  @IsString()
  learnMoreUrl?: string;

  @IsOptional()
  @IsBoolean()
  showInPortfolio?: boolean;
}
