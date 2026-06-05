import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consultation } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private readonly consultationModel: Model<Consultation>,
  ) {}

  async create(dto: CreateConsultationDto) {
    const consultation = new this.consultationModel(dto);
    return consultation.save();
  }

  findAll() {
    return this.consultationModel.find().sort({ createdAt: -1 }).exec();
  }

  count() {
    return this.consultationModel.countDocuments().exec();
  }
}
