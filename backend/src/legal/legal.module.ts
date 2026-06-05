import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LegalDoc, LegalDocSchema } from './entities/legal-doc.entity';
import { LegalService } from './legal.service';
import { LegalController } from './legal.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LegalDoc.name, schema: LegalDocSchema }]),
  ],
  controllers: [LegalController],
  providers: [LegalService],
  exports: [LegalService],
})
export class LegalModule {}
