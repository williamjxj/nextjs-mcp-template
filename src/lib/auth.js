import { PrismaAdapter } from "@auth/prisma-adapter"
import bcryptjs from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { prisma } from "./prisma"

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
        // Check for demo credentials first
        if (
          credentials.email === process.env.DEMO_USER_EMAIL &&
          credentials.password === process.env.DEMO_USER_PASSWORD
        ) {
          return {
            id: "demo-user",
            email: credentials.email,
            name: "Demo User",
          }
        }

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
        // Log authentication error for debugging
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
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    async signIn({ user, account }) {
      // Allow OAuth providers and verified credentials
      if (account?.provider !== "credentials") {
        return true
      }
      // For credentials, user is already verified in authorize function
      return !!user
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, user }) {
      // Include user id in session
      if (user) {
        session.user.id = user.id
      }
      return session
    },
  },
  session: {
    strategy: "database",
  },
})
