import {
  Controller, Get, Put, Post, Patch, Delete,
  Body, Param, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/** Public endpoints — used by the About page */
@Controller('api/about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get('info')
  getInfo() {
    return this.aboutService.getCompanyInfo();
  }

  @Get('team')
  getTeam() {
    return this.aboutService.findAllMembers();
  }

  @Get('team/:id')
  getMember(@Param('id') id: string) {
    return this.aboutService.findOneMember(id);
  }

  /** Admin-only write endpoints */
  @Put('info')
  @UseGuards(JwtAuthGuard)
  updateInfo(@Body() dto: UpdateCompanyInfoDto) {
    return this.aboutService.updateCompanyInfo(dto);
  }

  @Post('team')
  @UseGuards(JwtAuthGuard)
  createMember(@Body() dto: CreateTeamMemberDto) {
    return this.aboutService.createMember(dto);
  }

  @Patch('team/:id')
  @UseGuards(JwtAuthGuard)
  updateMember(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.aboutService.updateMember(id, dto);
  }

  @Delete('team/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMember(@Param('id') id: string) {
    return this.aboutService.removeMember(id);
  }
}
