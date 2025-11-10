"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface OnboardingSurveyProps {
  onComplete: (data: any) => void
}

interface SurveyData {
  height: string
  weight: string
  age: string
  dietaryPreferences: string[]
  healthGoals: string[]
  activityLevel: string
  startDate: string
}

const dietaryOptions = ["Vegetarian", "Vegan", "Keto", "Paleo", "No Restrictions"]
const healthGoals = ["Weight Loss", "Muscle Gain", "Maintenance", "Athletic Performance", "General Health"]
const activityLevels = ["Sedentary", "Light", "Moderate", "Active", "Very Active"]

export function OnboardingSurvey({ onComplete }: OnboardingSurveyProps) {
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<SurveyData>({
    height: "",
    weight: "",
    age: "",
    dietaryPreferences: [],
    healthGoals: [],
    activityLevel: "",
    startDate: new Date().toISOString().split("T")[0],
  })

  const steps = [
    { title: "Basic Information", description: "Height, Weight, and Age" },
    { title: "Dietary Preferences", description: "Select your dietary preferences" },
    { title: "Health Goals", description: "What are your fitness goals?" },
    { title: "Activity Level", description: "How active are you?" },
    { title: "Start Date", description: "When would you like to start?" },
  ]

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      onComplete(data)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const toggleArrayValue = (field: "dietaryPreferences" | "healthGoals", value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }))
  }

  const isStepValid = () => {
    switch (step) {
      case 0:
        return data.height && data.weight && data.age
      case 1:
        return data.dietaryPreferences.length > 0
      case 2:
        return data.healthGoals.length > 0
      case 3:
        return data.activityLevel
      case 4:
        return data.startDate
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 mx-1 rounded-full transition-colors ${
                  index <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">{steps[step].title}</h2>
            <p className="text-muted-foreground">{steps[step].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="170"
                  value={data.height}
                  onChange={(e) => setData({ ...data, height: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="70"
                  value={data.weight}
                  onChange={(e) => setData({ ...data, weight: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Age</label>
                <Input
                  type="number"
                  placeholder="25"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleArrayValue("dietaryPreferences", option)}
                  className={`p-3 rounded-lg border-2 transition-colors text-center font-medium ${
                    data.dietaryPreferences.includes(option)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {healthGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleArrayValue("healthGoals", goal)}
                  className={`p-3 rounded-lg border-2 transition-colors text-center font-medium ${
                    data.healthGoals.includes(goal)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              {activityLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setData({ ...data, activityLevel: level })}
                  className={`w-full p-3 rounded-lg border-2 transition-colors text-center font-medium ${
                    data.activityLevel === level
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <label className="text-sm font-medium text-foreground">Start Date</label>
              <Input
                type="date"
                value={data.startDate}
                onChange={(e) => setData({ ...data, startDate: e.target.value })}
                className="mt-1"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0 || isLoading}
            className="flex-1 bg-transparent"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {step === steps.length - 1 ? "Complete" : "Next"}
                {step < steps.length - 1 && !isLoading && <ChevronRight className="w-4 h-4 ml-2" />}
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
