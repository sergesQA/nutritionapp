"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { LogOut } from "lucide-react"

export function CognitoLoginButton() {
  const { isAuthenticated, user, logout } = useAuth()

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => (window.location.href = "/api/auth/login")}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Login with Cognito
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-foreground">{user?.email}</span>
      <Button onClick={logout} variant="outline" size="sm" className="gap-2 bg-transparent">
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  )
}
