import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  body?: string[];

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  authorRole?: string;

  @IsOptional()
  @IsString()
  authorImage?: string;

  @IsOptional()
  @IsString()
  publishedAt?: string;

  @IsOptional()
  @IsString()
  readTime?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
