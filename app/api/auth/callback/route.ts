import { NextRequest, NextResponse } from "next/server"
import { getCognitoConfig } from "@/lib/cognito-config"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  if (!code) {
    return NextResponse.redirect("/")
  }

  const config = getCognitoConfig()

  const tokenRes = await fetch(config.tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      code,
    }),
  })

  if (!tokenRes.ok) {
    console.error("Token exchange failed", await tokenRes.text())
    return NextResponse.redirect("/")
  }

  const tokens = await tokenRes.json()

  const response = NextResponse.redirect("/insurance") // ← ✅ Вот сюда переходим после логина

  response.cookies.set("access_token", tokens.access_token, { httpOnly: true, path: "/" })
  response.cookies.set("id_token", tokens.id_token, { httpOnly: true, path: "/" })
  if (tokens.refresh_token) {
    response.cookies.set("refresh_token", tokens.refresh_token, { httpOnly: true, path: "/" })
  }

  return response
}
