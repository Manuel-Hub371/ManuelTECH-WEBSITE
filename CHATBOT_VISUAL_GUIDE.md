# Chatbot Visual Guide

## 🎨 What You'll See

### 1. Floating Button (Closed State)
```
                                    Website Content
                                    ...
                                    ...
                                    
                                    
                                    
                                    
                                              [💬]  ← Blue circular button
                                                    (bottom-right corner)
```

**Features:**
- Fixed at bottom-right (24px from edges)
- Blue background (#2563eb)
- Message icon when closed
- Hover: Slightly scales up
- Click: Smoothly transforms to X icon

---

### 2. Chat Dialog (Open State)
```
                                    Website Content
                                    ...
                                    
     ┌──────────────────────────────────────┐
     │ 🤖 ManelTECH Assistant              │  ← Header (Blue)
     │    Always here to help              │
     ├──────────────────────────────────────┤
     │                                      │
     │  ┌────────────────────────────┐     │
     │  │ Hi! I'm ManelTECH's AI     │     │  ← Bot message
     │  │ assistant. How can I help? │     │     (White bubble)
     │  │ 10:30 AM                   │     │
     │  └────────────────────────────┘     │
     │                                      │
     │              ┌─────────────────┐    │
     │              │ What services   │    │  ← User message
     │              │ do you offer?   │    │     (Blue bubble)
     │              │ 10:31 AM        │    │
     │              └─────────────────┘    │
     │                                      │
     │  ┌────────────────────────────┐     │
     │  │ We offer:                  │     │  ← Bot response
     │  │ • Web Development          │     │
     │  │ • Mobile Apps              │     │
     │  │ • Cloud Solutions...       │     │
     │  │ 10:31 AM                   │     │
     │  └────────────────────────────┘     │
     │                                      │
     ├──────────────────────────────────────┤
     │ [Type your message...    ] [Send 📤] │  ← Input area
     └──────────────────────────────────────┘
                                          [❌]  ← Close button
```

**Dimensions:**
- Width: 384px (24rem)
- Height: 600px
- Position: Bottom-right corner
- Gap from edges: 24px

---

## 🎬 Animations

### Opening
1. Button transforms icon (💬 → ❌)
2. Dialog fades in (opacity 0 → 1)
3. Dialog slides up (from bottom)
4. Dialog scales (0.95 → 1.0)
Duration: 200ms smooth

### Messages
- New messages fade in from bottom
- Typing indicator: 3 dots bouncing
- Auto-scroll to latest message

### Closing
- Reverse of opening animation
- Button icon changes back (❌ → 💬)

---

## 🎨 Color Scheme

### Primary Colors
- **Button Background**: `#2563eb` (Blue 600)
- **Button Hover**: `#1d4ed8` (Blue 700)
- **Header**: `#2563eb` (Blue 600)
- **User Messages**: `#2563eb` (Blue 600)
- **Bot Messages**: `#ffffff` (White with border)

### Background Colors
- **Chat Area**: `#f9fafb` (Gray 50)
- **Input Area**: `#ffffff` (White)
- **Dialog**: `#ffffff` (White)

### Text Colors
- **Button Text**: `#ffffff` (White)
- **Header Text**: `#ffffff` (White)
- **User Message**: `#ffffff` (White)
- **Bot Message**: `#1f2937` (Gray 800)
- **Timestamp**: `#6b7280` (Gray 500)

---

## 📱 Responsive Behavior

### Desktop (Default)
- Width: 384px
- Height: 600px
- Position: Bottom-right

### Mobile (< 768px)
You may want to add this CSS to make it fullscreen on mobile:
```css
@media (max-width: 768px) {
  .chat-dialog {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
  }
}
```

---

## 🔍 Component Hierarchy

```
<ChatBot>
  └── Floating Button
      └── AnimatePresence
          └── Icon (MessageCircle or X)
  
  └── AnimatePresence
      └── Chat Dialog (when open)
          ├── Header
          │   ├── Bot Icon
          │   └── Title & Subtitle
          │
          ├── Messages Container
          │   ├── Message (Bot)
          │   ├── Message (User)
          │   ├── Message (Bot)
          │   ├── ...
          │   └── Loading Indicator (optional)
          │
          └── Input Area
              ├── Text Input
              └── Send Button
```

---

## 💡 Usage Example

### User Flow
1. **Landing**: User sees blue button bottom-right
2. **Click**: Dialog opens with greeting
3. **Type**: User asks "What do you do?"
4. **Send**: Click send or press Enter
5. **Wait**: Typing indicator appears (1-2s)
6. **Response**: AI message appears
7. **Continue**: User can ask more questions
8. **Close**: Click X button or floating button

### Example Conversation
```
Bot:  "Hi! I'm ManelTECH's AI assistant. How can I help you today?"
User: "What services do you offer?"
Bot:  "We offer a wide range of services including:
       • Web Development
       • Mobile App Development
       • Cloud Solutions..."
User: "How much does a website cost?"
Bot:  "Project pricing varies based on scope..."
User: "How can I contact you?"
Bot:  "You can reach us at: 📧 contact@maneltech.com..."
```

---

## 🔧 Customization Tips

### Change Position
```tsx
// Bottom-left instead
className="fixed bottom-6 left-6 z-50"

// Top-right
className="fixed top-6 right-6 z-50"
```

### Change Colors
```tsx
// Green theme
bg-green-600 hover:bg-green-700

// Purple theme
bg-purple-600 hover:bg-purple-700
```

### Change Size
```tsx
// Smaller dialog
className="w-80 h-[500px]"

// Larger dialog
className="w-[450px] h-[700px]"
```

### Change Icon
```tsx
import { Bot, Sparkles, Headphones } from 'lucide-react';

// Use different icon
<Sparkles size={24} />
```

---

## ✅ Accessibility Features

- ✅ **Keyboard Navigation**: Enter to send, Tab to navigate
- ✅ **ARIA Labels**: "Open chat", "Send message"
- ✅ **Focus Management**: Auto-focus input when opened
- ✅ **Screen Reader**: Semantic HTML structure
- ✅ **Disabled States**: Visual feedback when loading

---

## 🚀 Next Steps

1. Start your development servers
2. Open the website
3. Look for the blue button bottom-right
4. Click and start chatting!
5. Test different questions to see AI responses

Enjoy your new AI chatbot! 🎉
