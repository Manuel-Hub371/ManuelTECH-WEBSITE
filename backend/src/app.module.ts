import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ConsultationModule } from './consultation/consultation.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { CaseStudyModule } from './case-study/case-study.module';
import { AboutModule } from './about/about.module';
import { ServiceModule } from './service/service.module';
import { BlogModule } from './blog/blog.module';
import { LegalModule } from './legal/legal.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/manueltech'),
      }),
    }),
    ContactModule,
    ConsultationModule,
    AuthModule,
    AdminModule,
    ProductModule,
    CaseStudyModule,
    AboutModule,
    ServiceModule,
    BlogModule,
    LegalModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

