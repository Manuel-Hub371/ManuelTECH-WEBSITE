import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { LegalService } from './legal.service';
import { UpdateLegalDocDto } from './dto/update-legal-doc.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/legal')
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  @Get(':type')
  async getOne(@Param('type') type: string) {
    return this.legalService.findOne(type);
  }

  @Put(':type')
  @UseGuards(JwtAuthGuard)
  async update(@Param('type') type: string, @Body() dto: UpdateLegalDocDto) {
    return this.legalService.update(type, dto);
  }
}
