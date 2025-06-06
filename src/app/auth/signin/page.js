import { redirect } from "next/navigation"

export default function SignIn() {
  // Redirect to home page since authentication is now handled there
  redirect("/")
}
