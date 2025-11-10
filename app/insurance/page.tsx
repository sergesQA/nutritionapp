"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { CognitoLoginScreen } from "@/components/cognito-login-screen"
import { InsuranceIdEntry } from "@/components/insurance-id-entry"
import { OnboardingSurvey } from "@/components/onboarding-survey"
import { MainApp } from "@/components/main-app"

type AppState = "entry" | "onboarding" | "app"

export default function InsurancePage() {
  const { authenticated, loading } = useAuth()
  const router = useRouter()
  const [appState, setAppState] = useState<AppState>("entry")
  const [userProfile, setUserProfile] = useState<any>(null)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!authenticated) {
    return <InsuranceIdEntry />
  }

  const handleInsuranceIdSubmit = (id: string) => {
    setUserProfile({ insuranceId: id })
    setAppState("onboarding")
  }

  const handleOnboardingComplete = (surveyData: any) => {
    setUserProfile((prev) => ({ ...prev, ...surveyData }))
    setAppState("app")
  }

  return (
    <div className="min-h-screen bg-background">
      {appState === "entry" && <InsuranceIdEntry onSubmit={handleInsuranceIdSubmit} />}
      {appState === "onboarding" && <OnboardingSurvey onComplete={handleOnboardingComplete} />}
      {appState === "app" && <MainApp userProfile={userProfile} />}
    </div>
  )
}
