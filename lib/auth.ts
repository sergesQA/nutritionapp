import { jwtVerify } from "jose"
import { getCognitoConfig } from "./cognito-config"

const secret = new TextEncoder().encode(process.env.COGNITO_CLIENT_SECRET || "your-secret-key")

export interface AuthClaims {
  sub: string
  email: string
  email_verified: boolean
  name: string
  [key: string]: any
}

export async function verifyAndDecodeToken(token: string): Promise<AuthClaims> {
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload as AuthClaims
  } catch (error) {
    throw new Error(`Token verification failed: ${error}`)
  }
}

export async function exchangeCodeForToken(code: string): Promise<{
  accessToken: string
  idToken: string
  refreshToken?: string
}> {
  const config = getCognitoConfig()

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: config.clientId,
    client_secret: config.clientSecret || "",
    code,
    redirect_uri: config.redirectUri,
  })

  const response = await fetch(config.tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Token exchange failed: ${error}`)
  }

  const data = await response.json()
  return {
    accessToken: data.access_token,
    idToken: data.id_token,
    refreshToken: data.refresh_token,
  }
}

export function parseJwtClaims(token: string): AuthClaims {
  const parts = token.split(".")
  if (parts.length !== 3) {
    throw new Error("Invalid token format")
  }

  const decoded = Buffer.from(parts[1], "base64").toString("utf-8")
  return JSON.parse(decoded) as AuthClaims
}
