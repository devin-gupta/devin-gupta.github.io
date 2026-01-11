# LLM-Enabled Chatbox Setup Guide

## Overview
Your personal website now has an AI-powered chatbox that can answer questions about your background, work, research, and interests using the entire website as context.

## Features
- 🤖 **AI Assistant**: Powered by OpenAI GPT-3.5-turbo
- 🎯 **Website Context**: Has access to all your website content
- 💬 **Modern UI**: Clean, responsive chat interface
- 📱 **Mobile Friendly**: Works on all device sizes
- ⚡ **Real-time**: Instant responses with typing indicators
- 🔄 **Conversation Memory**: Maintains context throughout the chat

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the API key (starts with `sk-`)

### 2. Configure Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### 3. Install Dependencies
Dependencies are already installed, but if you need to reinstall:
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Test the Chatbox
1. Open your website in the browser
2. Look for the blue chat button in the bottom-right corner
3. Click it to open the chatbox
4. Try asking questions like:
   - "Tell me about Devin's research interests"
   - "What does Devin study at Stanford?"
   - "What are Devin's hobbies?"

## How It Works

### Context Extraction
The system extracts content from all your website pages:
- Home page content
- Work experience
- Research interests
- Education background
- Course information
- Journalism interests

### AI Integration
- Uses OpenAI's GPT-3.5-turbo model
- Sends website context with each message
- Maintains conversation history
- Provides relevant, contextual responses

### UI Components
- **ChatToggle**: Floating action button to open chat
- **ChatBox**: Main chat interface with messages and input
- **Context Extraction**: Utility to gather website content

## Customization

### Adding More Context
Edit `/src/lib/contextExtractor.ts` to add more website content:

```typescript
pages: {
  // Add new pages here
  newPage: {
    title: "New Page Title",
    url: "/new-page",
    content: "Page content here..."
  }
}
```

### Styling
The chatbox uses Tailwind CSS classes. You can customize:
- Colors in `ChatBox.tsx` and `ChatToggle.tsx`
- Sizes and spacing
- Animation effects

### AI Behavior
Modify the system prompt in `buildContextPrompt()` function to change how the AI responds.

## Deployment

### Environment Variables
Make sure to set `OPENAI_API_KEY` in your production environment:
- Vercel: Add in Project Settings > Environment Variables
- Netlify: Add in Site Settings > Environment Variables
- Other platforms: Follow their environment variable setup

### Build
The project builds successfully with:
```bash
npm run build
```

## Cost Considerations
- Uses GPT-3.5-turbo (cost-effective)
- Limited to 500 tokens per response
- Context is included with each request
- Monitor usage in OpenAI dashboard

## Troubleshooting

### Chat Not Working
1. Check if `OPENAI_API_KEY` is set correctly
2. Verify API key has sufficient credits
3. Check browser console for errors
4. Ensure API route is accessible

### Build Errors
- Make sure all dependencies are installed
- Check TypeScript errors
- Verify environment variables

### API Errors
- Check OpenAI API status
- Verify API key permissions
- Monitor rate limits

## Security Notes
- API key is server-side only
- No sensitive data in client-side code
- Rate limiting handled by OpenAI
- Input validation on API route

## Next Steps
Consider adding:
- Chat history persistence
- More sophisticated context extraction
- Different AI models
- Analytics on chat usage
- Custom training data

## Support
If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables
3. Test API key independently
4. Review OpenAI documentation