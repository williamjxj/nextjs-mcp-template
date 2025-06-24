# 🔐 Authentication Setup

This Next.js application includes a complete authentication system with email/password and OAuth providers.

## ✅ Features

- **Email/Password Authentication**: Secure signup and signin with bcrypt password hashing
- **OAuth Providers**: GitHub, Google, and Microsoft sign-in
- **Database Integration**: User data stored in PostgreSQL with Prisma ORM
- **JWT Sessions**: Secure session management with NextAuth.js v5
- **Account Linking**: Automatic account creation for all authentication methods

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file with the following variables:

```bash
# Authentication
AUTH_SECRET="your-super-secret-key-at-least-32-characters-long"
AUTH_TRUST_HOST=true
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

# OAuth Providers (optional)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_MICROSOFT_ID=your-microsoft-client-id
AUTH_MICROSOFT_SECRET=your-microsoft-client-secret
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Apply database schema
npx prisma db push

# (Optional) View database
npx prisma studio
```

### 3. Start Development Server

```bash
npm run dev
```

## 📋 How It Works

### Email/Password Flow

1. **Sign Up**: User creates account → Password hashed with bcrypt → User stored in database
2. **Sign In**: Credentials verified → JWT token created → User authenticated
3. **Account Linking**: Automatic account record creation for database consistency

### OAuth Flow

1. **Provider Sign In**: User redirects to OAuth provider → Returns with user data
2. **Account Creation**: User and account records created automatically
3. **Session Management**: JWT token created with user information

## 🔧 Key Components

- **`src/lib/auth.js`**: NextAuth.js configuration with providers and callbacks
- **`src/lib/auth-actions.js`**: Server actions for sign in/up operations
- **`src/lib/user-service.js`**: User management functions (create, verify, update)
- **`src/components/SignInForm.js`**: Sign in form component
- **`src/components/SignUpForm.js`**: Sign up form component

## 🛡️ Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Security**: Signed and encrypted tokens
- **Input Validation**: Email format and password length requirements
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **Session Management**: Secure token-based authentication

## 🎯 Authentication Pages

- **Sign In**: `/auth/signin`
- **Sign Up**: `/auth/signup`
- **Error**: `/auth/error`

## 📊 Database Schema

The authentication system uses these Prisma models:

- **User**: Stores user information and hashed passwords
- **Account**: Links users to OAuth providers
- **Session**: Manages user sessions (used by OAuth)
- **VerificationToken**: For email verification (future enhancement)

## 🔄 Session Strategy

This application uses **JWT sessions** for optimal performance and reliability:

- Credentials authentication uses JWT tokens
- OAuth providers also use JWT for consistency
- Database records maintained for user management
- No server-side session storage required

## 🚀 Production Deployment

For production deployment:

1. **Use a cloud database** (Supabase, Railway, Neon, etc.)
2. **Set secure AUTH_SECRET** (generate with `openssl rand -base64 32`)
3. **Configure OAuth redirects** for your domain
4. **Set proper NEXTAUTH_URL** for your production URL
5. **Enable HTTPS** for secure cookie transmission
