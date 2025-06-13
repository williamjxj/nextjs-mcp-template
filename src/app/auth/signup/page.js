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
      {/* Left Side - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-6">Join the Community!</h1>
            <p className="text-xl mb-8 opacity-90">
              Create your account and start connecting with amazing creators
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Access exclusive content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Connect with creators</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Join a global community</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
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
    </main>
  )
}
