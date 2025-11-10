import { type NextRequest, NextResponse } from "next/server"
import { getCognitoConfig } from "@/lib/cognito-config"

export async function GET(request: NextRequest) {
  try {
    const config = getCognitoConfig()

    // Clear auth cookies
    const response = NextResponse.redirect(new URL(config.signOutUri || "/", request.url))

    response.cookies.delete("access_token")
    response.cookies.delete("id_token")
    response.cookies.delete("refresh_token")
    response.cookies.delete("user_info")
    response.cookies.delete("oauth_state")

    return response
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
