import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  // Company knowledge base
  private readonly companyInfo = {
    name: 'ManelTECH',
    description:
      'A technology company specializing in web development, mobile apps, and digital solutions',
    services: [
      'Web Development',
      'Mobile App Development',
      'Cloud Solutions',
      'UI/UX Design',
      'Digital Marketing',
      'Consulting Services',
    ],
    contact: {
      email: 'contact@maneltech.com',
      phone: '+1 (555) 123-4567',
    },
  };

  // Simple keyword-based response system
  async getResponse(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (
      /^(hi|hello|hey|greetings)/i.test(lowerMessage) ||
      lowerMessage.includes('good morning') ||
      lowerMessage.includes('good afternoon')
    ) {
      return `Hello! Welcome to ${this.companyInfo.name}. How can I assist you today? Feel free to ask about our services, portfolio, or anything else!`;
    }

    // Services
    if (
      lowerMessage.includes('service') ||
      lowerMessage.includes('what do you do') ||
      lowerMessage.includes('what can you do')
    ) {
      return `We offer a wide range of services including:\n\n${this.companyInfo.services.map((s) => `• ${s}`).join('\n')}\n\nWould you like to know more about any specific service?`;
    }

    // Web development
    if (
      lowerMessage.includes('web') ||
      lowerMessage.includes('website') ||
      lowerMessage.includes('frontend') ||
      lowerMessage.includes('backend')
    ) {
      return `We specialize in full-stack web development! We build modern, responsive websites and web applications using cutting-edge technologies like React, Node.js, and more. We can help you create anything from corporate websites to complex web platforms. Would you like to discuss your project?`;
    }

    // Mobile apps
    if (
      lowerMessage.includes('mobile') ||
      lowerMessage.includes('app') ||
      lowerMessage.includes('ios') ||
      lowerMessage.includes('android')
    ) {
      return `We develop native and cross-platform mobile applications for both iOS and Android. Our mobile solutions are user-friendly, scalable, and tailored to your business needs. Interested in building a mobile app?`;
    }

    // Portfolio/Projects
    if (
      lowerMessage.includes('portfolio') ||
      lowerMessage.includes('project') ||
      lowerMessage.includes('work') ||
      lowerMessage.includes('case stud')
    ) {
      return `You can explore our portfolio showcasing our completed projects and case studies. We've worked with clients across various industries to deliver innovative digital solutions. Visit our Portfolio page to see our work in action!`;
    }

    // Pricing
    if (
      lowerMessage.includes('price') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('budget') ||
      lowerMessage.includes('how much')
    ) {
      return `Project pricing varies based on scope, complexity, and requirements. We offer competitive rates and flexible payment options. For an accurate quote tailored to your needs, please contact us or schedule a free consultation. Every project is unique!`;
    }

    // Contact
    if (
      lowerMessage.includes('contact') ||
      lowerMessage.includes('email') ||
      lowerMessage.includes('phone') ||
      lowerMessage.includes('reach') ||
      lowerMessage.includes('call')
    ) {
      return `You can reach us at:\n\n📧 Email: ${this.companyInfo.contact.email}\n📱 Phone: ${this.companyInfo.contact.phone}\n\nOr visit our Contact page to send us a message directly. We typically respond within 24 hours!`;
    }

    // Consultation
    if (
      lowerMessage.includes('consult') ||
      lowerMessage.includes('meeting') ||
      lowerMessage.includes('discuss')
    ) {
      return `We'd love to discuss your project! We offer free initial consultations to understand your needs and provide recommendations. Visit our Contact page to schedule a meeting, or reach out via email or phone. Let's bring your ideas to life!`;
    }

    // Team/About
    if (
      lowerMessage.includes('team') ||
      lowerMessage.includes('who are you') ||
      lowerMessage.includes('about')
    ) {
      return `${this.companyInfo.name} is powered by a talented team of developers, designers, and digital strategists passionate about technology and innovation. Learn more about us and meet our team on the About page!`;
    }

    // Technologies
    if (
      lowerMessage.includes('technolog') ||
      lowerMessage.includes('stack') ||
      lowerMessage.includes('tools')
    ) {
      return `We work with modern technologies including React, Node.js, TypeScript, NestJS, PostgreSQL, MongoDB, AWS, and more. We choose the right tech stack based on your project requirements to ensure optimal performance and scalability.`;
    }

    // Timeline
    if (
      lowerMessage.includes('how long') ||
      lowerMessage.includes('timeline') ||
      lowerMessage.includes('duration')
    ) {
      return `Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while complex applications can take several months. We'll provide a detailed timeline after understanding your requirements during the consultation phase.`;
    }

    // Thank you
    if (
      lowerMessage.includes('thank') ||
      lowerMessage.includes('thanks') ||
      lowerMessage.includes('appreciate')
    ) {
      return `You're very welcome! Is there anything else I can help you with? Feel free to ask any questions about our services or reach out for a consultation!`;
    }

    // Goodbye
    if (
      lowerMessage.includes('bye') ||
      lowerMessage.includes('goodbye') ||
      lowerMessage.includes('see you')
    ) {
      return `Thank you for chatting with us! If you have any more questions in the future, don't hesitate to reach out. Have a great day! 👋`;
    }

    // Default response
    return `Thanks for your question! While I can help with general information about ${this.companyInfo.name}, I'd recommend checking out our website or contacting us directly at ${this.companyInfo.contact.email} for more specific inquiries. Is there anything else about our services, portfolio, or contact information I can help with?`;
  }
}
