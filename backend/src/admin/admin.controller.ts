import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactService } from '../contact/contact.service';
import { ConsultationService } from '../consultation/consultation.service';
import { ProductService } from '../product/product.service';
import { CaseStudyService } from '../case-study/case-study.service';

@Controller('api/admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private readonly contactService: ContactService,
    private readonly consultationService: ConsultationService,
    private readonly productService: ProductService,
    private readonly caseStudyService: CaseStudyService,
  ) {}

  @Get('stats')
  async getStats() {
    const [contactCount, consultationCount, productCount, caseStudyCount] =
      await Promise.all([
        this.contactService.count(),
        this.consultationService.count(),
        this.productService.count(),
        this.caseStudyService.count(),
      ]);

    return {
      contacts:     contactCount,
      consultations: consultationCount,
      products:     productCount,
      caseStudies:  caseStudyCount,
      total:        contactCount + consultationCount,
    };
  }

  @Get('contacts')
  getContacts() {
    return this.contactService.findAll();
  }

  @Get('consultations')
  getConsultations() {
    return this.consultationService.findAll();
  }
}
