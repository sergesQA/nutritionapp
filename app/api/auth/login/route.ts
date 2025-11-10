import { NextResponse } from "next/server"
import { getCognitoAuthUrl } from "@/lib/cognito-config"

export async function GET() {
  try {
    console.log("[v0] Login route called")
    const authUrl = getCognitoAuthUrl()
    console.log("[v0] Generated auth URL:", authUrl)

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error("[v0] Login error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        error: "Login failed",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
