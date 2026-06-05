import { Module } from '@nestjs/common';
import { ContactModule } from '../contact/contact.module';
import { ConsultationModule } from '../consultation/consultation.module';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { CaseStudyModule } from '../case-study/case-study.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule, ContactModule, ConsultationModule, ProductModule, CaseStudyModule],
  controllers: [AdminController],
})
export class AdminModule {}
