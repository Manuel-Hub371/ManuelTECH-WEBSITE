# 🏗️ Chatbot Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    ManelTECH Website                       │  │
│  │  ┌──────────────────────────────────────────────────┐     │  │
│  │  │  Homepage / Services / About / Portfolio / etc.  │     │  │
│  │  └──────────────────────────────────────────────────┘     │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────┐               │  │
│  │  │          CHATBOT COMPONENT             │  ← Floats on │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  │    top of     │  │
│  │  │  │   Button     │  │    Dialog    │  │    all pages  │  │
│  │  │  │   [💬]      │  │  (Chat UI)   │  │               │  │
│  │  │  └──────────────┘  └──────────────┘  │               │  │
│  │  └────────────────────────────────────────┘               │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Request
                            │ POST /api/chatbot
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER (NestJS)                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    App Module                              │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │            Chatbot Module                           │  │  │
│  │  │  ┌──────────────────┐  ┌──────────────────┐        │  │  │
│  │  │  │   Controller     │→ │    Service       │        │  │  │
│  │  │  │  (Route Handler) │  │  (AI Logic)      │        │  │  │
│  │  │  └──────────────────┘  └──────────────────┘        │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Response
                            │ { response: "..." }
                            ▼
                    Back to User Browser
```

---

## Component Architecture

### Frontend (React)

```
App.tsx
  ├─ BrowserRouter
  │   ├─ ChatBot ◄───────────────── GLOBAL COMPONENT
  │   │   ├─ Floating Button
  │   │   │   └─ Icon (MessageCircle / X)
  │   │   │
  │   │   └─ Chat Dialog (conditional)
  │   │       ├─ Header
  │   │       │   ├─ Bot Icon
  │   │       │   └─ Title
  │   │       │
  │   │       ├─ Messages Container
  │   │       │   ├─ Bot Message
  │   │       │   ├─ User Message
  │   │       │   ├─ Bot Message
  │   │       │   └─ Loading Indicator
  │   │       │
  │   │       └─ Input Area
  │   │           ├─ Text Input
  │   │           └─ Send Button
  │   │
  │   └─ Routes
  │       ├─ HomePage
  │       ├─ ServicesPage
  │       ├─ AboutPage
  │       └─ ... (other pages)
  │
  └─ (ChatBot appears on all routes)
```

---

## Data Flow

### 1. User Sends Message

```
┌──────────┐
│   User   │
│  Types   │
│  "Hello" │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│  Input Field    │
│  value="Hello"  │
└────┬────────────┘
     │
     │ Press Enter or Click Send
     ▼
┌──────────────────┐
│ handleSendMessage│
│  function        │
└────┬─────────────┘
     │
     ├─ Add user message to state
     │  messages.push({
     │    text: "Hello",
     │    sender: "user",
     │    timestamp: now
     │  })
     │
     ├─ Show in UI immediately
     │
     ├─ Clear input field
     │
     └─ Make API call
        │
        ▼
```

### 2. API Request

```
fetch(`${VITE_API_URL}/api/chatbot`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: "Hello" })
})
```

**Request Flow:**
```
Frontend                Backend
   │                       │
   ├─ POST /api/chatbot ──→│
   │  { message: "Hello" } │
   │                       │
   │                       ├─ Validate DTO
   │                       │
   │                       ├─ Controller receives
   │                       │
   │                       ├─ Call service.getResponse()
   │                       │
   │                       ├─ Analyze keywords
   │                       │
   │                       ├─ Match pattern
   │                       │
   │                       └─ Generate response
   │                       │
   │◄── Response ──────────┤
   │  { response: "Hi..." }│
   │                       │
```

### 3. Display Response

```
   ├─ Receive response
   │
   ├─ Add bot message to state
   │  messages.push({
   │    text: "Hi! Welcome to ManelTECH...",
   │    sender: "bot",
   │    timestamp: now
   │  })
   │
   ├─ Hide loading indicator
   │
   ├─ Render in UI
   │
   └─ Auto-scroll to bottom
```

---

## State Management

```typescript
// Component State
const [isOpen, setIsOpen] = useState(false)
// Controls dialog visibility

const [messages, setMessages] = useState<Message[]>([...])
// Stores conversation history

const [inputValue, setInputValue] = useState('')
// Current input text

const [isLoading, setIsLoading] = useState(false)
// Shows typing indicator
```

---

## Backend Architecture

```
chatbot.module.ts
  └─ Exports
      ├─ ChatbotController
      └─ ChatbotService

chatbot.controller.ts
  └─ @Controller('chatbot')
      └─ @Post()
          └─ sendMessage(@Body() dto)
              └─ Calls → chatbotService.getResponse()

chatbot.service.ts
  └─ getResponse(message: string)
      ├─ Convert to lowercase
      ├─ Check keyword patterns
      │   ├─ Greetings? → Return greeting
      │   ├─ Services? → Return service list
      │   ├─ Pricing? → Return pricing info
      │   ├─ Contact? → Return contact info
      │   └─ ... (more patterns)
      └─ Return response string

chat-message.dto.ts
  └─ Validates request
      └─ message: string (required, not empty)
```

---

## API Endpoint Details

```
POST /api/chatbot

Request:
{
  "message": "What services do you offer?"
}

Response:
{
  "response": "We offer a wide range of services including:\n\n• Web Development\n• Mobile App Development\n• Cloud Solutions\n• UI/UX Design\n• Digital Marketing\n• Consulting Services\n\nWould you like to know more about any specific service?"
}

Status Codes:
- 200: Success
- 400: Bad request (invalid message)
- 500: Server error
```

---

## Keyword Matching Logic

```typescript
getResponse(message: string) {
  const lowerMessage = message.toLowerCase()
  
  // Pattern matching cascade
  if (matches_greeting) return greeting_response
  if (matches_services) return services_response
  if (matches_web) return web_response
  if (matches_mobile) return mobile_response
  if (matches_portfolio) return portfolio_response
  if (matches_pricing) return pricing_response
  if (matches_contact) return contact_response
  if (matches_team) return team_response
  if (matches_tech) return tech_response
  if (matches_timeline) return timeline_response
  if (matches_thanks) return thanks_response
  if (matches_goodbye) return goodbye_response
  
  return default_response
}
```

---

## Animation Timeline

### Opening Dialog

```
Time    Action
────────────────────────────────────────────
0ms     User clicks button
        ├─ setIsOpen(true)
        │
10ms    Button icon starts rotating
        ├─ MessageCircle → X
        │
50ms    Dialog starts appearing
        ├─ opacity: 0 → 1
        ├─ y: 20px → 0
        └─ scale: 0.95 → 1
        │
200ms   Animation complete
        └─ Dialog fully visible
```

### Sending Message

```
Time    Action
────────────────────────────────────────────
0ms     User presses Enter
        ├─ User message appears
        │
10ms    Input clears
        ├─ value = ""
        │
20ms    Loading indicator appears
        ├─ Three dots bouncing
        │
100ms   API request sent
        │
1000ms  Response received
        ├─ Loading indicator hides
        │
1010ms  Bot message appears
        ├─ Fade in animation
        │
1050ms  Auto-scroll to bottom
        │
1200ms  Animation complete
```

---

## Error Handling

```
User sends message
  │
  ├─ Validation
  │   ├─ Empty? → Don't send
  │   └─ Valid → Continue
  │
  ├─ API Call
  │   ├─ Success (200)
  │   │   └─ Display response
  │   │
  │   ├─ Network Error
  │   │   └─ Show error message
  │   │       "Having trouble connecting..."
  │   │
  │   ├─ Server Error (500)
  │   │   └─ Show error message
  │   │
  │   └─ Timeout
  │       └─ Show error message
  │
  └─ Finally
      └─ setIsLoading(false)
```

---

## Performance Optimization

### Frontend
```
✓ Lazy state updates
✓ Debounced scroll
✓ Conditional rendering (isOpen)
✓ AnimatePresence cleanup
✓ Event listener cleanup
✓ Ref-based DOM access
```

### Backend
```
✓ No database queries (keyword-based)
✓ Simple string operations
✓ Fast pattern matching
✓ No external API calls
✓ Minimal memory usage
```

---

## Security Considerations

### Frontend
```
✓ No localStorage of sensitive data
✓ HTTPS only in production
✓ Input sanitization (React handles)
✓ No eval() or dangerous methods
```

### Backend
```
✓ DTO validation (class-validator)
✓ CORS configuration
✓ No SQL injection (no database)
✓ Rate limiting (can be added)
✓ No user data storage
```

---

## Scalability Path

### Current (MVP)
```
Browser → NestJS → Keyword Matching → Response
         (Fast, Simple, No cost)
```

### Future (AI-Powered)
```
Browser → NestJS → OpenAI/Gemini → Response
         (Smart, Context-aware, Small cost)
```

### Advanced
```
Browser → NestJS → AI + Vector DB + RAG → Response
         (Very smart, Company knowledge, Medium cost)
```

---

## Technology Stack

```
Frontend
├─ React 19          (UI framework)
├─ TypeScript 6      (Type safety)
├─ Tailwind CSS 4    (Styling)
├─ Framer Motion 12  (Animations)
├─ Lucide React 1    (Icons)
└─ Vite 8            (Build tool)

Backend
├─ NestJS 11         (Framework)
├─ TypeScript 5      (Language)
├─ Class Validator   (Validation)
└─ Express           (HTTP server)
```

---

## File Dependencies

```
frontend/src/components/ChatBot.tsx
  ├─ Imports
  │   ├─ react (useState, useRef, useEffect)
  │   ├─ framer-motion (motion, AnimatePresence)
  │   └─ lucide-react (MessageCircle, X, Send, Bot)
  │
  └─ Uses
      └─ import.meta.env.VITE_API_URL

backend/src/chatbot/chatbot.controller.ts
  ├─ Imports
  │   ├─ @nestjs/common (Body, Controller, Post)
  │   ├─ ./chatbot.service (ChatbotService)
  │   └─ ./dto/chat-message.dto (ChatMessageDto)
  │
  └─ Depends on
      └─ chatbot.service

backend/src/chatbot/chatbot.service.ts
  ├─ Imports
  │   └─ @nestjs/common (Injectable)
  │
  └─ No external dependencies
```

---

## Environment Variables

```
frontend/.env
VITE_API_URL=http://localhost:3000
            └─ Used in ChatBot.tsx for API calls

backend/.env
PORT=3000
MONGODB_URI=...
(No specific chatbot vars needed yet)

# Future with AI:
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
```

---

**Architecture Status:** ✅ Production Ready

This architecture is:
- ✅ Scalable (can upgrade to AI)
- ✅ Maintainable (clear separation)
- ✅ Testable (isolated components)
- ✅ Performant (fast responses)
- ✅ Secure (validated inputs)
