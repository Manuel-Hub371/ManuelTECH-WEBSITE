import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name)
    private readonly blogModel: Model<BlogPost>,
  ) {}

  findAll(): Promise<BlogPost[]> {
    return this.blogModel.find().sort({ publishedAt: -1, createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<BlogPost> {
    const post = await this.blogModel.findById(id).exec();
    if (!post) throw new NotFoundException(`Blog post ${id} not found`);
    return post;
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogModel.findOne({ slug }).exec();
    if (!post) throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    return post;
  }

  async create(dto: CreateBlogDto): Promise<BlogPost> {
    const existing = await this.blogModel.findOne({ slug: dto.slug }).exec();
    if (existing) throw new ConflictException(`A blog post with slug "${dto.slug}" already exists`);
    const post = new this.blogModel({
      ...dto,
      body: dto.body ?? [],
      tags: dto.tags ?? [],
      featured: dto.featured ?? false,
    });
    return post.save();
  }

  async update(id: string, dto: UpdateBlogDto): Promise<BlogPost> {
    const post = await this.findOne(id);
    if (dto.slug && dto.slug !== post.slug) {
      const conflict = await this.blogModel.findOne({ slug: dto.slug }).exec();
      if (conflict) throw new ConflictException(`A blog post with slug "${dto.slug}" already exists`);
    }
    const updated = await this.blogModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();
    if (!updated) throw new NotFoundException(`Blog post ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Blog post ${id} not found`);
  }

  async count(): Promise<number> {
    return this.blogModel.countDocuments().exec();
  }
}
