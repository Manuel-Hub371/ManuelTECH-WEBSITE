import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyInfo, CompanyInfoSchema } from './entities/company-info.entity';
import { TeamMember, TeamMemberSchema } from './entities/team-member.entity';
import { Product, ProductSchema } from '../product/entities/product.entity';
import { CaseStudy, CaseStudySchema } from '../case-study/entities/case-study.entity';
import { Service, ServiceSchema } from '../service/entities/service.entity';
import { BlogPost, BlogPostSchema } from '../blog/entities/blog.entity';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { DatabaseSeeder } from './database-seeder';
import { LegalModule } from '../legal/legal.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyInfo.name, schema: CompanyInfoSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
      { name: Product.name, schema: ProductSchema },
      { name: CaseStudy.name, schema: CaseStudySchema },
      { name: Service.name, schema: ServiceSchema },
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
    LegalModule,
  ],
  controllers: [AboutController],
  providers: [AboutService, DatabaseSeeder],
  exports: [AboutService],
})
export class AboutModule {}

