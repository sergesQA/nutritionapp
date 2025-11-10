import { type NextRequest, NextResponse } from "next/server"
import { cognito } from "@/lib/cognito-config"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Exchange code for token with Cognito
    const tokenResponse = await fetch(
      `https://${cognito.domain}.auth.${cognito.region}.amazoncognito.com/oauth2/token`,
      {
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
      },
    )

    if (!tokenResponse.ok) {
      console.error("Token exchange failed:", await tokenResponse.text())
      return NextResponse.redirect(new URL("/", request.url))
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const idToken = tokenData.id_token

    // Decode ID token to get user info (in production, verify signature)
    const decodedToken = JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf-8"))

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

    return response
  } catch (error) {
    console.error("Callback error:", error)
    return NextResponse.redirect(new URL("/", request.url))
  }
}
