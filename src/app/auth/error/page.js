import Link from "next/link"

export default async function AuthError({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams?.error

  const getErrorMessage = errorCode => {
    switch (errorCode) {
      case "OAuthSignin":
        return "Error in constructing an authorization URL."
      case "OAuthCallback":
        return "Error in handling the response from an OAuth provider."
      case "OAuthCreateAccount":
        return "Could not create OAuth account in the database."
      case "EmailCreateAccount":
        return "Could not create email account in the database."
      case "Callback":
        return "Error in the OAuth callback handler route."
      case "OAuthAccountNotLinked":
        return "OAuth account is not linked to any existing account."
      case "EmailSignin":
        return "Sending the e-mail with the verification token failed."
      case "CredentialsSignin":
        return "The authorize callback returned null in the Credentials provider."
      case "SessionRequired":
        return "You must be signed in to access this page."
      case "Configuration":
        return "There is a problem with the server configuration."
      default:
        return "An unknown authentication error occurred."
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
        Authentication Error
      </h1>

      <div className="mb-6">
        <p className="text-red-600 mb-4">{getErrorMessage(error)}</p>

        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="text-sm font-semibold">Error Code:</p>
          <p className="text-sm">{error || "Unknown"}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
        >
          Try Again
        </Link>

        <Link
          href="/"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded block text-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
