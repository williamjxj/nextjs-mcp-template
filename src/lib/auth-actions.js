"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function credentialsSignIn(formData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      // Authentication failed
      const errorMessage = encodeURIComponent(
        "Invalid email or password. Please check your credentials and try again."
      )
      redirect(`/?error=${errorMessage}`)
    } else {
      // Authentication successful
      redirect("/")
    }
  } catch {
    // Handle any other errors
    const errorMessage = encodeURIComponent(
      "Invalid email or password. Please check your credentials and try again."
    )
    redirect(`/?error=${errorMessage}`)
  }
}

export async function oauthSignIn(providerId) {
  try {
    const result = await signIn(providerId, {
      redirect: false,
    })

    if (result?.error) {
      const errorMessage = encodeURIComponent(
        "Authentication failed. Please try again."
      )
      redirect(`/?error=${errorMessage}`)
    } else {
      redirect("/")
    }
  } catch {
    const errorMessage = encodeURIComponent(
      "Authentication failed. Please try again."
    )
    redirect(`/?error=${errorMessage}`)
  }
}
