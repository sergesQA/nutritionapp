import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const idToken = request.cookies.get("id_token")?.value

    if (!idToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Decode ID token to get user claims
    const decodedToken = JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf-8"))

    return NextResponse.json({
      email: decodedToken.email,
      sub: decodedToken.sub,
      name: decodedToken.name,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Auth check failed" }, { status: 500 })
  }
}
