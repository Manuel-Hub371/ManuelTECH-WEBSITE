/* ─── Company Products ──────────────────────────────────────────── */
export interface Product {
  id: string
  name: string
  tagline: string
  category: 'AI' | 'Software' | 'Fintech' | 'Developer Tools'
  status: 'Live' | 'Beta' | 'In Development'
  description: string
  longDescription: string
  features: string[]
  techStack: string[]
  image: string
  accentColor: string
  textAccent: string
  borderAccent: string
  tryUrl?: string
  downloadUrl?: string
  readMoreUrl?: string
  learnMoreUrl?: string
  showInPortfolio: boolean
}

export const companyProducts: Product[] = [
  {
    id: 'edith-ai',
    name: 'EDITH AI',
    tagline: 'Your intelligent AI assistant — always on, always learning.',
    category: 'AI',
    status: 'Live',
    showInPortfolio: true,
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
  },
  {
    id: 'unkonet',
    name: 'unKonet',
    tagline: 'The complete university management platform.',
    category: 'Software',
    status: 'Live',
    showInPortfolio: true,
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
  },
  {
    id: 'vibe-ide',
    name: 'Vibe IDE',
    tagline: 'The AI-powered coding environment for vibe coders.',
    category: 'Developer Tools',
    status: 'Beta',
    showInPortfolio: true,
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
  },
  {
    id: 'ghanapay',
    name: 'GhanaPay',
    tagline: 'Send and receive money anywhere in the world — from Ghana.',
    category: 'Fintech',
    status: 'Live',
    showInPortfolio: true,
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
  },
]

/* ─── Case Studies ───────────────────────────────────────────────── */
export interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  industry: string
  description: string
  challenge: string
  solution: string
  results: string[]
  techStack: string[]
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'hospital-erp',
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
    id: 'school-mgmt',
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
    id: 'ai-customer-agent',
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
    id: 'smart-gate',
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
    id: 'finedge-rebrand',
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
    id: 'asante-website',
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
]

/* ─── Completed Projects ─────────────────────────────────────────── */
export interface CompletedProject {
  id: string
  title: string
  category: string
  year: string
  description: string
  techStack: string[]
}

export const completedProjects: CompletedProject[] = [
  { id: 'p1',  title: 'Inventory Management System',       category: 'Software',   year: '2024', description: 'Multi-warehouse inventory with barcode scanning and automated reorder alerts.',       techStack: ['React', 'Node.js', 'PostgreSQL'] },
  { id: 'p2',  title: 'Business Workflow Automation',      category: 'AI',         year: '2024', description: 'AI-powered invoice processing and approval workflows across departments.',            techStack: ['NestJS', 'n8n', 'PostgreSQL'] },
  { id: 'p3',  title: 'Tech Training Bootcamp (Cohort 3)', category: 'Training',   year: '2024', description: '12-week bootcamp — 40 participants, 85% job placement rate within 3 months.',        techStack: ['React', 'Python', 'Figma'] },
  { id: 'p4',  title: 'E-Commerce Platform',               category: 'Web',        year: '2023', description: 'Full-featured online store with payment integration, inventory, and analytics.',     techStack: ['Next.js', 'Stripe', 'PostgreSQL'] },
  { id: 'p5',  title: 'IoT Sensor Network',                category: 'Robotics',   year: '2023', description: 'Real-time sensor network for a manufacturing plant with edge computing.',            techStack: ['Arduino', 'MQTT', 'Python'] },
  { id: 'p6',  title: 'HR Management System',              category: 'Software',   year: '2023', description: 'End-to-end HR platform covering recruitment, payroll, and performance reviews.',     techStack: ['React', 'NestJS', 'PostgreSQL'] },
  { id: 'p7',  title: 'Brand Identity — TechBridge NGO',   category: 'Creative',   year: '2023', description: 'Full brand identity including logo, guidelines, and marketing collateral.',          techStack: ['Figma', 'Illustrator'] },
  { id: 'p8',  title: 'AI Predictive Analytics Dashboard', category: 'AI',         year: '2022', description: 'Demand forecasting and anomaly detection dashboard for a logistics company.',        techStack: ['Python', 'React', 'PostgreSQL'] },
  { id: 'p9',  title: 'Mobile Banking App',                category: 'Software',   year: '2022', description: 'Cross-platform mobile banking app with biometric auth and real-time notifications.', techStack: ['React Native', 'Node.js'] },
  { id: 'p10', title: 'Security Patrol Robot (Prototype)', category: 'Robotics',   year: '2022', description: 'Autonomous patrol robot with thermal imaging and real-time alert streaming.',        techStack: ['Python', 'ROS', 'OpenCV'] },
  { id: 'p11', title: 'Corporate Training Program',        category: 'Training',   year: '2022', description: 'Custom 8-week upskilling program for a 30-person engineering team.',                techStack: ['React', 'Python', 'AWS'] },
  { id: 'p12', title: 'Real Estate Listing Platform',      category: 'Web',        year: '2021', description: 'Property listing and search platform with map integration and agent portal.',        techStack: ['React', 'Node.js', 'PostgreSQL'] },
]
