import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LegalSectionDto {
  @IsString()
  @IsNotEmpty()
  heading: string;

  @IsArray()
  @IsString({ each: true })
  paragraphs: string[];
}

export class UpdateLegalDocDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LegalSectionDto)
  sections: LegalSectionDto[];
}
