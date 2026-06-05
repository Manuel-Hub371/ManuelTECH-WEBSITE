import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @IsArray()
  @IsString({ each: true })
  body: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  authorRole: string;

  @IsString()
  @IsNotEmpty()
  authorImage: string;

  @IsString()
  @IsNotEmpty()
  publishedAt: string;

  @IsString()
  @IsNotEmpty()
  readTime: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
