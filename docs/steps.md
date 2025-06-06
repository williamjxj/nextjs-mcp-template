## template: mcp, payment, auth, cloud

### 1. init

```bash
$ npx create-next-app@latest --tailwind --eslint --empty nextjs-mcp-template
```

### 2. update versions, add format and syntax checker

```text
1. update the app with latest stable dependenies, add auth.js
2. add editorconfig, prettier, eslint, markdownlint stuff
use context7
```

- `NEXTAUTH_SECRET=$(openssl rand -base64 32)`

### 3. add mcp, payment, auth, cloud

**Auth Enhancements Completed ✅**

- ✅ Added Credentials provider for username/email and password authentication
- ✅ Integrated lucide-react icons for modern UI (Github, Chrome, Facebook, Building2, Twitter, Mail, Lock)
- ✅ Added Twitter (X) OAuth provider support
- ✅ Enhanced signin page with credentials form and demo account
- ✅ Updated Auth.js configuration with all providers
- ✅ Fixed Next.js 15 compatibility (awaited searchParams)

**Demo Credentials:**

- Email: demo@example.com
- Password: demo123

**Documentation:** See `auth-credentials-setup.md` for detailed setup instructions.

### 4. supbase adapter

### 5. vercel deployment

### 6. add cloud functions

### 7. docker
