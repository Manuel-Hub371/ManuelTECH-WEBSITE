import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@Controller('api/chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async sendMessage(@Body() chatMessageDto: ChatMessageDto) {
    const response = await this.chatbotService.getResponse(
      chatMessageDto.message,
    );
    return { response };
  }
}
