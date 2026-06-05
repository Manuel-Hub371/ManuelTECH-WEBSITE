import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() role: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() github?: string;
  @IsOptional() @IsString() linkedin?: string;
  @IsOptional() @IsString() twitter?: string;
  @IsOptional() @IsString() instagram?: string;
  @IsOptional() @IsString() whatsapp?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() portfolio?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsNumber() sortOrder?: number;
}
