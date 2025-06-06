import { signIn } from "@/auth"

// Provider configuration with styling and branding
const providers = [
  {
    id: "github",
    name: "GitHub",
    color: "bg-black hover:bg-gray-800",
    icon: "🐙",
  },
  {
    id: "google",
    name: "Google",
    color: "bg-blue-500 hover:bg-blue-700",
    icon: "🌎",
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "bg-blue-600 hover:bg-blue-800",
    icon: "📘",
  },
  {
    id: "microsoft-entra-id",
    name: "Microsoft",
    color: "bg-blue-700 hover:bg-blue-900",
    icon: "🏢",
  },
]

export default async function SignIn({ searchParams }) {
  const { callbackUrl } = searchParams || {}

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your preferred authentication method
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {providers.map(provider => (
            <form
              key={provider.id}
              action={async () => {
                "use server"
                await signIn(provider.id, {
                  redirectTo: callbackUrl || "/",
                })
              }}
              className="w-full"
            >
              <button
                type="submit"
                className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${provider.color} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <span className="mr-3 text-lg">{provider.icon}</span>
                Sign in with {provider.name}
              </button>
            </form>
          ))}
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Powered by Auth.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
