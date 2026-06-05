import { Body, Controller, Post } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Controller('api/consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async create(@Body() dto: CreateConsultationDto) {
    await this.consultationService.create(dto);
    return {
      success: true,
      message: 'Your consultation request has been received. We will contact you shortly.',
    };
  }
}
