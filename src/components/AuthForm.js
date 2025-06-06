"use client"

import {
  Building2,
  Chrome,
  Facebook,
  Github,
  Lock,
  Mail,
  Twitter,
  UserPlus,
} from "lucide-react"
import { useState } from "react"

// Enhanced provider configuration with styling and branding using Lucide icons
const enhancedProviders = [
  {
    id: "github",
    name: "GitHub",
    color: "bg-black hover:bg-gray-800",
    icon: Github,
  },
  {
    id: "google",
    name: "Google",
    color: "bg-blue-500 hover:bg-blue-700",
    icon: Chrome,
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "bg-blue-600 hover:bg-blue-800",
    icon: Facebook,
  },
  {
    id: "microsoft-entra-id",
    name: "Microsoft",
    color: "bg-blue-700 hover:bg-blue-900",
    icon: Building2,
  },
  {
    id: "twitter",
    name: "Twitter (X)",
    color: "bg-black hover:bg-gray-800",
    icon: Twitter,
  },
]

export default function AuthForm({ credentialsSignIn, oauthSignIn, error }) {
  const [activeTab, setActiveTab] = useState("signin")
  const [showTooltip, setShowTooltip] = useState(false)

  const handleSignUp = async () => {
    // For now, just show an alert. In a real app, you'd implement user registration
    alert(
      "Sign up functionality would be implemented here. For now, try the demo credentials!"
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Welcome to Next.js with Auth.js!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your account or create a new one
        </p>
      </div>

      {/* Credentials Form - Now at the top */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-visible">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg border transition-colors ${
              activeTab === "signin"
                ? "text-blue-600 bg-blue-50 border-blue-200"
                : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg border transition-colors ${
              activeTab === "signup"
                ? "text-blue-600 bg-blue-50 border-blue-200"
                : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {activeTab === "signin" ? (
          <form action={credentialsSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-lg border-0 py-3 pl-12 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-lg border-0 py-3 pl-12 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="relative">
              <button
                type="submit"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Email
              </button>
              {/* State-based Tooltip */}
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-3 py-2 bg-black text-white text-xs rounded-md z-[9999] shadow-2xl">
                  <div className="text-center whitespace-nowrap">
                    <div className="text-yellow-300">💡 Demo Credentials</div>
                    <div>Email: demo@example.com</div>
                    <div>Password: demo123</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                </div>
              )}
            </div>
          </form>
        ) : (
          <form action={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-lg border-0 py-3 pl-12 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="signup-password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full rounded-lg border-0 py-3 pl-12 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full rounded-lg border-0 py-3 pl-12 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </button>
          </form>
        )}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* OAuth Providers - Grouped with small icons */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <p className="text-xs text-gray-500 text-center mb-3 font-medium">
          SOCIAL ACCOUNTS
        </p>
        <div className="grid grid-cols-2 gap-3">
          {enhancedProviders.map(provider => {
            const IconComponent = provider.icon
            return (
              <form key={provider.id} action={() => oauthSignIn(provider.id)}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium"
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {provider.name}
                </button>
              </form>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-gray-500">Powered by Auth.js</p>
      </div>
    </div>
  )
}
