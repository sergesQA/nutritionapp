export const getCognitoConfig = () => {
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  const clientSecret = process.env.COGNITO_CLIENT_SECRET
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN
  const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI
  const signOutUri = process.env.NEXT_PUBLIC_COGNITO_SIGN_OUT_URI

  if (!clientId || !region || !domain || !redirectUri) {
    throw new Error("Missing required Cognito environment variables")
  }

  return {
    clientId,
    clientSecret,
    region,
    userPoolId,
    domain,
    redirectUri,
    signOutUri,
    issuerUrl: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
    authorizationEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/oauth2/authorize`,
    tokenEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/oauth2/token`,
    userInfoEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/oauth2/userInfo`,
    logoutEndpoint: `https://${domain}.auth.${region}.amazoncognito.com/logout`,
  }
}

export function generateRandomString(length = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}
