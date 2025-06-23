import { PrismaAdapter } from "@auth/prisma-adapter"
import bcryptjs from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { prisma } from "./prisma.ts"

// Conditionally add providers based on available credentials
const providers = []

// GitHub provider
if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  )
}

// Google provider
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  )
}

// Microsoft provider
if (process.env.AUTH_MICROSOFT_ID && process.env.AUTH_MICROSOFT_SECRET) {
  providers.push(
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ID,
      clientSecret: process.env.AUTH_MICROSOFT_SECRET,
    })
  )
}

// Credentials provider for username/password authentication
providers.push(
  Credentials({
    name: "credentials",
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "your-email@example.com",
      },
      password: {
        label: "Password",
        type: "password",
      },
    },
    async authorize(credentials) {
      console.log(
        "🔍 AUTHORIZE: Starting authentication for:",
        credentials?.email
      )

      if (!credentials?.email || !credentials?.password) {
        console.log("❌ AUTHORIZE: Missing credentials")
        return null
      }

      try {
        // Query the database for the user
        console.log(
          "🔍 AUTHORIZE: Querying database for user:",
          credentials.email
        )
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          console.log("❌ AUTHORIZE: User not found in database")
          return null
        }

        if (!user.password) {
          console.log("❌ AUTHORIZE: User exists but has no password")
          return null
        }

        console.log("✅ AUTHORIZE: User found, verifying password...")

        // Verify password with bcrypt
        const isValidPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        )

        if (!isValidPassword) {
          console.log("❌ AUTHORIZE: Password verification failed")
          return null
        }

        console.log("✅ AUTHORIZE: Password verified, returning user object")

        // Return user object (password excluded for security)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      } catch (error) {
        console.error("💥 AUTHORIZE: Database error:", error)
        return null
      }
    },
  })
)

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("🔍 SIGNIN CALLBACK: Called with:", {
        user: user ? { id: user.id, email: user.email } : null,
        account: account
          ? { provider: account.provider, type: account.type }
          : null,
      })

      // For credentials provider, create account record manually
      if (account?.provider === "credentials" && user?.id) {
        console.log("🔍 SIGNIN CALLBACK: Processing credentials provider")
        try {
          // Check if account already exists
          const existingAccount = await prisma.account.findFirst({
            where: {
              userId: user.id,
              provider: "credentials",
            },
          })

          if (existingAccount) {
            console.log("✅ SIGNIN CALLBACK: Account already exists")
          } else {
            console.log("🔍 SIGNIN CALLBACK: Creating new account record")
            await prisma.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "credentials",
                providerAccountId: user.id,
              },
            })
            console.log("✅ SIGNIN CALLBACK: Account created successfully")
          }
        } catch (error) {
          console.error("💥 SIGNIN CALLBACK: Error with account:", error)
          return false
        }
      }

      console.log("✅ SIGNIN CALLBACK: Returning true")
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user, account }) {
      console.log("🔍 JWT CALLBACK: Called with:", {
        token: token ? { sub: token.sub, email: token.email } : null,
        user: user ? { id: user.id, email: user.email } : null,
        account: account ? { provider: account.provider } : null,
      })

      // Store user info in JWT token during sign in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
        console.log("✅ JWT CALLBACK: Added user data to token")
      }

      console.log("✅ JWT CALLBACK: Returning token")
      return token
    },
    async session({ session, token }) {
      console.log("🔍 SESSION CALLBACK: Called with:", {
        session: session ? { user: session.user } : null,
        token: token ? { id: token.id, email: token.email } : null,
      })

      // Get user info from JWT token
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.image
        console.log(
          "✅ SESSION CALLBACK: Added user data from token to session"
        )
      }

      console.log("✅ SESSION CALLBACK: Returning session:", session)
      return session
    },
  },
  session: {
    strategy: "jwt", // Switch to JWT to fix session issues
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})
