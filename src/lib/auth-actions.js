"use server"

import { signIn } from "@/lib/auth"
import { createUser } from "@/lib/user-service"
import { redirect } from "next/navigation"

export async function credentialsSignIn(formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    })
  } catch (error) {
    // Handle NEXT_REDIRECT (expected behavior)
    if (error.message === "NEXT_REDIRECT") {
      throw error
    }

    // Handle actual authentication errors
    const errorMessage = encodeURIComponent(
      "Invalid email or password. Please check your credentials and try again."
    )
    redirect(`/auth/signin?error=${errorMessage}`)
  }
}

/**
 * Handle user registration with credentials
 */
export async function credentialsSignUp(formData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const name = formData.get("name")

  // Validate input
  if (!email || !password) {
    const errorMessage = encodeURIComponent("Email and password are required.")
    redirect(`/auth/signup?error=${errorMessage}`)
  }

  if (password.length < 6) {
    const errorMessage = encodeURIComponent(
      "Password must be at least 6 characters long."
    )
    redirect(`/auth/signup?error=${errorMessage}`)
  }

  try {
    // Create user
    await createUser({
      email,
      password,
      name: name || null,
    })

    // Auto sign in after successful registration
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })
  } catch (error) {
    // Handle NEXT_REDIRECT (expected behavior)
    if (error.message === "NEXT_REDIRECT") {
      throw error
    }

    // Handle actual errors
    if (process.env.NODE_ENV === "development") {
      console.error("Sign up error:", error)
    }

    const errorMessage = encodeURIComponent(
      error.message === "User with this email already exists"
        ? "An account with this email already exists. Please sign in instead."
        : "Failed to create account. Please try again."
    )
    redirect(`/auth/signup?error=${errorMessage}`)
  }
}

// Individual OAuth provider actions
export async function githubSignIn() {
  "use server"
  await signIn("github", { redirectTo: "/" })
}

export async function googleSignIn() {
  "use server"
  await signIn("google", { redirectTo: "/" })
}

export async function facebookSignIn() {
  "use server"
  await signIn("facebook", { redirectTo: "/" })
}

export async function microsoftSignIn() {
  "use server"
  await signIn("microsoft-entra-id", { redirectTo: "/" })
}

export async function twitterSignIn() {
  "use server"
  await signIn("twitter", { redirectTo: "/" })
}
