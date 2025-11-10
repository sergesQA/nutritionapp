import { type NextRequest, NextResponse } from "next/server"
import { cognito } from "@/lib/cognito-config"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    console.log("[v0] Callback route called with code:", !!code, "state:", !!state)

    if (!code) {
      console.error("[v0] No authorization code received")
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Exchange code for token with Cognito
    const tokenUrl = `https://${cognito.domain}.auth.${cognito.region}.amazoncognito.com/oauth2/token`
    console.log("[v0] Exchanging code for token at:", tokenUrl)

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: cognito.clientId,
        client_secret: cognito.clientSecret,
        code,
        redirect_uri: cognito.redirectSignIn,
      }).toString(),
    })

    console.log("[v0] Token response status:", tokenResponse.status)

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("[v0] Token exchange failed:", tokenResponse.status, errorText)
      return NextResponse.redirect(new URL("/", request.url))
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const idToken = tokenData.id_token

    console.log("[v0] Tokens received successfully")

    // Decode ID token to get user info (in production, verify signature)
    const decodedToken = JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf-8"))
    console.log("[v0] User authenticated:", decodedToken.email)

    // Set secure HTTP-only cookie
    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
    })
    response.cookies.set("id_token", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
    })

    console.log("[v0] Tokens set in cookies, redirecting to home")
    return response
  } catch (error) {
    console.error("[v0] Callback error:", error)
    return NextResponse.redirect(new URL("/", request.url))
  }
}
