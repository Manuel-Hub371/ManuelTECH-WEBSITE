import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CaseStudyService } from './case-study.service';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/case-studies')
export class CaseStudyController {
  constructor(private readonly caseStudyService: CaseStudyService) {}

  /** Public */
  @Get()
  findAll() {
    return this.caseStudyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseStudyService.findOne(id);
  }

  /** Admin-only */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCaseStudyDto) {
    return this.caseStudyService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateCaseStudyDto) {
    return this.caseStudyService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.caseStudyService.remove(id);
  }
}
