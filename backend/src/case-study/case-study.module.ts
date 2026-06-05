import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseStudy, CaseStudySchema } from './entities/case-study.entity';
import { CaseStudyService } from './case-study.service';
import { CaseStudyController } from './case-study.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: CaseStudy.name, schema: CaseStudySchema }])],
  controllers: [CaseStudyController],
  providers: [CaseStudyService],
  exports: [CaseStudyService],
})
export class CaseStudyModule {}
