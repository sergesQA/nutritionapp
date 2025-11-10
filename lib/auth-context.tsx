"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  sub: string
  email: string
  email_verified: boolean
  name: string
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  authenticated: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }
      } catch (error) {
        console.error("[v0] Auth check failed:", error)
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    await fetch("/api/auth/logout")
    setUser(null)
    setAuthenticated(false)
  }

  return <AuthContext.Provider value={{ user, loading, authenticated, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
