"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DayData {
  date: number
  hasEntries: boolean
  caloriesLogged: number
  status: "met" | "close" | "over" | "none"
}

export function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const generateCalendarData = (): (DayData | null)[] => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const data: (DayData | null)[] = Array(firstDay).fill(null)

    const calorieGoal = 2500

    for (let i = 1; i <= daysInMonth; i++) {
      const hasEntries = Math.random() > 0.3
      const caloriesLogged = hasEntries ? Math.floor(Math.random() * 3000) : 0

      let status: "met" | "close" | "over" | "none" = "none"
      if (hasEntries) {
        const percentage = (caloriesLogged / calorieGoal) * 100
        if (percentage >= 95 && percentage <= 105) status = "met"
        else if (percentage > 105) status = "over"
        else status = "close"
      }

      data.push({
        date: i,
        hasEntries,
        caloriesLogged,
        status,
      })
    }

    return data
  }

  const calendarDays = generateCalendarData()
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "met":
        return "bg-green-500/20 border-green-500/50"
      case "close":
        return "bg-amber-500/20 border-amber-500/50"
      case "over":
        return "bg-red-500/20 border-red-500/50"
      default:
        return "bg-muted border-muted"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "met":
        return "bg-green-500"
      case "close":
        return "bg-amber-500"
      case "over":
        return "bg-red-500"
      default:
        return "bg-muted-foreground"
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Calendar</h1>
        <p className="text-muted-foreground">Track your daily nutrition progress</p>
      </div>

      <Card className="p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-foreground">{monthName}</h2>
          <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-2 text-center transition-colors ${
                day ? getStatusColor(day.status) : "bg-transparent border-transparent"
              }`}
            >
              {day && (
                <>
                  <span className="font-semibold text-foreground text-sm">{day.date}</span>
                  {day.hasEntries && (
                    <>
                      <div className={`w-2 h-2 rounded-full mt-1 ${getStatusDot(day.status)}`} />
                      <span className="text-xs text-muted-foreground mt-1">{day.caloriesLogged}</span>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="text-sm font-semibold text-foreground mb-3">Status Legend</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Goal Met</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-muted-foreground">Close</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">Over Goal</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
