import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyInfo } from './entities/company-info.entity';
import { TeamMember } from './entities/team-member.entity';
import { Product } from '../product/entities/product.entity';
import { CaseStudy } from '../case-study/entities/case-study.entity';
import { Service } from '../service/entities/service.entity';
import { BlogPost } from '../blog/entities/blog.entity';
import { LegalService } from '../legal/legal.service';

@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectModel(CompanyInfo.name)
    private readonly infoModel: Model<CompanyInfo>,
    @InjectModel(TeamMember.name)
    private readonly memberModel: Model<TeamMember>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(CaseStudy.name)
    private readonly caseStudyModel: Model<CaseStudy>,
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>,
    @InjectModel(BlogPost.name)
    private readonly blogModel: Model<BlogPost>,
    private readonly legalService: LegalService,
  ) {}

  async onApplicationBootstrap() {
    console.log('Running database seeder for MongoDB...');

    // Seed Legal Documents
    try {
      await this.legalService.seedAllDefaults();
    } catch (err) {
      console.error('Failed to seed legal documents:', err);
    }

    // 1. Seed Company Info
    const infoCount = await this.infoModel.countDocuments();
    if (infoCount === 0) {
      const defaultInfo = {
        companyName: 'ManuelTECH',
        tagline: 'We build technology. We teach it. We stand behind it.',
        heroDescription: 'ManuelTECH is a full-service technology company delivering web development, custom software, AI agents, robotics, creative design, and hands-on training — all under one roof, with one accountable team.',
        storyParagraph1: 'ManuelTECH was founded with a clear mission: make enterprise-grade technology accessible to organizations of every size. What began as custom software projects for local businesses has grown into a full-service technology firm spanning six disciplines.',
        storyParagraph2: 'Today we serve clients in education, healthcare, manufacturing, retail, and finance — delivering solutions that are secure, scalable, and built for the long term. We don\'t just build and leave; we train your team, support your systems, and grow with you.',
        storyParagraph3: 'Our unique combination of deep technical capability and a genuine training arm means we\'re not just a vendor — we\'re invested in building lasting capability within every organization we serve.',
        storyImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
        founderQuote: 'Technology should solve real problems — not create new ones.',
        founderName: 'Manuel, Founder & CEO',
        mission: 'Empower every organization with technology that actually works.',
        vision: 'The most trusted technology partner for digital transformation across Africa and global markets.',
        statYears: '8+',
        statProjects: '50+',
        statClients: '30+',
        statCountries: '5',
        hiringEmail: 'careers@manueltech.com',
        hiringText: 'Talented engineers, designers, and educators — we\'d love to hear from you.',
        contactEmail: 'hello@manueltech.com',
        contactPhone: '+1 (234) 567-890',
        contactWhatsapp: 'https://wa.me/1234567890',
        contactLocation: 'Tech Innovation Hub, Your City',
        contactMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343!2d-74.004258!3d40.740162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzI0LjYiTiA3NMKwMDAnMTUuMyJX!5e0!3m2!1sen!2sus!4v1234567890',
        businessHours: 'Mon – Fri, 9:00 AM – 6:00 PM',
        socialLinkedin: '',
        socialTwitter: '',
        socialInstagram: '',
        socialFacebook: '',
        socialYoutube: '',
        socialGithub: '',
      };
      await new this.infoModel(defaultInfo).save();
      console.log('Seeded company info successfully!');
    }

    // 2. Seed Team Members
    const memberCount = await this.memberModel.countDocuments();
    if (memberCount === 0) {
      const defaultMembers = [
        {
          name: 'Manuel',
          role: 'Founder & CEO',
          bio: 'Software engineer and entrepreneur passionate about AI, robotics, and education. Founded ManuelTECH to bring enterprise-grade technology to businesses of every size.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
          sortOrder: 0,
        },
        {
          name: 'Sarah Chen',
          role: 'AI & Automation Lead',
          bio: 'Specializes in machine learning pipelines, NLP systems, and deploying production AI agents at scale.',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
          sortOrder: 1,
        },
        {
          name: 'David Okonkwo',
          role: 'Robotics Engineer',
          bio: 'Hardware and embedded systems expert with deep experience in sensors, actuators, and autonomous navigation.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
          sortOrder: 2,
        },
        {
          name: 'Elena Vasquez',
          role: 'Creative & UI/UX Lead',
          bio: 'Creates intuitive interfaces and brand identities that connect users with complex technology beautifully.',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
          sortOrder: 3,
        },
        {
          name: 'James Otieno',
          role: 'Head of Training',
          bio: 'Curriculum designer and educator who has trained hundreds of developers, designers, and tech professionals.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
          sortOrder: 4,
        },
        {
          name: 'Priya Nair',
          role: 'Full-Stack Engineer',
          bio: 'Builds scalable web applications and APIs with a focus on performance, accessibility, and clean architecture.',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
          sortOrder: 5,
        },
      ];
      await this.memberModel.insertMany(defaultMembers);
      console.log('Seeded team members successfully!');
    }

    // 3. Seed Products
    const productCount = await this.productModel.countDocuments();
    if (productCount === 0) {
      const defaultProducts = [
        {
          name: 'EDITH AI',
          tagline: 'Your intelligent AI assistant — always on, always learning.',
          category: 'AI',
          status: 'Live',
          description: 'EDITH AI is a conversational AI assistant built for businesses that need 24/7 intelligent support. It handles customer queries, qualifies leads, books appointments, and escalates complex issues — all without human intervention.',
          longDescription: "EDITH AI is ManuelTECH's flagship AI product. Named after the concept of an always-available intelligent assistant, EDITH is trained on your business data and deployed across your website, WhatsApp, and messaging channels. It understands context, remembers conversations, and continuously improves from every interaction. Whether you're a school managing parent inquiries, a clinic handling appointment bookings, or a business qualifying leads — EDITH handles it all.",
          features: [
            'Natural language understanding in multiple languages',
            'Custom knowledge base trained on your data',
            'Multi-channel: Web, WhatsApp, Telegram, SMS',
            'Human handoff with full conversation context',
            'Lead qualification and CRM integration',
            'Appointment booking and calendar sync',
            'Real-time analytics and conversation insights',
            'Continuous learning from every interaction',
          ],
          techStack: ['Python', 'OpenAI GPT-4', 'LangChain', 'React', 'Node.js', 'PostgreSQL', 'Redis'],
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
          accentColor: 'bg-violet-600',
          textAccent: 'text-violet-600',
          borderAccent: 'border-l-violet-600',
          tryUrl: '#',
          downloadUrl: '',
          readMoreUrl: '/portfolio/edith-ai',
          learnMoreUrl: '/portfolio/edith-ai',
          showInPortfolio: true,
        },
        {
          name: 'unKonet',
          tagline: 'The complete university management platform.',
          category: 'Software',
          status: 'Live',
          description: 'unKonet is a comprehensive university management system that handles admissions, student records, course management, examinations, finance, and staff administration — all in one unified platform.',
          longDescription: "unKonet was built to solve the fragmented, paper-heavy administrative burden that universities across Africa face. From the moment a student applies to the day they graduate, unKonet manages every touchpoint: online admissions, course registration, attendance, grading, fee payments, hostel allocation, and alumni records. It's built for scale — handling thousands of concurrent users across multiple faculties and campuses.",
          features: [
            'Online admissions and application portal',
            'Student records and academic history',
            'Course registration and timetable management',
            'Examination scheduling and result processing',
            'Fee management and payment integration',
            'Staff and faculty administration',
            'Hostel and facility management',
            'Alumni portal and engagement tools',
            'Multi-campus support',
            'Mobile app for students and staff',
          ],
          techStack: ['React', 'NestJS', 'PostgreSQL', 'Redis', 'React Native', 'Docker'],
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85',
          accentColor: 'bg-primary-600',
          textAccent: 'text-primary-600',
          borderAccent: 'border-l-primary-600',
          tryUrl: '#',
          downloadUrl: '',
          readMoreUrl: '/portfolio/unkonet',
          learnMoreUrl: '/portfolio/unkonet',
          showInPortfolio: true,
        },
        {
          name: 'Vibe IDE',
          tagline: 'The AI-powered coding environment for vibe coders.',
          category: 'Developer Tools',
          status: 'Beta',
          description: 'Vibe IDE is an AI-native coding environment designed for developers who want to build faster with intelligent code generation, real-time suggestions, and an assistant that understands your entire codebase.',
          longDescription: "Vibe IDE is built for the next generation of developers — those who think in systems and want AI to handle the boilerplate. It's not just autocomplete; it's a full coding partner. Vibe understands your project structure, suggests architectural improvements, writes tests, explains code, and helps you debug in plain English. Whether you're a solo developer or part of a team, Vibe IDE accelerates your workflow without getting in the way.",
          features: [
            'AI code generation from natural language prompts',
            'Full codebase understanding and context awareness',
            'Real-time intelligent autocomplete',
            'Automated test generation',
            'Plain-English debugging assistant',
            'Code review and refactoring suggestions',
            'Multi-language support (JS, Python, Go, Rust, and more)',
            'Git integration and commit message generation',
            'Team collaboration features',
          ],
          techStack: ['Electron', 'TypeScript', 'React', 'OpenAI API', 'Tree-sitter', 'LSP', 'Node.js'],
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=85',
          accentColor: 'bg-amber-500',
          textAccent: 'text-amber-600',
          borderAccent: 'border-l-amber-500',
          tryUrl: '#',
          downloadUrl: '#',
          readMoreUrl: '/portfolio/vibe-ide',
          learnMoreUrl: '/portfolio/vibe-ide',
          showInPortfolio: true,
        },
        {
          name: 'GhanaPay',
          tagline: 'Send and receive money anywhere in the world — from Ghana.',
          category: 'Fintech',
          status: 'Live',
          description: 'GhanaPay is a payment module that enables Ghanaians to send money, pay for services, and transact globally — using Mobile Money, bank transfers, and international payment rails.',
          longDescription: "GhanaPay bridges the gap between Ghana's thriving mobile money ecosystem and the global financial system. It allows individuals and businesses to send money internationally, receive payments from abroad, pay for subscriptions and services in foreign currencies, and manage multi-currency wallets — all from a single app. GhanaPay integrates with MTN Mobile Money, Vodafone Cash, AirtelTigo Money, and major international payment networks.",
          features: [
            'Send money internationally from Ghana',
            'Receive payments from anywhere in the world',
            'Mobile Money integration (MTN, Vodafone, AirtelTigo)',
            'Multi-currency wallet management',
            'Pay for international subscriptions and services',
            'Business payment collection and invoicing',
            'Real-time exchange rates and low fees',
            'KYC/AML compliance built in',
            'Developer API for businesses',
          ],
          techStack: ['React Native', 'Node.js', 'NestJS', 'PostgreSQL', 'Stripe', 'Flutterwave', 'Redis'],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=85',
          accentColor: 'bg-emerald-600',
          textAccent: 'text-emerald-600',
          borderAccent: 'border-l-emerald-600',
          tryUrl: '#',
          downloadUrl: '#',
          readMoreUrl: '/portfolio/ghanapay',
          learnMoreUrl: '/portfolio/ghanapay',
          showInPortfolio: true,
        },
      ];
      await this.productModel.insertMany(defaultProducts);
      console.log('Seeded products successfully!');
    }

    // 4. Seed Case Studies
    const caseStudyCount = await this.caseStudyModel.countDocuments();
    if (caseStudyCount === 0) {
      const defaultCaseStudies = [
        {
          title: 'Hospital Management System',
          client: 'Regional Medical Centre',
          category: 'Software Development',
          industry: 'Healthcare',
          description: 'Clinical and administrative system for patient records, appointments, billing, and pharmacy management.',
          challenge: 'Disconnected paper-based systems led to long patient wait times, billing errors, and no visibility across departments.',
          solution: 'Built a unified hospital management platform covering patient records, appointment scheduling, pharmacy inventory, billing, and insurance claims — with role-based access for doctors, nurses, and admin staff.',
          results: [
            'Patient wait times reduced by 35%',
            '99.2% billing accuracy achieved',
            'Pharmacy stockouts eliminated',
            'Full audit trail across all departments',
          ],
          techStack: ['React', 'NestJS', 'PostgreSQL', 'Redis'],
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        },
        {
          title: 'School Management System',
          client: 'Greenfield Academy (3 campuses)',
          category: 'Software Development',
          industry: 'Education',
          description: 'Multi-campus school platform managing students, staff, attendance, fees, and parent communication.',
          challenge: "Legacy paper processes caused delays and data loss across three campuses. Parents had no visibility into their children's academic progress.",
          solution: 'Deployed a multi-campus school management system with student records, attendance tracking, fee management, report cards, and a parent portal with real-time notifications.',
          results: [
            'Administrative workload reduced by 60%',
            'Parent engagement improved significantly',
            'Fee collection rate increased to 94%',
            'Zero data loss since deployment',
          ],
          techStack: ['React', 'Node.js', 'PostgreSQL', 'NestJS'],
          image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
        },
        {
          title: 'AI Customer Service Agent',
          client: 'RetailPlus',
          category: 'AI & Automation',
          industry: 'Retail',
          description: 'Intelligent AI agent handling customer inquiries across web and WhatsApp with human handoff.',
          challenge: 'Support team was overwhelmed with repetitive tickets during peak hours, causing 4+ hour response times and customer churn.',
          solution: "Deployed EDITH AI trained on RetailPlus's product catalog, policies, and FAQ. Integrated with their CRM for order lookups and escalation routing.",
          results: [
            '70% of inquiries resolved automatically',
            'Response time dropped from 4 hours to under 30 seconds',
            'Customer satisfaction score: 4.8/5',
            'Support team headcount held flat despite 3× traffic growth',
          ],
          techStack: ['Python', 'OpenAI API', 'React', 'PostgreSQL', 'WhatsApp Business API'],
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        },
        {
          title: 'Smart Gate & Access Control System',
          client: 'Apex Industries',
          category: 'Robotics',
          industry: 'Manufacturing',
          description: 'Automated gate control with facial recognition, RFID, and real-time access logging for a secure industrial facility.',
          challenge: 'Manual gate security was slow (45s per entry), lacked audit trails, and had no way to detect unauthorized access attempts.',
          solution: 'Installed a multi-sensor gate system combining RFID cards, facial recognition, and a cloud dashboard with mobile alerts and full audit logging.',
          results: [
            'Entry processing time: 45s → under 5s',
            'Full audit compliance achieved',
            'Zero unauthorized access incidents post-deployment',
            'Mobile alerts for all access events',
          ],
          techStack: ['Arduino', 'Python', 'React', 'PostgreSQL', 'MQTT', 'OpenCV'],
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
        },
        {
          title: 'FinEdge Brand & App Redesign',
          client: 'FinEdge',
          category: 'Creative Services',
          industry: 'Finance',
          description: 'Complete brand identity overhaul and UI/UX redesign of a fintech mobile app serving 50,000+ users.',
          challenge: 'Poor app retention due to confusing navigation, an outdated visual identity, and a 3.1 app store rating that was hurting downloads.',
          solution: 'Rebuilt the brand identity from scratch — new logo, color system, and typography — then redesigned the entire app UX with user research, new onboarding flow, and a design system.',
          results: [
            'User retention increased by 40%',
            'App store rating: 3.1 → 4.7',
            'Onboarding completion rate up 65%',
            'Design system adopted across all platforms',
          ],
          techStack: ['Figma', 'Adobe Illustrator', 'React Native'],
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
        },
        {
          title: 'Asante Ventures Corporate Website',
          client: 'Asante Ventures',
          category: 'Web Development',
          industry: 'Finance',
          description: 'High-performance corporate website with CMS, multilingual support, and lead generation for a pan-African investment firm.',
          challenge: "The old site loaded in 8+ seconds, wasn't mobile-friendly, and generated almost no inbound leads despite significant ad spend.",
          solution: 'Built a new site with Next.js for performance, Sanity CMS for content management, multilingual support, and conversion-optimized landing pages.',
          results: [
            'Page load time: 8s → under 1.5s',
            'Inbound leads doubled in the first month',
            'Mobile traffic conversion rate up 3×',
            'Content team now updates site independently',
          ],
          techStack: ['React', 'Next.js', 'Tailwind CSS', 'Sanity CMS'],
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        },
      ];
      await this.caseStudyModel.insertMany(defaultCaseStudies);
      console.log('Seeded case studies successfully!');
    }

    // 5. Seed Services
    const serviceCount = await this.serviceModel.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        {
          slug: 'web-development',
          title: 'Web Development',
          icon: 'Globe',
          description: 'Fast, modern, and scalable websites and web applications built to convert visitors into customers.',
          accentColor: 'bg-sky-600',
          textAccent: 'text-sky-600',
          borderAccent: 'border-l-sky-500',
          image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=85',
          headline: 'Your website is your most important salesperson. We make sure it works.',
          body: [
            'In today\'s digital-first world, your website is often the first — and sometimes only — impression a potential client has of your business. A slow, outdated, or confusing website doesn\'t just lose visitors; it loses revenue.',
            'ManuelTECH builds websites and web applications that are fast, accessible, and designed to convert. We don\'t use templates. Every project starts with understanding your business goals, your audience, and what success looks like — then we engineer a solution that delivers it.',
            'From a simple corporate site to a complex multi-tenant SaaS platform, our web development team has the depth to handle it. We use modern frameworks like React and Next.js, write clean and maintainable code, and build with performance and SEO baked in from day one.',
          ],
          whoIsItFor: [
            'Businesses that need a professional online presence that generates leads',
            'Startups launching a product and needing a fast, polished web presence',
            'Companies with an outdated website that\'s hurting their credibility',
            'Organizations that need a web application or internal portal',
            'E-commerce businesses looking to sell online with a reliable platform',
          ],
          outcomes: [
            'A website that loads in under 2 seconds on any device',
            'Higher search engine rankings through technical SEO',
            'More leads and conversions from your existing traffic',
            'A CMS you can update yourself without calling a developer',
            'Clean, documented code your team can maintain long-term',
            'Full mobile responsiveness across all screen sizes',
          ],
          items: [
            { name: 'Corporate & Business Websites', description: 'Professional websites that represent your brand and drive leads.' },
            { name: 'E-Commerce Platforms', description: 'Full-featured online stores with payment, inventory, and analytics.' },
            { name: 'Web Applications', description: 'Complex SaaS platforms, dashboards, and portals.' },
            { name: 'Landing Pages', description: 'High-converting pages for campaigns and product launches.' },
            { name: 'CMS & Blog Platforms', description: 'Content-managed sites you can update without a developer.' },
            { name: 'API Development & Integration', description: 'RESTful and GraphQL APIs connecting your systems.' },
          ],
          process: [
            { title: 'Discovery & Brief', desc: 'We learn your goals, audience, competitors, and what success looks like for this project.' },
            { title: 'Design & Prototype', desc: 'Wireframes and high-fidelity designs reviewed and approved before a single line of code is written.' },
            { title: 'Development', desc: 'Built with React/Next.js, fully responsive, performance-optimized, and SEO-ready.' },
            { title: 'Testing & QA', desc: 'Cross-browser testing, performance audits, accessibility checks, and content review.' },
            { title: 'Launch & Handover', desc: 'Deployment, DNS setup, CMS training, and full documentation handed to your team.' },
          ],
          faqs: [
            { q: 'How long does a website take to build?', a: 'A corporate website typically takes 3–6 weeks. A complex web application can take 2–4 months. We provide a detailed timeline in every proposal.' },
            { q: 'Do you build on WordPress?', a: 'We can, but we typically recommend modern headless CMS solutions (like Sanity or Contentful) paired with Next.js for better performance and security.' },
            { q: 'Will I be able to update the website myself?', a: 'Yes. Every site we build includes a CMS so your team can update content, add blog posts, and manage pages without touching code.' },
            { q: 'Do you handle hosting?', a: 'We can set up and manage hosting for you, or deploy to your existing infrastructure. We\'ll recommend the best option for your needs and budget.' },
            { q: 'What happens after launch?', a: 'We offer ongoing maintenance retainers covering updates, security patches, performance monitoring, and content changes.' },
          ],
          relatedIds: ['software', 'creative', 'ai'],
          sortOrder: 0,
        },
        {
          slug: 'software-development',
          title: 'Software & App Development',
          icon: 'Code2',
          description: 'Custom software and mobile applications tailored to your business workflows and scale.',
          accentColor: 'bg-primary-600',
          textAccent: 'text-primary-600',
          borderAccent: 'border-l-primary-600',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85',
          headline: 'Off-the-shelf software doesn\'t fit your business. We build what does.',
          body: [
            'Generic software forces your team to work around its limitations. Custom software is built around how your business actually operates — your workflows, your data, your rules.',
            'ManuelTECH has built management systems for schools, hospitals, logistics companies, and enterprises. We understand that the real challenge isn\'t writing code — it\'s deeply understanding your operations and translating them into software that your team will actually use.',
            'We build with modern, scalable architectures using React, NestJS, and PostgreSQL. Our systems are designed to grow with you — starting lean and expanding as your needs evolve. Every system we deliver comes with full documentation, training, and ongoing support.',
          ],
          whoIsItFor: [
            'Schools and universities needing a management platform',
            'Hospitals and clinics managing patient records and billing',
            'Businesses running operations on spreadsheets and manual processes',
            'Companies that have outgrown their current software',
            'Organizations that need a mobile app for their staff or customers',
            'Enterprises needing a custom ERP or integration layer',
          ],
          outcomes: [
            'Processes automated end-to-end — no more manual data entry',
            'Real-time visibility across all departments and locations',
            'Reduced operational errors and data loss',
            'A system built exactly to your workflow, not a generic template',
            'Mobile access for staff in the field or on the go',
            'Scalable architecture that handles growth without rebuilding',
          ],
          items: [
            { name: 'Business Management Systems', description: 'End-to-end platforms for operations, HR, and reporting.' },
            { name: 'School Management Systems', description: 'Student records, academics, and parent portals.' },
            { name: 'Hospital Management Systems', description: 'Patient care, billing, and clinical workflows.' },
            { name: 'Inventory Systems', description: 'Real-time stock tracking and supply chain visibility.' },
            { name: 'ERP Solutions', description: 'Unified finance, inventory, and resource planning.' },
            { name: 'Mobile Apps (iOS & Android)', description: 'Cross-platform apps with offline-ready architecture.' },
          ],
          process: [
            { title: 'Requirements Workshop', desc: 'We map every workflow, user role, and data requirement before writing a line of code.' },
            { title: 'System Architecture', desc: 'Database design, API structure, and module planning reviewed with your team.' },
            { title: 'Agile Development', desc: 'Built in sprints with working demos every 2 weeks so you see progress continuously.' },
            { title: 'User Acceptance Testing', desc: 'Your team tests every feature against real scenarios before we go live.' },
            { title: 'Deployment & Training', desc: 'Live deployment, staff training sessions, and full system documentation.' },
          ],
          faqs: [
            { q: 'How is custom software priced?', a: 'We price per project based on scope, not hourly. After a discovery session, we send a fixed-price proposal with milestones.' },
            { q: 'Can you integrate with our existing systems?', a: 'Yes. We build integration layers for existing ERPs, payment gateways, government APIs, and third-party tools.' },
            { q: 'What if our requirements change during development?', a: 'We use agile methodology with a change management process. Minor changes are absorbed; significant scope changes are quoted separately.' },
            { q: 'Do you build mobile apps too?', a: 'Yes. We build cross-platform mobile apps with React Native that work on both iOS and Android from a single codebase.' },
            { q: 'Who owns the code?', a: 'You do. Upon final payment, full source code ownership transfers to you with no licensing fees.' },
          ],
          relatedIds: ['web', 'ai', 'training'],
          sortOrder: 1,
        },
        {
          slug: 'ai-automation',
          title: 'AI & Automation Agents',
          icon: 'Brain',
          description: 'Intelligent systems and autonomous agents that learn from your data, automate decisions, and eliminate repetitive work.',
          accentColor: 'bg-violet-600',
          textAccent: 'text-violet-600',
          borderAccent: 'border-l-violet-600',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
          headline: 'Your team shouldn\'t be doing work that a machine can do better and faster.',
          body: [
            'AI and automation aren\'t just for large corporations anymore. ManuelTECH makes intelligent systems accessible to businesses of every size — from a small business automating its customer support to an enterprise deploying predictive analytics across its supply chain.',
            'We build AI agents that work 24/7, learn from every interaction, and handle the repetitive, time-consuming tasks that drain your team\'s energy. Our automation workflows connect your tools and trigger actions automatically — so your people can focus on the work that actually requires human judgment.',
            'We use proven AI frameworks and models (including OpenAI, LangChain, and custom-trained models) and deploy them in production environments that are reliable, secure, and monitored. We don\'t build demos — we build systems that run your business.',
          ],
          whoIsItFor: [
            'Businesses drowning in repetitive customer support tickets',
            'Companies with manual approval and document processing workflows',
            'Organizations that want to use their data to make better decisions',
            'Businesses that want to automate lead qualification and follow-up',
            'Facilities needing intelligent monitoring and anomaly detection',
            'Any team spending hours on tasks that follow predictable patterns',
          ],
          outcomes: [
            'Hours of manual work eliminated every single day',
            'Customer response times cut from hours to seconds',
            'Smarter decisions backed by real-time data and predictions',
            'Workflows that run automatically without human intervention',
            'AI that improves continuously from every interaction',
            'Significant reduction in operational costs over time',
          ],
          items: [
            { name: 'AI Chatbots & Agents', description: '24/7 conversational agents across web, WhatsApp, and messaging.' },
            { name: 'Automation Workflows', description: 'Trigger actions across apps when events occur — no manual steps.' },
            { name: 'Computer Vision', description: 'Image recognition, quality control, and surveillance AI.' },
            { name: 'Predictive Analytics', description: 'Forecast demand, churn, and operational risks.' },
            { name: 'NLP & Document AI', description: 'Document analysis, sentiment, and language understanding.' },
            { name: 'Business Process Automation', description: 'Digitize approvals, invoicing, and onboarding.' },
            { name: 'IoT & Smart Systems', description: 'Sensor networks, smart home, and real-time dashboards.' },
          ],
          process: [
            { title: 'Process Audit', desc: 'We identify which tasks are best suited for automation and where AI will deliver the highest ROI.' },
            { title: 'Data Assessment', desc: 'We evaluate your existing data quality and structure to determine what\'s needed to train or configure the AI.' },
            { title: 'Build & Train', desc: 'We build the agent or automation, train it on your data, and configure it to your exact business rules.' },
            { title: 'Integration', desc: 'We connect the AI to your existing tools — CRM, email, WhatsApp, databases, and internal systems.' },
            { title: 'Monitor & Improve', desc: 'Post-launch monitoring, performance reporting, and continuous improvement based on real usage data.' },
          ],
          faqs: [
            { q: 'Do I need a lot of data to use AI?', a: 'Not always. Many AI solutions work well with limited data, especially for chatbots and automation. We\'ll assess your situation in the discovery session.' },
            { q: 'Will the AI replace my staff?', a: 'AI handles repetitive, rule-based tasks — freeing your team to focus on higher-value work. Most clients find their team becomes more productive, not smaller.' },
            { q: 'How do you ensure the AI gives accurate answers?', a: 'We build guardrails, confidence thresholds, and human handoff mechanisms so the AI only answers what it knows and escalates what it doesn\'t.' },
            { q: 'Can the AI work on WhatsApp?', a: 'Yes. We integrate with the WhatsApp Business API so your AI agent can handle conversations directly in WhatsApp.' },
            { q: 'How long does it take to deploy an AI agent?', a: 'A basic AI chatbot can be live in 2–4 weeks. A complex automation system with multiple integrations typically takes 6–12 weeks.' },
          ],
          relatedIds: ['software', 'robotics', 'web'],
          sortOrder: 2,
        },
        {
          slug: 'creative-services',
          title: 'Creative Services',
          icon: 'Palette',
          description: 'Design that makes your brand and digital products unforgettable — from first impression to final pixel.',
          accentColor: 'bg-rose-600',
          textAccent: 'text-rose-600',
          borderAccent: 'border-l-rose-500',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85',
          headline: 'Design isn\'t decoration. It\'s the difference between being remembered and being ignored.',
          body: [
            'Your brand is the first thing people judge you by — before they read a word of your copy. A weak visual identity signals a weak business. A strong one commands attention, builds trust, and makes everything else you do more effective.',
            'ManuelTECH\'s creative team combines strategic thinking with exceptional craft. We don\'t just make things look good — we design with purpose. Every color, typeface, and layout decision is made to serve your business goals and resonate with your audience.',
            'Whether you\'re building a brand from scratch, redesigning an app that\'s losing users, or creating marketing materials for a campaign — our creative team delivers work that stands out and performs.',
          ],
          whoIsItFor: [
            'Startups that need a professional brand identity from day one',
            'Established businesses whose brand no longer reflects their quality',
            'Product teams whose app or website has poor user experience',
            'Companies launching campaigns that need compelling visual assets',
            'Founders who need a pitch deck that wins investors',
            'Organizations that want consistent, professional design across all touchpoints',
          ],
          outcomes: [
            'A brand identity that commands attention and builds trust',
            'Consistent visual language across web, print, and social',
            'Interfaces that users find intuitive and enjoyable',
            'Marketing materials that convert and communicate clearly',
            'A design system your team can use independently',
            'Measurably better user retention and engagement',
          ],
          items: [
            { name: 'Graphic Design', description: 'Marketing materials, social assets, flyers, and print.' },
            { name: 'Branding & Identity', description: 'Logo, color systems, typography, and brand guidelines.' },
            { name: 'UI/UX Design', description: 'User-centered interfaces for web and mobile products.' },
            { name: 'Motion Graphics', description: 'Animated visuals for social media and presentations.' },
            { name: 'Pitch Decks & Presentations', description: 'Compelling decks that win clients and investors.' },
          ],
          process: [
            { title: 'Brand Discovery', desc: 'We learn your values, audience, competitors, and the feeling you want your brand to evoke.' },
            { title: 'Concept Development', desc: 'Multiple creative directions presented for feedback before we commit to a direction.' },
            { title: 'Design & Refinement', desc: 'Iterative design with structured feedback rounds until every detail is right.' },
            { title: 'Asset Production', desc: 'All final assets delivered in every format you need — print, web, social, and more.' },
            { title: 'Brand Guidelines', desc: 'A comprehensive guide so your team and future vendors use the brand consistently.' },
          ],
          faqs: [
            { q: 'Do you do logo design only?', a: 'We can, but we recommend a full brand identity — logo alone without a system often leads to inconsistent application. We offer packages for every budget.' },
            { q: 'How many revision rounds are included?', a: 'Every project includes structured revision rounds (typically 2–3). We\'re clear about this upfront so there are no surprises.' },
            { q: 'Can you redesign our existing app?', a: 'Yes. We start with a UX audit to understand what\'s not working, then redesign with user research and testing to validate improvements.' },
            { q: 'What file formats do we receive?', a: 'All source files (Figma, AI, PSD) plus exported assets in every format you need — SVG, PNG, PDF, and more.' },
            { q: 'Do you work with our existing brand guidelines?', a: 'Absolutely. We can work within your existing brand system or help you evolve it while maintaining continuity.' },
          ],
          relatedIds: ['web', 'software', 'training'],
          sortOrder: 3,
        },
        {
          slug: 'robotics',
          title: 'Robotics',
          icon: 'Bot',
          description: 'Hardware and software for physical automation, security, and intelligent robotic systems.',
          accentColor: 'bg-amber-500',
          textAccent: 'text-amber-600',
          borderAccent: 'border-l-amber-500',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85',
          headline: 'Physical automation is no longer science fiction. We build it today.',
          body: [
            'Robotics and physical automation are transforming how facilities are secured, how goods are moved, and how services are delivered. ManuelTECH\'s robotics division bridges the gap between hardware engineering and intelligent software — building systems that operate autonomously in the real world.',
            'Our robotics team has built smart gate systems for industrial facilities, autonomous patrol robots for security, and service robots for commercial spaces. Every system we build combines reliable hardware with intelligent software — sensors, actuators, computer vision, and cloud connectivity working together seamlessly.',
            'We handle the full stack: mechanical design, electronics, embedded firmware, computer vision, cloud dashboard, and mobile alerts. You get a complete, integrated system — not a collection of parts you have to figure out yourself.',
          ],
          whoIsItFor: [
            'Industrial facilities needing automated access control',
            'Security companies looking to augment human patrols',
            'Hospitals and hotels deploying service and delivery robots',
            'Smart home developers and integrators',
            'Research institutions and universities with robotics programs',
            'Any organization with repetitive physical tasks that can be automated',
          ],
          outcomes: [
            'Physical security fully automated with audit trails',
            'Reduced reliance on manual labor for repetitive physical tasks',
            'Real-time monitoring and instant alerts for anomalies',
            'Custom hardware built precisely for your environment',
            'Cloud dashboard with full visibility and control',
            'Systems that operate 24/7 without fatigue or error',
          ],
          items: [
            { name: 'Smart Gate & Access Control', description: 'Automated access with facial recognition and audit logs.' },
            { name: 'Security Robots', description: 'Autonomous patrol and monitoring for facilities.' },
            { name: 'Service Robots', description: 'Delivery and assistance robots for commercial spaces.' },
            { name: 'Home Assistant Robots', description: 'Domestic helpers for cleaning and household support.' },
            { name: 'Custom Robotics Solutions', description: 'Bespoke hardware-software systems for unique use cases.' },
          ],
          process: [
            { title: 'Site Assessment', desc: 'We visit your facility to understand the physical environment, constraints, and requirements.' },
            { title: 'System Design', desc: 'Hardware selection, sensor placement, software architecture, and integration planning.' },
            { title: 'Prototype & Test', desc: 'A working prototype tested in a controlled environment before full deployment.' },
            { title: 'Installation', desc: 'On-site installation, calibration, and integration with your existing systems.' },
            { title: 'Training & Support', desc: 'Staff training on operation and maintenance, plus ongoing remote monitoring and support.' },
          ],
          faqs: [
            { q: 'Do you build robots from scratch?', a: 'Yes. We design and build custom robotic systems from the ground up, or integrate and customize existing platforms depending on your requirements.' },
            { q: 'What happens if the robot breaks down?', a: 'Every system includes remote diagnostics and a maintenance agreement. We can often diagnose and resolve issues remotely, and we provide on-site support when needed.' },
            { q: 'Can your systems integrate with our existing security infrastructure?', a: 'Yes. We build integration layers for existing CCTV, access control, and alarm systems.' },
            { q: 'How accurate is the facial recognition?', a: 'Our systems achieve 99%+ accuracy under normal lighting conditions. We include fallback mechanisms (RFID, PIN) for edge cases.' },
            { q: 'Is robotics affordable for smaller organizations?', a: 'Smart gate and IoT systems are very accessible. Full autonomous robots require more investment. We\'ll give you an honest assessment of ROI in the discovery session.' },
          ],
          relatedIds: ['ai', 'software', 'training'],
          sortOrder: 4,
        },
        {
          slug: 'training-education',
          title: 'Training & Education',
          icon: 'GraduationCap',
          description: 'Practical, hands-on technology training for individuals, teams, and institutions — from beginners to professionals.',
          accentColor: 'bg-emerald-600',
          textAccent: 'text-emerald-600',
          borderAccent: 'border-l-emerald-600',
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85',
          headline: 'The best technology investment you can make is in the people who use it.',
          body: [
            'ManuelTECH\'s training programs are taught by the same engineers and designers who build real products — not career trainers reading from slides. Every course is practical, project-based, and designed to produce skills you can use from day one.',
            'We run structured bootcamps for individuals looking to break into tech, corporate upskilling programs for teams that need to level up, and institutional programs for schools and universities that want to modernize their technology curriculum.',
            'Our training covers the full technology spectrum: web development, AI and machine learning, robotics and electronics, UI/UX design, and digital literacy. Whether you\'re a complete beginner or an experienced professional looking to add new skills — we have a program for you.',
          ],
          whoIsItFor: [
            'Individuals looking to start a career in technology',
            'Developers who want to add AI or robotics to their skillset',
            'Corporate teams that need to upskill quickly and practically',
            'Schools and universities modernizing their tech curriculum',
            'Organizations that have just deployed new software and need staff trained',
            'Communities and NGOs running digital literacy initiatives',
          ],
          outcomes: [
            'Practical skills applicable from the very first day after training',
            'Real projects built during the program — not just exercises',
            'Curriculum tailored to your industry and tools',
            'Certification upon completion of structured programs',
            'Ongoing support and mentorship after training ends',
            'For corporate programs: measurable productivity improvements within 90 days',
          ],
          items: [
            { name: 'Web & Software Development', description: 'Full-stack development bootcamps and structured courses.' },
            { name: 'AI & Machine Learning', description: 'Practical AI training covering tools, models, and real projects.' },
            { name: 'Robotics & Electronics', description: 'Hands-on robotics, Arduino, and embedded systems training.' },
            { name: 'UI/UX & Graphic Design', description: 'Design thinking, Figma, and visual communication courses.' },
            { name: 'Corporate Tech Training', description: 'Upskilling programs tailored for teams and organizations.' },
            { name: 'Digital Literacy Programs', description: 'Foundational tech skills for schools and communities.' },
          ],
          process: [
            { title: 'Needs Assessment', desc: 'We assess current skill levels, learning goals, and the specific tools and technologies relevant to your context.' },
            { title: 'Curriculum Design', desc: 'A custom curriculum built around your goals — not a generic off-the-shelf course.' },
            { title: 'Delivery', desc: 'In-person, online, or hybrid delivery with hands-on projects, code reviews, and real feedback.' },
            { title: 'Assessment', desc: 'Practical assessments and capstone projects that demonstrate real competency.' },
            { title: 'Post-Training Support', desc: 'Access to instructors, resources, and a community for continued learning after the program ends.' },
          ],
          faqs: [
            { q: 'Do you offer online training?', a: 'Yes. We offer in-person, fully online, and hybrid formats. Online programs use live sessions, not pre-recorded videos.' },
            { q: 'How long are the programs?', a: 'Individual bootcamps run 8–16 weeks. Corporate programs are typically 2–8 weeks depending on scope. We also offer intensive 1–5 day workshops.' },
            { q: 'Do participants need prior experience?', a: 'It depends on the program. We have beginner, intermediate, and advanced tracks. We\'ll assess your team\'s level and recommend the right starting point.' },
            { q: 'Can you train our team on software you built for us?', a: 'Absolutely. System handover training is included in every software project, and we offer extended training programs for larger teams.' },
            { q: 'Do you provide certificates?', a: 'Yes. Participants who complete structured programs receive a ManuelTECH certificate of completion. We\'re working on industry-recognized accreditation.' },
          ],
          relatedIds: ['software', 'ai', 'creative'],
          sortOrder: 5,
        },
      ];
      await this.serviceModel.insertMany(defaultServices);
      console.log('Seeded services successfully!');
    }

    // 6. Seed Blog Posts
    const blogCount = await this.blogModel.countDocuments();
    if (blogCount === 0) {
      const defaultBlogPosts = [
        {
          slug: 'why-every-business-needs-an-ai-agent-in-2025',
          title: 'Why Every Business Needs an AI Agent in 2025',
          excerpt: 'AI agents are no longer a luxury for large corporations. Here\'s what we\'ve learned from deploying them across dozens of businesses — and why the ROI is undeniable.',
          body: [
            'Over the past three years, ManuelTECH has deployed AI agents for businesses ranging from small retail shops to regional hospitals. The single most consistent finding: the businesses that adopt AI agents early gain a compounding advantage that becomes very difficult for competitors to close.',
            'An AI agent isn\'t just a chatbot. A well-built agent understands context, remembers previous interactions, integrates with your existing tools, and takes actions — not just answers. It can qualify a lead, book an appointment, process a return, or escalate a complex issue to a human — all without intervention.',
            'The ROI case is straightforward. A business handling 500 customer inquiries per day, where 70% are repetitive questions, is spending significant human hours on work that an AI agent can handle in milliseconds. We\'ve seen clients reduce support costs by 40–60% within the first 90 days of deployment.',
            'The barrier to entry has also collapsed. What required a team of ML engineers two years ago can now be deployed in weeks using modern AI frameworks. The question is no longer "can we afford AI?" — it\'s "can we afford not to have it?"',
            'Our recommendation: start with one high-volume, repetitive process. Measure the impact. Then expand. The businesses that wait for the "perfect" AI strategy often find themselves two years behind the ones that started small and iterated.',
          ],
          category: 'AI & Automation',
          tags: ['AI', 'Automation', 'Business Strategy', 'ROI'],
          author: 'Manuel',
          authorRole: 'Founder & CEO',
          authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
          publishedAt: '2025-03-15',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
          featured: true,
        },
        {
          slug: 'the-real-cost-of-bad-software',
          title: 'The Real Cost of Bad Software (It\'s Not What You Think)',
          excerpt: 'Most organizations underestimate the true cost of poorly built software. We break down the hidden costs — and what to look for when evaluating a development partner.',
          body: [
            'When a client comes to us to rebuild a system that was built by another vendor, the conversation usually starts the same way: "We spent a lot of money on this, and it doesn\'t work." What follows is almost always a story about a system that was built fast, built cheap, or built without a real understanding of the business.',
            'The visible cost of bad software is obvious — it doesn\'t do what you need. But the hidden costs are far more damaging. Staff workarounds (people maintaining spreadsheets alongside the system), data inconsistencies, security vulnerabilities, and the inability to scale are costs that compound every single day.',
            'We\'ve seen a hospital spending 3 hours per day manually reconciling data between two systems that should have been integrated. At a conservative estimate, that\'s over 1,000 hours per year — the equivalent of half a full-time employee — just to compensate for a technical shortcut taken during development.',
            'What should you look for in a development partner? First: do they ask more questions than they answer in the first meeting? A vendor who jumps straight to a quote without deeply understanding your workflows is a red flag. Second: do they show you their process, not just their portfolio? Third: do they talk about maintenance and documentation, or just delivery?',
            'Good software is an investment that pays dividends for years. Bad software is a liability that grows more expensive every month. The difference in upfront cost is rarely as large as clients expect — but the difference in long-term outcome is enormous.',
          ],
          category: 'Software Development',
          tags: ['Software', 'Development', 'Business', 'Quality'],
          author: 'Sarah Chen',
          authorRole: 'AI & Automation Lead',
          authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
          publishedAt: '2025-02-28',
          readTime: '7 min read',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85',
          featured: true,
        },
        {
          slug: 'robotics-in-africa-the-opportunity-nobody-is-talking-about',
          title: 'Robotics in Africa: The Opportunity Nobody Is Talking About',
          excerpt: 'Africa\'s manufacturing and security sectors are ripe for robotics adoption. Here\'s what we\'ve learned from building and deploying robotic systems across the continent.',
          body: [
            'When people think about robotics adoption, they think about Japan\'s automotive factories or Amazon\'s warehouses. Africa rarely enters the conversation. That\'s a mistake — and it\'s one that forward-thinking organizations are already capitalizing on.',
            'The conditions for robotics adoption in Africa are actually favorable in several key areas. Security is a persistent challenge for industrial facilities, and autonomous patrol robots offer a cost-effective, scalable solution. Access control at large facilities — factories, universities, hospitals — is still largely manual in most markets, creating a clear opportunity for smart gate systems.',
            'We\'ve deployed smart gate systems that reduced entry processing time from 45 seconds to under 5 seconds, with full audit trails and mobile alerts. The ROI calculation is simple: one system replaces multiple security personnel at a gate, operates 24/7 without fatigue, and generates data that manual processes never could.',
            'The challenges are real: power reliability, connectivity, and maintenance capacity all require careful engineering. But these are solvable problems. Our systems are designed with offline fallback modes, low-power operation, and remote diagnostics that allow us to support deployments across multiple countries from a single operations center.',
            'The organizations that invest in robotics infrastructure now will have a significant operational advantage within five years. The technology is proven, the costs are falling, and the talent to build and maintain these systems is growing. The window to be an early mover is still open — but it won\'t be for long.',
          ],
          category: 'Robotics',
          tags: ['Robotics', 'Africa', 'Innovation', 'Security'],
          author: 'David Okonkwo',
          authorRole: 'Robotics Engineer',
          authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
          publishedAt: '2025-02-10',
          readTime: '8 min read',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85',
          featured: false,
        },
        {
          slug: 'why-your-brand-is-losing-you-clients',
          title: 'Why Your Brand Is Losing You Clients (Before They Even Talk to You)',
          excerpt: 'A weak visual identity is costing you more than you realize. Here\'s how to diagnose the problem and what a strong brand actually does for your business.',
          body: [
            'We\'ve worked with dozens of businesses that had excellent services but were losing clients to competitors with inferior offerings — simply because the competitor\'s brand looked more credible. This is one of the most frustrating and most fixable problems in business.',
            'Your brand is a signal. Before a potential client reads a word of your copy, before they speak to anyone on your team, they\'ve already formed an impression based on your visual identity. A logo that looks like it was made in 2008, inconsistent colors across your website and social media, or a website that doesn\'t work on mobile — these all signal the same thing: this organization doesn\'t pay attention to detail.',
            'The irony is that the businesses most likely to have weak brands are often the ones with the strongest actual capabilities. Technical founders and operators focus on what they do, not how they present it. The result is a credibility gap that costs them clients they should be winning.',
            'A strong brand doesn\'t require a massive budget. It requires clarity about who you are, who you serve, and what you want people to feel when they encounter your business. From that foundation, a good designer can build an identity that works across every touchpoint — digital, print, and in person.',
            'The businesses we\'ve rebranded consistently report the same outcome: the quality of inbound inquiries improves. They attract clients who are a better fit, who are less price-sensitive, and who are more likely to refer others. A strong brand doesn\'t just look good — it filters for the right clients.',
          ],
          category: 'Creative Services',
          tags: ['Branding', 'Design', 'Marketing', 'Business Growth'],
          author: 'Elena Vasquez',
          authorRole: 'Creative & UI/UX Lead',
          authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
          publishedAt: '2025-01-22',
          readTime: '5 min read',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85',
          featured: false,
        },
        {
          slug: 'training-developers-in-africa-what-we-learned',
          title: 'Training 200+ Developers in Africa: What We Learned',
          excerpt: 'After running multiple cohorts of our tech training programs, here are the patterns we\'ve observed — what works, what doesn\'t, and what the data says about outcomes.',
          body: [
            'ManuelTECH\'s training programs have now produced over 200 graduates across web development, AI, robotics, and design. We\'ve tracked outcomes, gathered feedback, and iterated on our curriculum through multiple cohorts. Here\'s what the data shows.',
            'The single biggest predictor of success is not prior education level or technical background — it\'s consistency. Participants who show up to every session, complete every assignment, and engage with the community consistently outperform those with stronger starting points but inconsistent engagement.',
            'Project-based learning dramatically outperforms lecture-based instruction. Participants who build real projects during the program — not toy exercises, but actual deployable applications — retain skills at a significantly higher rate and are more employable. Our curriculum is now 70% project-based.',
            'Corporate training programs have a different dynamic. When organizations send teams for upskilling, the most successful programs are those where leadership is visibly committed and where participants have a clear mandate to apply what they learn. Training without organizational support rarely sticks.',
            'The job placement rate for our bootcamp graduates is 85% within three months. The most common feedback from employers: our graduates are "production-ready" — they understand real workflows, version control, code review, and deployment, not just syntax. That\'s the outcome we design for.',
          ],
          category: 'Training & Education',
          tags: ['Training', 'Education', 'Tech Talent', 'Africa'],
          author: 'James Otieno',
          authorRole: 'Head of Training',
          authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
          publishedAt: '2025-01-08',
          readTime: '9 min read',
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85',
          featured: false,
        },
        {
          slug: 'building-ghanapay-lessons-from-fintech',
          title: 'Building GhanaPay: Lessons from Building a Fintech Product',
          excerpt: 'Building a payment product that bridges Ghana\'s mobile money ecosystem with global payment rails taught us more about software architecture, regulation, and user trust than any other project.',
          body: [
            'GhanaPay started as a question: why is it so hard for Ghanaians to pay for international services, receive money from abroad, or transact globally when mobile money penetration in Ghana is among the highest in the world? The answer turned out to be a combination of technical, regulatory, and trust challenges — all of which we had to solve.',
            'The technical architecture of a payment product is unforgiving. Transactions must be atomic — they either complete fully or roll back completely. Partial failures in payment systems cause real financial harm to real people. We spent more time on failure handling, idempotency, and reconciliation than on any other aspect of the system.',
            'Regulatory compliance was the most time-consuming part of the build. KYC (Know Your Customer) and AML (Anti-Money Laundering) requirements vary by jurisdiction and change frequently. We built a compliance layer that could be updated independently of the core payment logic — a decision that has saved us significant rework as regulations have evolved.',
            'User trust is the hardest thing to build and the easiest to lose. Every design decision in GhanaPay was evaluated through the lens of trust: does this make the user feel safe? Does this confirm that their money is where it should be? The most impactful change we made was adding real-time transaction confirmations with clear, plain-language status messages. Anxiety about money is universal — good UX acknowledges it.',
            'The lesson we\'d share with anyone building a fintech product: invest in your infrastructure before your features. A payment product with five features that works reliably is infinitely more valuable than one with twenty features that occasionally fails. Reliability is the product.',
          ],
          category: 'Software Development',
          tags: ['Fintech', 'GhanaPay', 'Product Development', 'Payments'],
          author: 'Manuel',
          authorRole: 'Founder & CEO',
          authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
          publishedAt: '2024-12-18',
          readTime: '10 min read',
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=85',
          featured: true,
        },
      ];
      await this.blogModel.insertMany(defaultBlogPosts);
      console.log('Seeded blog posts successfully!');
    }

    console.log('Database seeding check complete!');
  }
}
