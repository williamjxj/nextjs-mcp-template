# Next.js Template with Auth.js

A modern Next.js template with Auth.js (NextAuth.js v5), Tailwind CSS, TypeScript support, and comprehensive development tooling.

## Features

- ⚡ **Next.js 15** with App Router and Turbopack
- 🔐 **Auth.js (NextAuth.js v5)** for authentication
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

   Fill in your OAuth provider credentials in `.env.local`:

   - GitHub: Get from [GitHub Developer Settings](https://github.com/settings/developers)
   - Google: Get from [Google Cloud Console](https://console.cloud.google.com/)

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:md` - Run markdownlint on Markdown files
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted
- `npm run type-check` - Run TypeScript type checking

## Authentication Setup

This template uses Auth.js (NextAuth.js v5) with support for:

- GitHub OAuth
- Google OAuth
- Extensible to other providers

### OAuth Provider Setup

#### GitHub

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

#### Google

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 Client IDs
5. Set Authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/auth/[...auth]/route.js    # Auth.js API route
│   │   ├── globals.css                    # Global styles
│   │   ├── layout.js                      # Root layout
│   │   └── page.js                        # Home page with auth
│   └── auth.js                            # Auth.js configuration
├── middleware.js                          # Auth.js middleware
├── .editorconfig                          # Editor configuration
├── .prettierrc                            # Prettier configuration
├── eslint.config.mjs                      # ESLint configuration
├── tsconfig.json                          # TypeScript configuration
└── tailwind.config.js                     # Tailwind CSS configuration
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
