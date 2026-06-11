# AI Chatbot Feature

## Overview
A floating AI chatbot widget that appears on the bottom-right corner of the website. Users can click it to open a chat dialog and ask questions about ManelTECH's services, portfolio, and contact information.

## Features

### Frontend (React + TypeScript)
- ✅ **Floating Button**: Fixed position at bottom-right corner, not movable
- ✅ **Smooth Animations**: Using Framer Motion for elegant transitions
- ✅ **Chat Dialog**: Opens as a popup when clicked
- ✅ **Message History**: Displays conversation with timestamps
- ✅ **Loading States**: Animated typing indicator while AI responds
- ✅ **Responsive Design**: Styled with Tailwind CSS
- ✅ **Icons**: Lucide React icons for bot, send, close buttons

### Backend (NestJS + TypeScript)
- ✅ **API Endpoint**: `POST /api/chatbot`
- ✅ **Intelligent Responses**: Keyword-based AI that understands:
  - Greetings and farewells
  - Service inquiries
  - Portfolio and projects
  - Pricing questions
  - Contact information
  - Team information
  - Technology stack
  - Consultation requests
  - Project timelines

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ChatBot.tsx          # Main chatbot component
│   └── App.tsx                   # Integrated chatbot

backend/
├── src/
│   └── chatbot/
│       ├── chatbot.controller.ts  # API endpoint
│       ├── chatbot.service.ts     # AI logic
│       ├── chatbot.module.ts      # Module registration
│       └── dto/
│           └── chat-message.dto.ts # Request validation
```

## How It Works

1. **User Interaction**: User clicks the floating button
2. **Chat Opens**: Dialog appears with greeting message
3. **Send Message**: User types and sends a message
4. **API Call**: Frontend sends POST request to `/api/chatbot`
5. **AI Processing**: Backend analyzes message keywords
6. **Response**: Backend returns intelligent response
7. **Display**: Message appears in chat with timestamp

## API Endpoint

### Request
```typescript
POST /api/chatbot
Content-Type: application/json

{
  "message": "What services do you offer?"
}
```

### Response
```typescript
{
  "response": "We offer a wide range of services including:\n\n• Web Development\n• Mobile App Development\n• Cloud Solutions\n• UI/UX Design\n• Digital Marketing\n• Consulting Services\n\nWould you like to know more about any specific service?"
}
```

## Customization

### Update Company Information
Edit `backend/src/chatbot/chatbot.service.ts`:

```typescript
private readonly companyInfo = {
  name: 'ManelTECH',
  description: 'Your description',
  services: ['Service 1', 'Service 2'],
  contact: {
    email: 'your@email.com',
    phone: '+1 (555) 123-4567',
  },
};
```

### Add New Response Patterns
In `chatbot.service.ts`, add new conditions:

```typescript
// Example: Adding support for "refund" inquiries
if (lowerMessage.includes('refund') || lowerMessage.includes('return')) {
  return 'Our refund policy message...';
}
```

### Styling
Edit `frontend/src/components/ChatBot.tsx` to change:
- Colors: `bg-blue-600` → `bg-your-color`
- Position: `bottom-6 right-6` → adjust as needed
- Size: `w-96 h-[600px]` → change dimensions

## Future Enhancements

### Upgrade to Real AI
Replace the keyword system with:
- **OpenAI GPT**: For natural language understanding
- **Google Gemini**: Cost-effective alternative
- **Anthropic Claude**: Advanced reasoning

Example OpenAI integration:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async getResponse(message: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { 
        role: 'system', 
        content: 'You are a helpful assistant for ManelTECH...' 
      },
      { role: 'user', content: message }
    ],
  });
  
  return completion.choices[0].message.content;
}
```

### Additional Features
- [ ] Save chat history to database
- [ ] Send chat transcripts to admin email
- [ ] Add file upload for project requirements
- [ ] Multilingual support
- [ ] Voice input/output
- [ ] Integration with booking system
- [ ] Lead capture (email collection)
- [ ] Analytics dashboard for chat metrics

## Environment Variables

Make sure your `.env` files are configured:

**Backend** (`backend/.env`):
```env
# If using real AI
OPENAI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3000
```

## Testing

### Manual Testing
1. Start backend: `cd backend && npm run start:dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open browser and click chatbot button
4. Try these test messages:
   - "Hello"
   - "What services do you offer?"
   - "How much does a website cost?"
   - "How can I contact you?"
   - "Tell me about your team"

### Expected Behavior
- ✅ Button floats at bottom-right
- ✅ Smooth open/close animation
- ✅ Messages appear instantly
- ✅ AI responds within 1-2 seconds
- ✅ Scroll to latest message automatically
- ✅ Timestamps show correctly

## Troubleshooting

### Chatbot doesn't appear
- Check if `<ChatBot />` is added to `App.tsx`
- Verify import statement is correct
- Check browser console for errors

### API errors
- Ensure backend is running
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS is enabled in backend

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check if `lucide-react` icons are installed
- Verify Framer Motion is installed

## Support
For issues or questions, contact the development team or refer to the main README.md.
