import { type NextRequest, NextResponse } from "next/server"
import { cognito } from "@/lib/cognito-config"

/**
 * Debug endpoint to test Cognito configuration
 * GET /api/auth/debug
 */
export async function GET(request: NextRequest) {
  console.log("[v0] Debug endpoint called")

  const config = {
    clientId: cognito.clientId,
    domain: cognito.domain,
    region: cognito.region,
    redirectSignIn: cognito.redirectSignIn,
    authUrl: `https://${cognito.domain}.auth.${cognito.region}.amazoncognito.com/oauth2/authorize`,
  }

  const cookies = request.cookies.getAll().map((c) => ({
    name: c.name,
    hasValue: !!c.value,
    maxAge: c.maxAge,
  }))

  const envVars = {
    NEXT_PUBLIC_COGNITO_CLIENT_ID: !!process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET: !!process.env.COGNITO_CLIENT_SECRET,
    NEXT_PUBLIC_COGNITO_USER_POOL_ID: !!process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    NEXT_PUBLIC_COGNITO_REGION: !!process.env.NEXT_PUBLIC_COGNITO_REGION,
    NEXT_PUBLIC_COGNITO_DOMAIN: !!process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    config,
    cookies,
    envVars,
    message: "Check browser console for debug logs during auth flow",
  })
}
