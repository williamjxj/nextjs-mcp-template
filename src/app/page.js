import { auth, signIn, signOut } from "@/auth"
import { providerMap } from "@/lib/providers"
import Image from "next/image"

export default async function Home() {
  const session = await auth()

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Next.js with Auth.js!
        </h1>
        <p className="text-lg mb-8">Please sign in to continue</p>
        <div className="space-y-4 max-w-sm mx-auto">
          {providerMap.map(provider => (
            <form
              key={provider.id}
              action={async () => {
                "use server"
                await signIn(provider.id)
              }}
            >
              <button
                type="submit"
                className={`w-full ${provider.color} text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
              >
                <span className="text-lg">{provider.icon}</span>
                <span>Sign in with {provider.name}</span>
              </button>
            </form>
          ))}
        </div>
      </div>
    </main>
  )
}
