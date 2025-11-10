import { type NextRequest, NextResponse } from "next/server"
import { getCognitoConfig, generateRandomString } from "@/lib/cognito-config"

export async function GET(request: NextRequest) {
  try {
    const config = getCognitoConfig()

    // Generate secure random state
    const state = generateRandomString()

    // Build authorization URL
    const params = new URLSearchParams({
      client_id: config.clientId,
      response_type: "code",
      scope: "openid email phone",
      redirect_uri: config.redirectUri,
      state,
    })

    const authUrl = `${config.authorizationEndpoint}?${params.toString()}`

    // Store state in cookie for CSRF protection
    const response = NextResponse.redirect(authUrl)
    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
