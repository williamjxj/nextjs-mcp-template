// Helper function to get available providers based on environment variables
export function getAvailableProviders() {
  const providers = []

  // GitHub provider
  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    providers.push({
      id: "github",
      name: "GitHub",
      color: "bg-black hover:bg-gray-800",
      icon: "🐙",
    })
  }

  // Google provider
  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push({
      id: "google",
      name: "Google",
      color: "bg-blue-500 hover:bg-blue-700",
      icon: "🌎",
    })
  }

  // Microsoft provider
  if (process.env.AUTH_MICROSOFT_ID && process.env.AUTH_MICROSOFT_SECRET) {
    providers.push({
      id: "microsoft-entra-id",
      name: "Microsoft",
      color: "bg-blue-700 hover:bg-blue-900",
      icon: "🏢",
    })
  }

  // Facebook provider
  if (process.env.AUTH_FACEBOOK_ID && process.env.AUTH_FACEBOOK_SECRET) {
    providers.push({
      id: "facebook",
      name: "Facebook",
      color: "bg-blue-600 hover:bg-blue-800",
      icon: "📘",
    })
  }

  return providers
}

// Get provider configuration for UI components
export const providerMap = getAvailableProviders()
