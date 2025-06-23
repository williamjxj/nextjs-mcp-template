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
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      try {
        // Query the database for the user
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.password) {
          return null
        }

        // Verify password with bcrypt
        const isValidPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        )

        if (!isValidPassword) {
          return null
        }

        // Return user object (password excluded for security)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Authentication error:", error)
        }
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
      // For credentials provider, create account record manually
      if (account?.provider === "credentials" && user?.id) {
        try {
          // Check if account already exists
          const existingAccount = await prisma.account.findFirst({
            where: {
              userId: user.id,
              provider: "credentials",
            },
          })

          // Create account record if it doesn't exist
          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "credentials",
                providerAccountId: user.id,
              },
            })
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error creating credentials account:", error)
          }
          return false
        }
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user }) {
      // Store user info in JWT token during sign in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      // Get user info from JWT token
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.image
      }
      return session
    },
  },
  session: {
    strategy: "jwt", // Switch to JWT to fix session issues
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})
