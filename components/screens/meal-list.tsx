"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Meal {
  id: string
  name: string
  image: string
  calories: number
  proteins: number
  carbs: number
  fats: number
}

export function MealList() {
  const meals: Meal[] = [
    {
      id: "1",
      name: "Grilled Chicken Salad",
      image: "/grilled-chicken-salad.png",
      calories: 450,
      proteins: 45,
      carbs: 20,
      fats: 15,
    },
    {
      id: "2",
      name: "Oatmeal with Berries",
      image: "/oatmeal-with-berries.png",
      calories: 350,
      proteins: 12,
      carbs: 55,
      fats: 8,
    },
    {
      id: "3",
      name: "Quinoa Buddha Bowl",
      image: "/quinoa-buddha-bowl.jpg",
      calories: 520,
      proteins: 18,
      carbs: 65,
      fats: 18,
    },
    {
      id: "4",
      name: "Greek Yogurt Parfait",
      image: "/greek-yogurt-parfait.png",
      calories: 320,
      proteins: 20,
      carbs: 40,
      fats: 6,
    },
    {
      id: "5",
      name: "Salmon with Vegetables",
      image: "/salmon-and-vegetables.png",
      calories: 580,
      proteins: 50,
      carbs: 25,
      fats: 28,
    },
  ]

  const handleAddToDiary = (meal: Meal) => {
    // This would typically trigger adding to diary
    console.log("Added to diary:", meal.name)
  }

  return (
    <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Meal List</h1>
        <p className="text-muted-foreground">Pre-populated healthy meal options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden bg-muted">
              <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">{meal.name}</h3>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
                <div className="p-2 bg-muted/50 rounded">
                  <p className="text-muted-foreground text-xs">Proteins</p>
                  <p className="font-semibold text-foreground">{meal.proteins}g</p>
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  <p className="text-muted-foreground text-xs">Carbs</p>
                  <p className="font-semibold text-foreground">{meal.carbs}g</p>
                </div>
                <div className="p-2 bg-muted/50 rounded">
                  <p className="text-muted-foreground text-xs">Fats</p>
                  <p className="font-semibold text-foreground">{meal.fats}g</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">{meal.calories}</span>
                <span className="text-sm text-muted-foreground">calories</span>
              </div>

              <Button
                onClick={() => handleAddToDiary(meal)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Diary
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
