import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LegalDoc } from './entities/legal-doc.entity';
import { UpdateLegalDocDto } from './dto/update-legal-doc.dto';

@Injectable()
export class LegalService {
  constructor(
    @InjectModel(LegalDoc.name)
    private readonly legalDocModel: Model<LegalDoc>,
  ) {}

  private getDefaultDocs(type: string): { title: string; sections: { heading: string; paragraphs: string[] }[] } {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          sections: [
            {
              heading: 'What data you collect',
              paragraphs: [
                'We collect information that you voluntarily provide to us when you fill out contact forms, book consultations, subscribe to our newsletter, or correspond with us.',
                'This information may include your name, email address, phone number, company name, and details regarding your project requirements.',
              ],
            },
            {
              heading: 'How we use it',
              paragraphs: [
                'We use the collected information to respond to your inquiries, schedule and host consultation sessions, and send you relevant updates or newsletters if you have consented to receive them.',
                'We also use website analytics to understand user behavior and improve the performance and usability of our platform.',
              ],
            },
            {
              heading: 'Cookies and tracking technologies',
              paragraphs: [
                'Our website uses cookies and similar tracking technologies to analyze trends, administer the site, track users\' movements around the site, and gather demographic information about our user base.',
                'For more detailed information, please refer to our Cookie Policy.',
              ],
            },
            {
              heading: 'Third-party services used',
              paragraphs: [
                'We may use reputable third-party services to assist in our operations, such as cloud hosting providers, analytics platforms, and contact form handlers.',
                'These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.',
              ],
            },
            {
              heading: 'User rights regarding their data',
              paragraphs: [
                'You have the right to request access to the personal data we hold about you, request corrections to any inaccuracies, or request the deletion of your personal data.',
                'If you wish to exercise any of these rights, please contact us directly using the information provided on our Contact page.',
              ],
            },
          ],
        };
      case 'terms':
        return {
          title: 'Terms & Conditions',
          sections: [
            {
              heading: 'Rules for using your website and services',
              paragraphs: [
                'By accessing and using this website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our website.',
                'The content on this website is for general information purposes only and is subject to change without notice.',
              ],
            },
            {
              heading: 'Intellectual property ownership',
              paragraphs: [
                'All content, graphics, logos, trademarks, and source code on this website are the intellectual property of ManuelTECH or its licensors, protected by applicable copyright and intellectual property laws.',
                'You may not reproduce, distribute, or create derivative works from any part of this site without our express prior written permission.',
              ],
            },
            {
              heading: 'Payment and refund terms',
              paragraphs: [
                'Payment terms for custom development, software, AI agents, robotics, or training services are detailed in separate service agreements signed by both parties.',
                'Refunds for services are handled strictly according to the terms specified in the respective signed project agreement.',
              ],
            },
            {
              heading: 'Limitation of liability',
              paragraphs: [
                'ManuelTECH, its directors, employees, or agents shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website or our services.',
                'This limitation applies to any damages including loss of profits, data loss, business interruption, or system failure.',
              ],
            },
            {
              heading: 'User responsibilities',
              paragraphs: [
                'Users agree not to use this website for any unlawful purpose or in any way that could damage, disable, or impair the site\'s performance or security.',
                'You are responsible for ensuring that any information you transmit through our forms is accurate, truthful, and free of malicious software.',
              ],
            },
          ],
        };
      case 'cookies':
        return {
          title: 'Cookie Policy',
          sections: [
            {
              heading: 'What cookies are used',
              paragraphs: [
                'Cookies are small text files placed on your device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide info to the owners of the site.',
                'We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).',
              ],
            },
            {
              heading: 'Why they are used',
              paragraphs: [
                'We use cookies to improve your browsing experience by remembering your preferences, analyzing site traffic to optimize performance, and keeping you signed in if you access admin areas.',
                'Some cookies are strictly necessary for the technical operation of the site, while others are optional and used for analytics or marketing.',
              ],
            },
            {
              heading: 'How users can manage cookie preferences',
              paragraphs: [
                'You can control and manage cookies through your web browser\'s settings. Most browsers allow you to block cookies, delete existing cookies, or alert you when a new cookie is placed.',
                'Please note that disabling certain cookies may affect the functionality of this website and limit your access to some features.',
              ],
            },
          ],
        };
      case 'disclaimer':
        return {
          title: 'Disclaimer',
          sections: [
            {
              heading: 'Limits of responsibility for information provided',
              paragraphs: [
                'The information provided on this website is for general informational purposes only. While we strive for accuracy, ManuelTECH makes no warranties or representations of any kind regarding the completeness, accuracy, or reliability of the content.',
                'Any reliance you place on the information found on this site is strictly at your own risk.',
              ],
            },
            {
              heading: 'AI-generated content disclaimers',
              paragraphs: [
                'Some sections of this website, product demonstrations (e.g. EDITH AI), or blog posts may contain content or responses generated or assisted by Artificial Intelligence (AI).',
                'AI-generated content is provided \'as is\' for illustrative and productivity purposes. Users should verify critical details and not rely solely on automated responses.',
              ],
            },
            {
              heading: 'No guarantee of specific results',
              paragraphs: [
                'ManuelTECH does not guarantee specific business outcomes, search engine rankings, revenue growth, or technical performance improvements as a result of using our products or services.',
                'All project results depend on various factors, and historical success/case studies are not guarantees of future results.',
              ],
            },
          ],
        };
      default:
        throw new NotFoundException(`Unknown legal document type: ${type}`);
    }
  }

  async findOne(type: string): Promise<LegalDoc> {
    let doc = await this.legalDocModel.findOne({ type }).exec();
    if (!doc) {
      const defaults = this.getDefaultDocs(type);
      doc = await new this.legalDocModel({
        type,
        ...defaults,
      }).save();
    }
    return doc;
  }

  async update(type: string, dto: UpdateLegalDocDto): Promise<LegalDoc> {
    // Ensure document is created if not exists
    await this.findOne(type);

    const doc = await this.legalDocModel
      .findOneAndUpdate(
        { type },
        {
          title: dto.title,
          sections: dto.sections,
          lastUpdated: new Date(),
        },
        { new: true },
      )
      .exec();

    if (!doc) {
      throw new NotFoundException(`Legal document ${type} could not be updated`);
    }

    return doc;
  }

  /** Seeding helper to create all default docs if not present */
  async seedAllDefaults(): Promise<void> {
    const types = ['privacy', 'terms', 'cookies', 'disclaimer'];
    for (const type of types) {
      const count = await this.legalDocModel.countDocuments({ type }).exec();
      if (count === 0) {
        const defaults = this.getDefaultDocs(type);
        await new this.legalDocModel({
          type,
          ...defaults,
        }).save();
        console.log(`Seeded default legal doc for: ${type}`);
      }
    }
  }
}
