# 🚀 Quick Start - AI Chatbot

## Start the Application

### 1. Start Backend
```bash
cd backend
npm run start:dev
```
Wait for: `Application is running on: http://localhost:3000`

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
Wait for: `Local: http://localhost:5173`

### 3. Open Browser
Navigate to: `http://localhost:5173`

---

## 🧪 Test the Chatbot

### Step 1: Find the Button
Look at the **bottom-right corner** of the page.
You should see a **blue circular button** with a message icon (💬).

### Step 2: Click to Open
Click the button. A chat dialog should smoothly appear.

### Step 3: Try These Questions

#### Greeting
```
Type: "Hello"
Expected: Welcome message with service overview
```

#### Services
```
Type: "What services do you offer?"
Expected: Bulleted list of services
```

#### Web Development
```
Type: "Tell me about web development"
Expected: Details about web development services
```

#### Mobile Apps
```
Type: "Do you build mobile apps?"
Expected: Information about mobile app development
```

#### Portfolio
```
Type: "Show me your projects"
Expected: Invitation to view portfolio page
```

#### Pricing
```
Type: "How much does a website cost?"
Expected: Pricing information and consultation offer
```

#### Contact
```
Type: "How can I contact you?"
Expected: Email, phone, and contact page link
```

#### Team
```
Type: "Who are you?"
Expected: Information about the team
```

#### Technologies
```
Type: "What technologies do you use?"
Expected: List of tech stack
```

#### Timeline
```
Type: "How long does it take?"
Expected: Project timeline information
```

#### Goodbye
```
Type: "Thanks, bye!"
Expected: Farewell message
```

---

## ✅ What to Check

### Visual Elements
- [ ] Button appears at bottom-right
- [ ] Button is blue and circular
- [ ] Button has hover effect (slightly larger)
- [ ] Dialog opens smoothly when clicked
- [ ] Dialog is white with blue header
- [ ] Messages are properly aligned (bot left, user right)
- [ ] Timestamps show correctly
- [ ] Input field and send button work
- [ ] Close button (X) works

### Functionality
- [ ] Can type in input field
- [ ] Pressing Enter sends message
- [ ] Send button works
- [ ] Messages appear instantly
- [ ] Bot responds within 1-2 seconds
- [ ] Typing indicator shows while waiting
- [ ] Auto-scrolls to latest message
- [ ] Can send multiple messages
- [ ] Can close and reopen (history preserved)

### Animations
- [ ] Button icon rotates (💬 ↔ ❌)
- [ ] Dialog fades in/out smoothly
- [ ] Messages fade in from bottom
- [ ] Typing dots bounce
- [ ] Button scales on hover

---

## 🐛 Common Issues & Fixes

### Issue: Button doesn't appear
**Fix:**
1. Check browser console for errors
2. Verify `ChatBot` is imported in `App.tsx`
3. Clear browser cache and reload

### Issue: "Failed to get response"
**Fix:**
1. Ensure backend is running (`npm run start:dev`)
2. Check backend terminal for errors
3. Verify `.env` has correct `VITE_API_URL`
4. Check Network tab in browser DevTools

### Issue: CORS error
**Fix:**
1. Check `main.ts` has CORS enabled:
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### Issue: Styling broken
**Fix:**
1. Ensure Tailwind CSS is configured
2. Check `lucide-react` is installed:
```bash
npm install lucide-react
```
3. Verify `framer-motion` is installed:
```bash
npm install framer-motion
```

### Issue: TypeScript errors
**Fix:**
1. Run type check:
```bash
npm run build
```
2. Check all imports are correct
3. Restart VS Code TypeScript server

---

## 📊 Performance Check

### Response Time
- **Target**: < 2 seconds per response
- **Monitor**: Check Network tab for `/api/chatbot` requests

### Animation Smoothness
- **Target**: 60 FPS
- **Monitor**: Chrome DevTools > Performance tab

### Memory Usage
- **Target**: < 50MB for chatbot component
- **Monitor**: Chrome DevTools > Memory tab

---

## 🎯 Next Steps After Testing

### 1. Customize Company Info
Edit `backend/src/chatbot/chatbot.service.ts`:
```typescript
private readonly companyInfo = {
  name: 'ManelTECH',
  description: 'Your actual description',
  services: ['Your', 'Actual', 'Services'],
  contact: {
    email: 'your-real@email.com',
    phone: '+1 (555) YOUR-NUMBER',
  },
};
```

### 2. Add More Response Patterns
Add conditions in `getResponse()` method for:
- Specific service details
- Project examples
- Client testimonials
- Technical questions
- etc.

### 3. Upgrade to Real AI (Optional)
Install OpenAI SDK:
```bash
cd backend
npm install openai
```

Update `.env`:
```env
OPENAI_API_KEY=your_key_here
```

Replace keyword system with GPT in `chatbot.service.ts`.

### 4. Deploy to Production
Update environment variables:
```env
# Frontend .env.production
VITE_API_URL=https://your-api-domain.com

# Backend .env
NODE_ENV=production
```

---

## 📱 Mobile Testing

### 1. Test on Mobile Device
Get your local IP:
```bash
ipconfig  # Windows
ifconfig  # Mac/Linux
```

Access from phone:
```
http://YOUR_LOCAL_IP:5173
```

### 2. Check Mobile Responsiveness
- Button should be visible
- Dialog should fit screen
- Input should work with mobile keyboard
- Touch interactions should work smoothly

---

## 🎉 Success Checklist

Before considering it "done":
- [ ] All test questions work correctly
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Typing works properly
- [ ] Can send and receive messages
- [ ] Company info is accurate
- [ ] Styling matches brand
- [ ] Performance is good
- [ ] Tested on multiple browsers

---

## 🆘 Need Help?

### Check Documentation
- `CHATBOT_README.md` - Detailed technical docs
- `CHATBOT_VISUAL_GUIDE.md` - Visual design guide

### Debug Mode
Add console logs in `ChatBot.tsx`:
```typescript
console.log('Message sent:', inputValue);
console.log('Response received:', data);
```

### Backend Logs
Check backend terminal for incoming requests:
```
[Nest] INFO [ChatbotController] Received message: "Hello"
```

---

**Ready to chat? Start your servers and test it out! 🚀**
