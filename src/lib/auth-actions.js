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
      redirect(`/?error=${errorMessage}`)
    } else {
      redirect("/")
    }
  } catch {
    const errorMessage = encodeURIComponent(
      "Invalid email or password. Please check your credentials and try again."
    )
    redirect(`/?error=${errorMessage}`)
  }
}

export async function oauthSignIn(providerId) {
  try {
    await signIn(providerId, {
      redirectTo: "/",
    })
  } catch {
    const errorMessage = encodeURIComponent(
      "Authentication failed. Please try again."
    )
    redirect(`/?error=${errorMessage}`)
  }
}
