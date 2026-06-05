export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export const coreValues = [
  {
    title: 'Innovation First',
    description: 'We push boundaries with cutting-edge AI, automation, and robotics to solve real problems.',
  },
  {
    title: 'Client Partnership',
    description: 'Your success is our metric. We collaborate closely from discovery through deployment.',
  },
  {
    title: 'Quality & Reliability',
    description: 'Every system we build is engineered for performance, security, and long-term maintainability.',
  },
  {
    title: 'Ethical Technology',
    description: 'We design AI and automation responsibly, with transparency and human oversight built in.',
  },
  {
    title: 'Continuous Learning',
    description: 'We invest in training our team and our clients — because knowledge is the foundation of every great solution.',
  },
  {
    title: 'Inclusive Impact',
    description: 'We build technology that works for everyone, and we train the next generation of tech talent across communities.',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Manuel',
    role: 'Founder & CEO',
    bio: 'Software engineer and entrepreneur passionate about AI, robotics, and education. Founded ManuelTECH to bring enterprise-grade technology to businesses of every size.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Sarah Chen',
    role: 'AI & Automation Lead',
    bio: 'Specializes in machine learning pipelines, NLP systems, and deploying production AI agents at scale.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'David Okonkwo',
    role: 'Robotics Engineer',
    bio: 'Hardware and embedded systems expert with deep experience in sensors, actuators, and autonomous navigation.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Elena Vasquez',
    role: 'Creative & UI/UX Lead',
    bio: 'Creates intuitive interfaces and brand identities that connect users with complex technology beautifully.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'James Otieno',
    role: 'Head of Training',
    bio: 'Curriculum designer and educator who has trained hundreds of developers, designers, and tech professionals.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Full-Stack Engineer',
    bio: 'Builds scalable web applications and APIs with a focus on performance, accessibility, and clean architecture.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
]
