"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface InsuranceIdEntryProps {
  onSubmit: (id: string) => void
}

export function InsuranceIdEntry({ onSubmit }: InsuranceIdEntryProps) {
  const [id, setId] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!id.trim()) {
      setError("Please enter your Insurance ID")
      return
    }

    setIsLoading(true)
    // Simulate validation
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSubmit(id)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Nutrition Tracker</h1>
            <p className="text-muted-foreground">Track your nutrition journey with ease</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="insurance-id" className="text-sm font-medium text-foreground">
                Insurance ID
              </label>
              <Input
                id="insurance-id"
                placeholder="Enter your Insurance ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={isLoading}
                className="h-10"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10"
            >
              {isLoading ? "Verifying..." : "Continue"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">Your data is secure and encrypted</p>
        </div>
      </Card>
    </div>
  )
}
