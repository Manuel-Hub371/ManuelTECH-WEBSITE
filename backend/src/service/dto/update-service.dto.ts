import {
  IsString, IsOptional, IsArray, IsNumber,
} from 'class-validator';

export class UpdateServiceDto {
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() accentColor?: string;
  @IsOptional() @IsString() textAccent?: string;
  @IsOptional() @IsString() borderAccent?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() headline?: string;
  @IsOptional() @IsArray() body?: string[];
  @IsOptional() @IsArray() whoIsItFor?: string[];
  @IsOptional() @IsArray() outcomes?: string[];
  @IsOptional() @IsArray() items?: { name: string; description: string }[];
  @IsOptional() @IsArray() process?: { title: string; desc: string }[];
  @IsOptional() @IsArray() faqs?: { q: string; a: string }[];
  @IsOptional() @IsArray() relatedIds?: string[];
  @IsOptional() @IsNumber() sortOrder?: number;
}
