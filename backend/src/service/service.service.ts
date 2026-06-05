import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>,
  ) {}

  findAll(): Promise<Service[]> {
    return this.serviceModel.find().sort({ sortOrder: 1, createdAt: 1 }).exec();
  }

  async findOne(id: string): Promise<Service> {
    const svc = await this.serviceModel.findById(id).exec();
    if (!svc) throw new NotFoundException(`Service ${id} not found`);
    return svc;
  }

  async findBySlug(slug: string): Promise<Service> {
    const svc = await this.serviceModel.findOne({ slug }).exec();
    if (!svc) throw new NotFoundException(`Service "${slug}" not found`);
    return svc;
  }

  async create(dto: CreateServiceDto): Promise<Service> {
    const existing = await this.serviceModel.findOne({ slug: dto.slug }).exec();
    if (existing) throw new ConflictException(`A service with slug "${dto.slug}" already exists`);
    const svc = new this.serviceModel({
      ...dto,
      body:        dto.body        ?? [],
      whoIsItFor:  dto.whoIsItFor  ?? [],
      outcomes:    dto.outcomes    ?? [],
      items:       dto.items       ?? [],
      process:     dto.process     ?? [],
      faqs:        dto.faqs        ?? [],
      relatedIds:  dto.relatedIds  ?? [],
    });
    return svc.save();
  }

  async update(id: string, dto: UpdateServiceDto): Promise<Service> {
    const svc = await this.findOne(id);
    if (dto.slug && dto.slug !== svc.slug) {
      const conflict = await this.serviceModel.findOne({ slug: dto.slug }).exec();
      if (conflict) throw new ConflictException(`A service with slug "${dto.slug}" already exists`);
    }
    const updated = await this.serviceModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();
    if (!updated) throw new NotFoundException(`Service ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Service ${id} not found`);
  }

  async count(): Promise<number> {
    return this.serviceModel.countDocuments().exec();
  }
}
