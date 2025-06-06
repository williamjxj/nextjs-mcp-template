import { auth, signIn, signOut } from "@/auth"

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
              <img
                src={session.user.image}
                alt="Profile"
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
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
        <form
          action={async () => {
            "use server"
            await signIn("github")
          }}
        >
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Sign in with GitHub
          </button>
        </form>
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </main>
  )
}
