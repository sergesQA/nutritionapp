export const getCognitoConfig = () => {
  const clientId = "2r72lfm59rs6257glg6gt7sfa9"
  const region = "us-east-1"
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID
  const domain = "us-east-14ztgqma7b"
  const redirectUri = "https://d84l1y8p4kdic.cloudfront.net"
  const signOutUri = process.env.NEXT_PUBLIC_COGNITO_SIGN_OUT_URI

  if (!clientId || !region || !domain || !redirectUri) {
    throw new Error("Missing required Cognito environment variables")
  }

  return {
    clientId,
    // clientSecret removed
    region,
    userPoolId,
    domain,
    redirectUri,
    signOutUri,
    issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
    authorizationEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/oauth2/authorize`,
    tokenEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/oauth2/token`,
    userInfoEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/oauth2/userInfo`,
    logoutEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/logout`,
    loginEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/login`,
  }
}

export function generateRandomString(length = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export async function generateCodeChallenge(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const codeVerifier = generateRandomString(64)
  const buffer = new TextEncoder().encode(codeVerifier)
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const codeChallenge = btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
  return { codeVerifier, codeChallenge }
}
