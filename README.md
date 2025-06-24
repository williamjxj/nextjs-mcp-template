# Next.js Template with Complete Authentication

A modern Next.js template with complete authentication system including email/password and OAuth providers, PostgreSQL database, and comprehensive development tooling.

## ✨ Features

- ⚡ **Next.js 15** with App Router and Turbopack
- 🔐 **Complete Authentication System**:
  - Email/Password authentication with bcrypt
  - OAuth providers (GitHub, Google, Microsoft)
  - JWT sessions with NextAuth.js v5
  - Account linking and user management
- 🗄️ **Database Integration**:
  - PostgreSQL with Prisma ORM
  - User, Account, and Session models
  - Automatic migrations and type safety
- 🎨 **Tailwind CSS 4** for styling
- 📝 **TypeScript** support with proper configuration
- 🔍 **ESLint** with Next.js and Prettier integration
- 💅 **Prettier** for code formatting
- ⚙️ **EditorConfig** for consistent coding styles
- 🔧 **Development tools** and scripts

## Quick Start

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your configuration in `.env.local`:

   - Database connection string
   - AUTH_SECRET (generate with `openssl rand -base64 32`)
   - OAuth provider credentials (optional)

3. **Set up the database:**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Apply database schema
   npx prisma db push
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:md` - Run markdownlint on Markdown files
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted
- `npm run type-check` - Run TypeScript type checking

## 🔐 Authentication System

This template includes a complete authentication system with:

### **Email/Password Authentication**

- Secure user registration and login
- Password hashing with bcrypt
- Input validation and error handling
- Automatic account linking

### **OAuth Providers**

- GitHub OAuth
- Google OAuth
- Microsoft OAuth
- Extensible to other providers

### **Database Integration**

- PostgreSQL database with Prisma ORM
- User, Account, and Session models
- Automatic migrations and type safety

### **Session Management**

- JWT-based sessions for optimal performance
- Secure token signing and encryption
- Automatic session refresh

For detailed setup instructions, see [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md)

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.js  # NextAuth.js API route
│   │   ├── auth/
│   │   │   ├── signin/page.js               # Sign in page
│   │   │   ├── signup/page.js               # Sign up page
│   │   │   └── error/page.js                # Auth error page
│   │   ├── globals.css                      # Global styles
│   │   ├── layout.js                        # Root layout
│   │   └── page.js                          # Protected home page
│   ├── components/
│   │   ├── SignInForm.js                    # Sign in form component
│   │   └── SignUpForm.js                    # Sign up form component
│   └── lib/
│       ├── auth.js                          # NextAuth.js configuration
│       ├── auth-actions.js                  # Authentication server actions
│       ├── user-service.js                  # User management functions
│       └── prisma.ts                        # Prisma client configuration
├── prisma/
│   └── schema.prisma                        # Database schema
├── docs/
│   ├── AUTHENTICATION.md                    # Authentication documentation
│   └── .github/                             # GitHub-specific docs
├── middleware.js                            # NextAuth.js middleware
└── [config files...]                       # Various configuration files
```

## Development Tools

### Code Formatting

This project uses Prettier for consistent code formatting:

```bash
# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

### Linting

ESLint is configured with Next.js and Prettier rules:

```bash
npm run lint
```

Markdownlint for Markdown files:

```bash
npm run lint:md
```

### Type Checking

TypeScript type checking without emitting files:

```bash
npm run type-check
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Auth.js Documentation](https://authjs.dev) - learn about Auth.js authentication
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS
