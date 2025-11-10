import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const userInfo = request.cookies.get("user_info")?.value

    if (!userInfo) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const user = JSON.parse(userInfo)
    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    console.error("[v0] Auth check error:", error)
    return NextResponse.json({ authenticated: false, error: "Auth check failed" }, { status: 401 })
  }
}
