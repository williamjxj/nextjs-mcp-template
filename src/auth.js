import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import Twitter from "next-auth/providers/twitter"

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

// Facebook provider
if (process.env.AUTH_FACEBOOK_ID && process.env.AUTH_FACEBOOK_SECRET) {
  providers.push(
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    })
  )
}

// Twitter (X) provider
if (process.env.AUTH_TWITTER_ID && process.env.AUTH_TWITTER_SECRET) {
  providers.push(
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
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
      // Add your own logic here to find the user from credentials
      // This is just an example - replace with your actual authentication logic
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      // Example: Check against environment variables (for demo purposes)
      // In production, you'd check against a database
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

      // You can also make API calls to your backend here
      // const user = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: credentials.email,
      //     password: credentials.password,
      //   }),
      // }).then(res => res.json())

      // Return null if user data could not be retrieved
      return null
    },
  })
)

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    async signIn() {
      // You can customize the sign-in behavior here
      return true
    },
    async session({ session }) {
      // Send properties to the client
      return session
    },
    async jwt({ token }) {
      // Persist the OAuth access_token to the token right after signin
      return token
    },
  },
  events: {
    async signIn() {
      // Custom sign-in event handler
    },
    async signOut() {
      // Custom sign-out event handler
    },
  },
  session: {
    strategy: "jwt",
  },
  logger: {
    error(code, metadata) {
      // Suppress CredentialsSignin errors from console
      if (
        code === "SIGNIN_EMAIL_ERROR" ||
        code === "CREDENTIALS_SIGNIN_ERROR"
      ) {
        return
      }
      console.error(code, metadata)
    },
    warn(code) {
      // Suppress credential warnings
      if (
        code === "SIGNIN_EMAIL_ERROR" ||
        code === "CREDENTIALS_SIGNIN_ERROR"
      ) {
        return
      }
      console.warn(code)
    },
    debug: () => {}, // Disable debug logs
  },
})
