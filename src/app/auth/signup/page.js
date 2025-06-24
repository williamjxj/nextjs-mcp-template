import SignUpForm from "@/components/SignUpForm"
import { auth } from "@/lib/auth"
import {
  credentialsSignUp,
  facebookSignIn,
  githubSignIn,
  googleSignIn,
  microsoftSignIn,
  twitterSignIn,
} from "@/lib/auth-actions"
import { redirect } from "next/navigation"

export default async function SignUpPage({ searchParams }) {
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-16 right-16 w-36 h-36 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-48 left-24 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-24 right-32 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-48 left-16 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Join Our Community!
            </h1>
            <p className="text-xl mb-10 opacity-90 leading-relaxed">
              Create your account and become part of something amazing
            </p>

            <div className="space-y-6 text-left">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-lg font-medium">
                  Quick & easy registration
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-lg font-medium">
                  Secure account protection
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-lg font-medium">
                  Instant access to features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background decoration for mobile */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-rose-600/5"></div>

        <div className="relative z-10 w-full">
          <SignUpForm
            credentialsSignUp={credentialsSignUp}
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
