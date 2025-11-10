"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

export function CognitoLoginScreen() {
  const handleLogin = () => {
    window.location.href = "/api/auth/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-primary fill-primary" />
          </div>
          <CardTitle className="text-2xl">Nutrition Tracker</CardTitle>
          <CardDescription>Track your nutrition journey with Cognito authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} size="lg" className="w-full">
            Login with Cognito
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Sign in to access your nutrition tracking dashboard
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
