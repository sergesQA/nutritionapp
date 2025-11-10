"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FoodEntry {
  id: string
  name: string
  portion: string
  calories: number
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snacks"
}

export function FoodDiary() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState({ name: "", portion: "", calories: "", meal: "Breakfast" as const })
  const [entries, setEntries] = useState<FoodEntry[]>([
    { id: "1", name: "Oatmeal with Berries", portion: "1 bowl", calories: 350, meal: "Breakfast" },
    { id: "2", name: "Chicken Salad", portion: "200g", calories: 450, meal: "Lunch" },
    { id: "3", name: "Apple", portion: "1 medium", calories: 95, meal: "Snacks" },
  ])

  const meals: ("Breakfast" | "Lunch" | "Dinner" | "Snacks")[] = ["Breakfast", "Lunch", "Dinner", "Snacks"]

  const handleAddEntry = () => {
    if (newEntry.name && newEntry.portion && newEntry.calories) {
      setEntries([
        ...entries,
        {
          id: Date.now().toString(),
          name: newEntry.name,
          portion: newEntry.portion,
          calories: Number.parseInt(newEntry.calories),
          meal: newEntry.meal,
        },
      ])
      setNewEntry({ name: "", portion: "", calories: "", meal: "Breakfast" })
      setShowAddForm(false)
    }
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id))
  }

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0)

  const groupedEntries = meals.reduce(
    (acc, meal) => {
      acc[meal] = entries.filter((e) => e.meal === meal)
      return acc
    },
    {} as Record<string, FoodEntry[]>,
  )

  return (
    <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Food Diary</h1>
      </div>

      {/* Date Selector */}
      <Card className="p-4 mb-6">
        <label className="text-sm font-medium text-foreground">Select Date</label>
        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="mt-2" />
      </Card>

      {/* Meal Sections */}
      <div className="space-y-6">
        {meals.map((meal) => {
          const mealEntries = groupedEntries[meal]
          const mealTotal = mealEntries.reduce((sum, e) => sum + e.calories, 0)

          return (
            <Card key={meal} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">{meal}</h2>
                <span className="text-sm font-medium text-primary">{mealTotal} cal</span>
              </div>

              <div className="space-y-3 mb-4">
                {mealEntries.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No items added</p>
                ) : (
                  mealEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">{entry.portion}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-foreground">{entry.calories} cal</span>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {meal === "Breakfast" && !showAddForm && (
                <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Food Item
                </Button>
              )}
            </Card>
          )
        })}
      </div>

      {/* Add Food Form */}
      {showAddForm && (
        <Card className="p-6 mt-6 border-primary">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add Food Item</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Food Name</label>
              <Input
                placeholder="e.g., Grilled Chicken"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Portion Size</label>
              <Input
                placeholder="e.g., 150g"
                value={newEntry.portion}
                onChange={(e) => setNewEntry({ ...newEntry, portion: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Calories</label>
              <Input
                type="number"
                placeholder="e.g., 250"
                value={newEntry.calories}
                onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Meal Type</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {meals.map((meal) => (
                  <button
                    key={meal}
                    onClick={() => setNewEntry({ ...newEntry, meal })}
                    className={`p-2 rounded text-sm font-medium transition-colors ${
                      newEntry.meal === meal
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleAddEntry}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add Item
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Daily Total */}
      <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Daily Total</h3>
          <span className="text-3xl font-bold text-primary">{totalCalories} cal</span>
        </div>
      </Card>
    </div>
  )
}
