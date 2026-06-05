import {
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class UpdateCaseStudyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  client?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  challenge?: string;

  @IsOptional()
  @IsString()
  solution?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  results?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @IsOptional()
  @IsString()
  image?: string;
}
