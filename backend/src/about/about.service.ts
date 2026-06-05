import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyInfo } from './entities/company-info.entity';
import { TeamMember } from './entities/team-member.entity';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(CompanyInfo.name)
    private readonly infoModel: Model<CompanyInfo>,
    @InjectModel(TeamMember.name)
    private readonly memberModel: Model<TeamMember>,
  ) {}

  /* ── Company Info (singleton row, id = 1) ── */

  async getCompanyInfo(): Promise<CompanyInfo> {
    let info = await this.infoModel.findOne({ id: 1 }).exec();
    if (!info) {
      // Auto-create the singleton row on first access
      info = new this.infoModel({ id: 1 });
      await info.save();
    }
    return info;
  }

  async updateCompanyInfo(dto: UpdateCompanyInfoDto): Promise<CompanyInfo> {
    const info = await this.infoModel.findOneAndUpdate(
      { id: 1 },
      { $set: dto },
      { new: true, upsert: true }
    ).exec();
    return info;
  }

  /* ── Team Members ── */

  findAllMembers(): Promise<TeamMember[]> {
    return this.memberModel.find().sort({ sortOrder: 1, createdAt: 1 }).exec();
  }

  async findOneMember(id: string): Promise<TeamMember> {
    const member = await this.memberModel.findById(id).exec();
    if (!member) throw new NotFoundException(`Team member ${id} not found`);
    return member;
  }

  async createMember(dto: CreateTeamMemberDto): Promise<TeamMember> {
    const member = new this.memberModel(dto);
    return member.save();
  }

  async updateMember(id: string, dto: UpdateTeamMemberDto): Promise<TeamMember> {
    const member = await this.memberModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();
    if (!member) throw new NotFoundException(`Team member ${id} not found`);
    return member;
  }

  async removeMember(id: string): Promise<void> {
    const result = await this.memberModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Team member ${id} not found`);
  }
}
