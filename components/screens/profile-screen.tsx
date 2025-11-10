"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, User } from "lucide-react"

interface UserProfile {
  insuranceId: string
  height?: string
  weight?: string
  age?: string
  dietaryPreferences?: string[]
  healthGoals?: string[]
  activityLevel?: string
}

interface ProfileScreenProps {
  userProfile: UserProfile
}

export function ProfileScreen({ userProfile }: ProfileScreenProps) {
  const calculateBMI = () => {
    if (userProfile.height && userProfile.weight) {
      const heightInMeters = Number.parseInt(userProfile.height) / 100
      const weightInKg = Number.parseInt(userProfile.weight)
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1)
    }
    return "N/A"
  }

  return (
    <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
      </div>

      {/* User Header */}
      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">User Profile</h2>
              <p className="text-sm text-muted-foreground">ID: {userProfile.insuranceId}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Height</p>
          <p className="text-2xl font-bold text-primary">{userProfile.height || "N/A"}</p>
          <p className="text-xs text-muted-foreground">cm</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Weight</p>
          <p className="text-2xl font-bold text-primary">{userProfile.weight || "N/A"}</p>
          <p className="text-xs text-muted-foreground">kg</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Age</p>
          <p className="text-2xl font-bold text-primary">{userProfile.age || "N/A"}</p>
          <p className="text-xs text-muted-foreground">years</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">BMI</p>
          <p className="text-2xl font-bold text-primary">{calculateBMI()}</p>
          <p className="text-xs text-muted-foreground">kg/m²</p>
        </Card>
      </div>

      {/* Preferences */}
      {userProfile.dietaryPreferences && userProfile.dietaryPreferences.length > 0 && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.dietaryPreferences.map((pref) => (
              <span key={pref} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                {pref}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Health Goals */}
      {userProfile.healthGoals && userProfile.healthGoals.length > 0 && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Health Goals</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.healthGoals.map((goal) => (
              <span
                key={goal}
                className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-sm rounded-full font-medium"
              >
                {goal}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Activity Level */}
      {userProfile.activityLevel && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-2">Activity Level</h3>
          <p className="text-lg text-primary font-semibold">{userProfile.activityLevel}</p>
        </Card>
      )}

      {/* Insurance ID */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">Insurance Information</h3>
        <p className="text-sm text-muted-foreground mb-2">Insurance ID</p>
        <p className="font-mono text-lg text-foreground">{userProfile.insuranceId}</p>
      </Card>
    </div>
  )
}
