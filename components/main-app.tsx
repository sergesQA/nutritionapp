"use client"

import type React from "react"

import { useState } from "react"
import { Dashboard } from "./screens/dashboard"
import { FoodDiary } from "./screens/food-diary"
import { MealList } from "./screens/meal-list"
import { CalendarScreen } from "./screens/calendar-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { Home, BookOpen, Utensils, Calendar, User } from "lucide-react"

interface MainAppProps {
  userProfile: any
}

type ScreenType = "dashboard" | "diary" | "meals" | "calendar" | "profile"

export function MainApp({ userProfile }: MainAppProps) {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("dashboard")

  const screens = {
    dashboard: <Dashboard />,
    diary: <FoodDiary />,
    meals: <MealList />,
    calendar: <CalendarScreen />,
    profile: <ProfileScreen userProfile={userProfile} />,
  }

  const navItems: { id: ScreenType; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { id: "meals", label: "Meals", icon: <Utensils className="w-5 h-5" /> },
    { id: "diary", label: "Diary", icon: <BookOpen className="w-5 h-5" /> },
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
  ]

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">{screens[activeScreen]}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="max-w-screen-lg mx-auto flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                activeScreen === item.id ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
