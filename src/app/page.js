import { auth, signOut } from "@/lib/auth"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  // Redirect to sign-in page if not authenticated
  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Hello, {session.user.name || session.user.email}!
          </p>
          {session.user.image && (
            <Image
              src={session.user.image || "/placeholder.svg"}
              alt="Profile"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-blue-200"
            />
          )}
          <p className="text-gray-500">You are successfully authenticated</p>
        </div>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Sign Out
          </button>
        </form>
      </div>
    </main>
  )
}
