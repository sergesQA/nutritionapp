import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Auth check (/api/auth/me) called")

    const idToken = request.cookies.get("id_token")?.value
    console.log("[v0] ID token present:", !!idToken)

    if (!idToken) {
      console.log("[v0] No ID token found, returning 401")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Decode ID token to get user claims
    const decodedToken = JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf-8"))
    console.log("[v0] User authenticated as:", decodedToken.email)

    return NextResponse.json({
      email: decodedToken.email,
      sub: decodedToken.sub,
      name: decodedToken.name,
    })
  } catch (error) {
    console.error("[v0] Auth check error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        error: "Auth check failed",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
