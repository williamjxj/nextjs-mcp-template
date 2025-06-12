import SignUpForm from "@/components/SignUpForm"
import { auth } from "@/lib/auth"
import {
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
    <main className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignUpForm
        oauthActions={{
          github: githubSignIn,
          google: googleSignIn,
          facebook: facebookSignIn,
          "microsoft-entra-id": microsoftSignIn,
          twitter: twitterSignIn,
        }}
        error={error}
      />
    </main>
  )
}
