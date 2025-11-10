"use client"

import { useState } from "react"
import { InsuranceIdEntry } from "@/components/insurance-id-entry"
import { OnboardingSurvey } from "@/components/onboarding-survey"
import { MainApp } from "@/components/main-app"

type AppState = "entry" | "onboarding" | "app"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("entry")
  const [userProfile, setUserProfile] = useState<any>(null)

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
