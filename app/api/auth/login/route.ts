import { type NextRequest, NextResponse } from "next/server"
import { getCognitoConfig, generateRandomString, generateCodeChallenge } from "@/lib/cognito-config"

export async function GET(request: NextRequest) {
  try {
    const config = getCognitoConfig()

    // Generate secure random state
    const state = generateRandomString()

    const { codeVerifier, codeChallenge } = await generateCodeChallenge()

    const params = new URLSearchParams({
      client_id: config.clientId,
      response_type: "code",
      scope: "email openid phone",
      redirect_uri: config.redirectUri,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    })

    const authUrl = `${config.authorizationEndpoint}?${params.toString()}`

    console.log("[v0] Auth URL:", authUrl)

    // Store state and code verifier in cookies for verification
    const response = NextResponse.redirect(authUrl)
    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
    })
    response.cookies.set("code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600,
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
