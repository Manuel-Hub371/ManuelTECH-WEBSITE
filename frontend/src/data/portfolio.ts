export interface PortfolioProject {
  id: string
  title: string
  category: string
  description: string
  features: string[]
  techStack: string[]
  challenges: string
  results: string
  image: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'school-mgmt',
    title: 'School Management System',
    category: 'Software Development',
    description: 'A comprehensive platform for schools to manage students, staff, and finances in one place.',
    features: ['Student Management', 'Attendance Tracking', 'Fee Management', 'Parent Portal', 'Report Cards'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'NestJS'],
    challenges: 'Legacy paper processes caused delays and data loss across multiple campuses.',
    results: 'Reduced administrative workload by 60% and improved parent engagement with real-time updates.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  },
  {
    id: 'hospital-erp',
    title: 'Hospital Management System',
    category: 'Software Development',
    description: 'Clinical and administrative system for patient records, appointments, and billing.',
    features: ['Patient Records', 'Appointment Scheduling', 'Pharmacy Inventory', 'Billing & Insurance'],
    techStack: ['React', 'NestJS', 'PostgreSQL', 'Redis'],
    challenges: 'Disconnected systems led to long wait times and billing errors.',
    results: 'Cut patient wait times by 35% and achieved 99.2% billing accuracy.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  },
  {
    id: 'inventory-pro',
    title: 'Inventory Management System',
    category: 'Software Development',
    description: 'Multi-warehouse inventory tracking with barcode scanning and automated reorder alerts.',
    features: ['Stock Tracking', 'Barcode Scanning', 'Supplier Management', 'Analytics Dashboard'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'MQTT'],
    challenges: 'Manual stock counts caused frequent stockouts and over-ordering.',
    results: 'Inventory accuracy improved to 98% with 40% reduction in holding costs.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Service Agent',
    category: 'AI & Automation',
    description: 'Intelligent agent handling customer inquiries with human handoff when needed.',
    features: ['Natural Language Understanding', 'Multi-language Support', 'CRM Integration', 'Analytics'],
    techStack: ['Python', 'OpenAI API', 'React', 'PostgreSQL'],
    challenges: 'Support team overwhelmed with repetitive tickets during peak hours.',
    results: 'Resolved 70% of inquiries automatically with 4.8/5 customer satisfaction.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
  {
    id: 'smart-gate',
    title: 'Smart Gate Sensor System',
    category: 'Robotics',
    description: 'Automated gate control with facial recognition and access logging for secure facilities.',
    features: ['RFID & Face Recognition', 'Access Logs', 'Mobile Alerts', 'Cloud Dashboard'],
    techStack: ['Arduino', 'Python', 'React', 'PostgreSQL', 'MQTT'],
    challenges: 'Manual gate security was slow and lacked audit trails.',
    results: 'Entry processing time reduced from 45s to under 5s with full audit compliance.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
  },
  {
    id: 'workflow-auto',
    title: 'Business Workflow Automation',
    category: 'AI & Automation',
    description: 'Automated invoice processing, approvals, and notifications across departments using AI-powered document recognition.',
    features: ['Document OCR', 'Approval Workflows', 'Email Integration', 'SLA Tracking'],
    techStack: ['Node.js', 'NestJS', 'PostgreSQL', 'n8n'],
    challenges: 'Paper-based approvals caused 2-week delays on critical purchases.',
    results: 'Approval cycle time reduced from 14 days to 48 hours on average.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'corporate-website',
    title: 'Asante Ventures Corporate Website',
    category: 'Web Development',
    description: 'High-performance corporate website with lead generation, CMS, and multilingual support for a pan-African investment firm.',
    features: ['CMS Integration', 'Lead Capture Forms', 'Multilingual Support', 'SEO Optimization', 'Analytics Dashboard'],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Sanity CMS'],
    challenges: 'The old site was slow, not mobile-friendly, and generated almost no inbound leads.',
    results: 'Page load time dropped from 8s to under 1.5s. Inbound leads doubled within the first month.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 'training-bootcamp',
    title: 'Tech Training Bootcamp',
    category: 'Training & Education',
    description: 'A 12-week intensive bootcamp covering web development, AI fundamentals, and UI/UX design for 40 participants.',
    features: ['Web Development Track', 'AI & Automation Track', 'UI/UX Design Track', 'Capstone Projects', 'Job Placement Support'],
    techStack: ['React', 'Python', 'Figma', 'Node.js'],
    challenges: 'Participants had varying skill levels and needed a curriculum that could scale from beginner to job-ready.',
    results: '85% of graduates secured tech roles or freelance contracts within 3 months of completing the program.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  },
  {
    id: 'creative-rebrand',
    title: 'FinEdge Brand & App Redesign',
    category: 'Creative Services',
    description: 'Complete brand identity overhaul and UI/UX redesign of a fintech mobile app serving 50,000+ users.',
    features: ['Brand Identity System', 'Mobile App UI/UX', 'Design System', 'Onboarding Flow', 'Marketing Assets'],
    techStack: ['Figma', 'Adobe Illustrator', 'React Native'],
    challenges: 'The existing app had poor retention due to confusing navigation and an outdated visual identity.',
    results: 'User retention increased by 40% and app store rating improved from 3.1 to 4.7 within 60 days of launch.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
]
