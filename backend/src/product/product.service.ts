import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  findPortfolio(): Promise<Product[]> {
    return this.productModel.find({ showInPortfolio: true }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = new this.productModel({
      ...dto,
      features: dto.features ?? [],
      techStack: dto.techStack ?? [],
      showInPortfolio: dto.showInPortfolio ?? true,
    });
    return product.save();
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Product ${id} not found`);
  }

  async count(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }
}
