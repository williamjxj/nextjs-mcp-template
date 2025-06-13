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
      {/* Left Side - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl mb-8 opacity-90">
              Connect with creators and discover exclusive content
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Premium exclusive content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Direct creator interaction</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Secure & private platform</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
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
    </main>
  )
}
