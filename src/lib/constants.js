import { Building2, Chrome, Facebook, Github, Twitter } from "lucide-react"

// OAuth providers configuration shared between components
// Order: GitHub, Google, Facebook, Microsoft, Twitter
export const oauthProviders = [
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    bgColor: "bg-gray-900 hover:bg-gray-800",
    textColor: "text-white",
  },
  {
    id: "google",
    name: "Google",
    icon: Chrome,
    bgColor: "bg-white hover:bg-gray-50",
    textColor: "text-gray-700",
    border: "border border-gray-200",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    bgColor: "bg-blue-600 hover:bg-blue-700",
    textColor: "text-white",
  },
  {
    id: "microsoft-entra-id",
    name: "Microsoft",
    icon: Building2,
    bgColor: "bg-blue-500 hover:bg-blue-600",
    textColor: "text-white",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    bgColor: "bg-black hover:bg-gray-800",
    textColor: "text-white",
  },
]
