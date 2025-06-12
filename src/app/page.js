import AuthForm from "@/components/AuthForm"
import { auth, signOut } from "@/lib/auth"
import { credentialsSignIn, oauthSignIn } from "@/lib/auth-actions"
import Image from "next/image"

export default async function Home({ searchParams }) {
  const session = await auth()
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams?.error
    ? decodeURIComponent(resolvedSearchParams.error)
    : null

  if (session?.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">
            Welcome to Next.js with Auth.js!
          </h1>
          <div className="mb-8">
            <p className="text-lg mb-4">
              Hello, {session.user.name || session.user.email}!
            </p>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
            )}
            <p className="text-gray-600">You are successfully authenticated</p>
          </div>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Sign Out
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm
        credentialsSignIn={credentialsSignIn}
        oauthSignIn={oauthSignIn}
        error={error}
      />
    </main>
  )
}
