import { type NextRequest, NextResponse } from "next/server"
import { exchangeCodeForToken, parseJwtClaims } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // Check for Cognito errors
    if (error) {
      console.error("[v0] Cognito error:", error)
      return NextResponse.redirect(new URL(`/?error=${error}`, request.url))
    }

    if (!code) {
      return NextResponse.redirect(new URL("/?error=no_code", request.url))
    }

    // Verify state matches
    const storedState = request.cookies.get("oauth_state")?.value
    if (!storedState || storedState !== state) {
      console.error("[v0] State mismatch")
      return NextResponse.redirect(new URL("/?error=state_mismatch", request.url))
    }

    const codeVerifier = request.cookies.get("code_verifier")?.value
    if (!codeVerifier) {
      console.error("[v0] Code verifier not found")
      return NextResponse.redirect(new URL("/?error=no_verifier", request.url))
    }

    // Exchange code for tokens using PKCE
    const tokens = await exchangeCodeForToken(code, codeVerifier)

    // Parse ID token to get user claims
    const claims = parseJwtClaims(tokens.idToken)

    // Create response and set auth cookies
    const response = NextResponse.redirect(new URL("/insurance", request.nextUrl.origin)


    response.cookies.set("access_token", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hour
    })

    response.cookies.set("id_token", tokens.idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
    })

    if (tokens.refreshToken) {
      response.cookies.set("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2592000, // 30 days
      })
    }

    response.cookies.set("user_info", JSON.stringify(claims), {
      httpOnly: false, // Allow client-side access for display
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
    })

    response.cookies.delete("code_verifier")
    response.cookies.delete("oauth_state")

    return response
  } catch (error) {
    console.error("[v0] Callback error:", error)
    return NextResponse.redirect(new URL("/?error=callback_failed", request.url))
  }
}
