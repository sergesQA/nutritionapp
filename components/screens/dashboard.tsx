"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Droplet } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function Dashboard() {
  // Sample data
  const calorieGoal = 2500
  const caloriesConsumed = 1820
  const caloriePercentage = (caloriesConsumed / calorieGoal) * 100

  const macros = [
    { name: "Proteins", value: 125, goal: 150, color: "bg-blue-500" },
    { name: "Carbs", value: 280, goal: 300, color: "bg-amber-500" },
    { name: "Fats", value: 65, goal: 80, color: "bg-rose-500" },
  ]

  const waterIntake = 6 // cups
  const waterGoal = 8

  const weeklyData = [
    { day: "Mon", calories: 2200 },
    { day: "Tue", calories: 2150 },
    { day: "Wed", calories: 2300 },
    { day: "Thu", calories: 2050 },
    { day: "Fri", calories: 2400 },
    { day: "Sat", calories: 2250 },
    { day: "Sun", calories: 1820 },
  ]

  const macroChartData = [
    { name: "Proteins", value: 125 },
    { name: "Carbs", value: 280 },
    { name: "Fats", value: 65 },
  ]

  const COLORS = ["#3B82F6", "#F59E0B", "#F43F5E"]

  return (
    <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Today's Summary</h1>
        <p className="text-muted-foreground">Sunday, December 1, 2024</p>
      </div>

      {/* Calorie Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Calories</h2>
            <Flame className="w-5 h-5 text-accent" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-foreground">
                  {caloriesConsumed} / {calorieGoal}
                </span>
              </div>
              <Progress value={caloriePercentage} className="h-3" />
            </div>
            <div className="text-3xl font-bold text-primary">{calorieGoal - caloriesConsumed}</div>
            <p className="text-sm text-muted-foreground">remaining calories</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Water Intake</h2>
            <Droplet className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-foreground">
                  {waterIntake} / {waterGoal} cups
                </span>
              </div>
              <Progress value={(waterIntake / waterGoal) * 100} className="h-3" />
            </div>
            <div className="text-3xl font-bold text-primary">{waterGoal - waterIntake}</div>
            <p className="text-sm text-muted-foreground">cups remaining</p>
          </div>
        </Card>
      </div>

      {/* Macros and Weekly Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {macros.map((macro) => (
          <Card key={macro.name} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">{macro.name}</h3>
              <div className={`w-3 h-3 rounded-full ${macro.color}`} />
            </div>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">{macro.value}g</span>
                <span className="text-xs text-muted-foreground">{macro.goal}g</span>
              </div>
              <Progress value={(macro.value / macro.goal) * 100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground">{Math.round((macro.value / macro.goal) * 100)}% of goal</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Calories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Macros Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={macroChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}g`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
