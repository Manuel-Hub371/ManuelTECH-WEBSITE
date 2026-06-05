export interface ServiceItem {
  name: string
  description?: string
}

export interface ServiceDetail {
  headline: string          // bold statement at top of detail page
  body: string[]            // paragraphs
  whoIsItFor: string[]      // bullet list of ideal clients
  outcomes: string[]        // what clients get
  process: { title: string; desc: string }[]
  faqs: { q: string; a: string }[]
  relatedIds: string[]      // other service IDs to cross-link
  image: string
  accentColor: string       // Tailwind bg class
  textAccent: string        // Tailwind text class
  borderAccent: string      // Tailwind border-l class
}

export interface ServiceCategory {
  id: string
  slug: string
  title: string
  icon: string
  description: string
  items: ServiceItem[]
  detail: ServiceDetail
}

export const serviceCategories: ServiceCategory[] = [
  /* ── 1. Web Development ─────────────────────────────────────── */
  {
    id: 'web',
    slug: 'web-development',
    title: 'Web Development',
    icon: 'Globe',
    description: 'Fast, modern, and scalable websites and web applications built to convert visitors into customers.',
    items: [
      { name: 'Corporate & Business Websites', description: 'Professional websites that represent your brand and drive leads.' },
      { name: 'E-Commerce Platforms', description: 'Full-featured online stores with payment, inventory, and analytics.' },
      { name: 'Web Applications', description: 'Complex SaaS platforms, dashboards, and portals.' },
      { name: 'Landing Pages', description: 'High-converting pages for campaigns and product launches.' },
      { name: 'CMS & Blog Platforms', description: 'Content-managed sites you can update without a developer.' },
      { name: 'API Development & Integration', description: 'RESTful and GraphQL APIs connecting your systems.' },
    ],
    detail: {
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
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=85',
      accentColor: 'bg-sky-600',
      textAccent: 'text-sky-600',
      borderAccent: 'border-l-sky-500',
    },
  },

  /* ── 2. Software & App Development ──────────────────────────── */
  {
    id: 'software',
    slug: 'software-development',
    title: 'Software & App Development',
    icon: 'Code2',
    description: 'Custom software and mobile applications tailored to your business workflows and scale.',
    items: [
      { name: 'Business Management Systems', description: 'End-to-end platforms for operations, HR, and reporting.' },
      { name: 'School Management Systems', description: 'Student records, academics, and parent portals.' },
      { name: 'Hospital Management Systems', description: 'Patient care, billing, and clinical workflows.' },
      { name: 'Inventory Systems', description: 'Real-time stock tracking and supply chain visibility.' },
      { name: 'ERP Solutions', description: 'Unified finance, inventory, and resource planning.' },
      { name: 'Mobile Apps (iOS & Android)', description: 'Cross-platform apps with offline-ready architecture.' },
    ],
    detail: {
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
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85',
      accentColor: 'bg-primary-600',
      textAccent: 'text-primary-600',
      borderAccent: 'border-l-primary-600',
    },
  },

  /* ── 3. AI & Automation Agents ───────────────────────────────── */
  {
    id: 'ai',
    slug: 'ai-automation',
    title: 'AI & Automation Agents',
    icon: 'Brain',
    description: 'Intelligent systems and autonomous agents that learn from your data, automate decisions, and eliminate repetitive work.',
    items: [
      { name: 'AI Chatbots & Agents', description: '24/7 conversational agents across web, WhatsApp, and messaging.' },
      { name: 'Automation Workflows', description: 'Trigger actions across apps when events occur — no manual steps.' },
      { name: 'Computer Vision', description: 'Image recognition, quality control, and surveillance AI.' },
      { name: 'Predictive Analytics', description: 'Forecast demand, churn, and operational risks.' },
      { name: 'NLP & Document AI', description: 'Document analysis, sentiment, and language understanding.' },
      { name: 'Business Process Automation', description: 'Digitize approvals, invoicing, and onboarding.' },
      { name: 'IoT & Smart Systems', description: 'Sensor networks, smart home, and real-time dashboards.' },
    ],
    detail: {
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
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
      accentColor: 'bg-violet-600',
      textAccent: 'text-violet-600',
      borderAccent: 'border-l-violet-600',
    },
  },

  /* ── 4. Creative Services ────────────────────────────────────── */
  {
    id: 'creative',
    slug: 'creative-services',
    title: 'Creative Services',
    icon: 'Palette',
    description: 'Design that makes your brand and digital products unforgettable — from first impression to final pixel.',
    items: [
      { name: 'Graphic Design', description: 'Marketing materials, social assets, flyers, and print.' },
      { name: 'Branding & Identity', description: 'Logo, color systems, typography, and brand guidelines.' },
      { name: 'UI/UX Design', description: 'User-centered interfaces for web and mobile products.' },
      { name: 'Motion Graphics', description: 'Animated visuals for social media and presentations.' },
      { name: 'Pitch Decks & Presentations', description: 'Compelling decks that win clients and investors.' },
    ],
    detail: {
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
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85',
      accentColor: 'bg-rose-600',
      textAccent: 'text-rose-600',
      borderAccent: 'border-l-rose-500',
    },
  },

  /* ── 5. Robotics ─────────────────────────────────────────────── */
  {
    id: 'robotics',
    slug: 'robotics',
    title: 'Robotics',
    icon: 'Bot',
    description: 'Hardware and software for physical automation, security, and intelligent robotic systems.',
    items: [
      { name: 'Smart Gate & Access Control', description: 'Automated access with facial recognition and audit logs.' },
      { name: 'Security Robots', description: 'Autonomous patrol and monitoring for facilities.' },
      { name: 'Service Robots', description: 'Delivery and assistance robots for commercial spaces.' },
      { name: 'Home Assistant Robots', description: 'Domestic helpers for cleaning and household support.' },
      { name: 'Custom Robotics Solutions', description: 'Bespoke hardware-software systems for unique use cases.' },
    ],
    detail: {
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
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85',
      accentColor: 'bg-amber-500',
      textAccent: 'text-amber-600',
      borderAccent: 'border-l-amber-500',
    },
  },

  /* ── 6. Training & Education ─────────────────────────────────── */
  {
    id: 'training',
    slug: 'training-education',
    title: 'Training & Education',
    icon: 'GraduationCap',
    description: 'Practical, hands-on technology training for individuals, teams, and institutions — from beginners to professionals.',
    items: [
      { name: 'Web & Software Development', description: 'Full-stack development bootcamps and structured courses.' },
      { name: 'AI & Machine Learning', description: 'Practical AI training covering tools, models, and real projects.' },
      { name: 'Robotics & Electronics', description: 'Hands-on robotics, Arduino, and embedded systems training.' },
      { name: 'UI/UX & Graphic Design', description: 'Design thinking, Figma, and visual communication courses.' },
      { name: 'Corporate Tech Training', description: 'Upskilling programs tailored for teams and organizations.' },
      { name: 'Digital Literacy Programs', description: 'Foundational tech skills for schools and communities.' },
    ],
    detail: {
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
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85',
      accentColor: 'bg-emerald-600',
      textAccent: 'text-emerald-600',
      borderAccent: 'border-l-emerald-600',
    },
  },
]
