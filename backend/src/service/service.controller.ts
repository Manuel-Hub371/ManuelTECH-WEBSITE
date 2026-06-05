import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  /** Public */
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.serviceService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  /** Admin-only */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
