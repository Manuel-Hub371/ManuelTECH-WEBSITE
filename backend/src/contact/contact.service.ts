import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
  ) {}

  async create(dto: CreateContactDto) {
    const contact = new this.contactModel(dto);
    return contact.save();
  }

  findAll() {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  count() {
    return this.contactModel.countDocuments().exec();
  }
}
