import { NextResponse } from "next/server"
import { getCognitoAuthUrl } from "@/lib/cognito-config"

export async function GET() {
  try {
    const authUrl = getCognitoAuthUrl()
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
