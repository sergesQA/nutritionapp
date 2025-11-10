"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { InsuranceIdEntry } from "@/components/insurance-id-entry"
import { OnboardingSurvey } from "@/components/onboarding-survey"
import { MainApp } from "@/components/main-app"
import { Card } from "@/components/ui/card"

type AppState = "login" | "entry" | "onboarding" | "app"

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const [appState, setAppState] = useState<AppState>("login")
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    if (isLoading) return

    if (isAuthenticated) {
      setAppState("entry")
    } else {
      setAppState("login")
    }
  }, [isAuthenticated, isLoading])

  const handleInsuranceIdSubmit = (id: string) => {
    setUserProfile({ insuranceId: id, email: user?.email })
    setAppState("onboarding")
  }

  const handleOnboardingComplete = (surveyData: any) => {
    setUserProfile((prev) => ({ ...prev, ...surveyData }))
    setAppState("app")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8">
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {appState === "login" && (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <Card className="w-full max-w-md p-8 shadow-lg">
            <div className="space-y-6 text-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Nutrition Tracker</h1>
                <p className="text-muted-foreground">Track your nutrition journey with ease</p>
              </div>
              <button
                onClick={() => (window.location.href = "/api/auth/login")}
                className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
              >
                Login with Cognito
              </button>
              <p className="text-xs text-center text-muted-foreground">Your data is secure and encrypted</p>
            </div>
          </Card>
        </div>
      )}
      {appState === "entry" && <InsuranceIdEntry onSubmit={handleInsuranceIdSubmit} />}
      {appState === "onboarding" && <OnboardingSurvey onComplete={handleOnboardingComplete} />}
      {appState === "app" && <MainApp userProfile={userProfile} />}
    </div>
  )
}
