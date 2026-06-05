import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaseStudy } from './entities/case-study.entity';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';

@Injectable()
export class CaseStudyService {
  constructor(
    @InjectModel(CaseStudy.name)
    private readonly caseStudyModel: Model<CaseStudy>,
  ) {}

  findAll(): Promise<CaseStudy[]> {
    return this.caseStudyModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<CaseStudy> {
    const study = await this.caseStudyModel.findById(id).exec();
    if (!study) throw new NotFoundException(`Case study ${id} not found`);
    return study;
  }

  async create(dto: CreateCaseStudyDto): Promise<CaseStudy> {
    const study = new this.caseStudyModel({
      ...dto,
      results: dto.results ?? [],
      techStack: dto.techStack ?? [],
    });
    return study.save();
  }

  async update(id: string, dto: UpdateCaseStudyDto): Promise<CaseStudy> {
    const study = await this.caseStudyModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();
    if (!study) throw new NotFoundException(`Case study ${id} not found`);
    return study;
  }

  async remove(id: string): Promise<void> {
    const result = await this.caseStudyModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Case study ${id} not found`);
  }

  async count(): Promise<number> {
    return this.caseStudyModel.countDocuments().exec();
  }
}
