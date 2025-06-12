import { Building2, Chrome, Facebook, Github, Twitter } from "lucide-react"

// OAuth providers configuration shared between components
export const oauthProviders = [
  {
    id: "github",
    name: "GitHub",
    icon: Github,
  },
  {
    id: "google",
    name: "Google",
    icon: Chrome,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
  },
  {
    id: "microsoft-entra-id",
    name: "Microsoft",
    icon: Building2,
  },
  {
    id: "twitter",
    name: "Twitter (X)",
    icon: Twitter,
  },
]
