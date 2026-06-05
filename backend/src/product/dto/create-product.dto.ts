import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsIn,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tagline: string;

  @IsString()
  @IsIn(['AI', 'Software', 'Fintech', 'Developer Tools'])
  category: string;

  @IsString()
  @IsIn(['Live', 'Beta', 'In Development'])
  status: string;

  @IsString()
  @IsNotEmpty()
  description: string;

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
