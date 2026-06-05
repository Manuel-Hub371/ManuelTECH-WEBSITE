import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Consultation, ConsultationSchema } from './entities/consultation.entity';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Consultation.name, schema: ConsultationSchema }])],
  controllers: [ConsultationController],
  providers: [ConsultationService],
  exports: [ConsultationService],
})
export class ConsultationModule {}
