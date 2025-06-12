"use server"

import { signIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function credentialsSignIn(formData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      const errorMessage = encodeURIComponent(
        "Invalid email or password. Please check your credentials and try again."
      )
      redirect(`/auth/signin?error=${errorMessage}`)
    } else {
      redirect("/")
    }
  } catch {
    const errorMessage = encodeURIComponent(
      "Invalid email or password. Please check your credentials and try again."
    )
    redirect(`/auth/signin?error=${errorMessage}`)
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
