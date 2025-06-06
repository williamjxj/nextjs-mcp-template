# Authentication Implementation

This Next.js application now includes a comprehensive authentication system using Auth.js with the following features:

## Providers Supported

- 🐙 GitHub
- 🌎 Google
- 📘 Facebook
- 🏢 Microsoft (Entra ID)

## Features Implemented

### 1. Custom Sign-in Page

- Custom designed sign-in page at `/auth/signin`
- Dynamic provider rendering with icons and branding
- Responsive design with proper styling

### 2. Enhanced Main Page

- Provider map configuration following Auth.js best practices
- Dynamic button generation for all providers
- Optimized Next.js Image component for user avatars
- Improved UI with modern styling and transitions

### 3. Auth.js Configuration

- JWT session strategy
- Custom callbacks for enhanced functionality
- Proper error handling and redirect management
- Image optimization for external provider domains

### 4. Security & Performance

- External image domains properly configured in `next.config.mjs`
- Proper TypeScript/ESLint compliance
- Server-side authentication with middleware protection

## Environment Variables Required

Make sure to set these in your `.env.local` file:

```bash
# Auth.js
AUTH_SECRET=your-secret-here

# GitHub
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret

# Google
AUTH_GOOGLE_ID=your-google-id
AUTH_GOOGLE_SECRET=your-google-secret

# Facebook
AUTH_FACEBOOK_ID=your-facebook-id
AUTH_FACEBOOK_SECRET=your-facebook-secret

# Microsoft
AUTH_MICROSOFT_ID=your-microsoft-id
AUTH_MICROSOFT_SECRET=your-microsoft-secret
```

## Usage

1. Run `npm run dev` to start the development server
2. Navigate to `http://localhost:3000`
3. Click any provider button to authenticate
4. User will be redirected to the custom sign-in page if not authenticated
5. Successfully authenticated users see their profile information

The implementation follows Auth.js v5 best practices and provides a solid foundation for authentication in any Next.js application.
