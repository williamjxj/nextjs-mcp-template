import SignInForm from "@/components/SignInForm"
import { auth } from "@/lib/auth"
import {
  credentialsSignIn,
  facebookSignIn,
  githubSignIn,
  googleSignIn,
  microsoftSignIn,
  twitterSignIn,
} from "@/lib/auth-actions"
import { redirect } from "next/navigation"

export default async function SignInPage({ searchParams }) {
  // If already signed in, redirect to home
  const session = await auth()
  if (session?.user) {
    redirect("/")
  }

  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams?.error
    ? decodeURIComponent(resolvedSearchParams.error)
    : null

  return (
    <main className="min-h-screen flex">
      {/* Left Side - Enhanced Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 w-full">
          <div className="max-w-md text-center">
            {/* Logo/Icon */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Welcome Back!
            </h1>
            <p className="text-lg mb-10 opacity-90 leading-relaxed">
              Sign in to access your account and continue your journey with us
            </p>

            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-base font-medium">
                  Secure & encrypted authentication
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-base font-medium">
                  Multiple sign-in options
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-base font-medium">
                  Fast & reliable access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration for mobile */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-700/5"></div>

        <div className="relative z-10 w-full">
          <SignInForm
            credentialsSignIn={credentialsSignIn}
            oauthActions={{
              github: githubSignIn,
              google: googleSignIn,
              facebook: facebookSignIn,
              "microsoft-entra-id": microsoftSignIn,
              twitter: twitterSignIn,
            }}
            error={error}
          />
        </div>
      </div>
    </main>
  )
}
