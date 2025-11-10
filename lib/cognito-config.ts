export const cognito = {
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "2r72lfm59rs6257glg6gt7sfa9",
  clientSecret: process.env.COGNITO_CLIENT_SECRET || "<client secret>",
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "us-east-1_4ZTGQMA7B",
  region: process.env.NEXT_PUBLIC_COGNITO_REGION || "us-east-1",
  redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI || "http://localhost:3000/auth/callback",
  redirectSignOut: process.env.NEXT_PUBLIC_COGNITO_SIGN_OUT_URI || "http://localhost:3000",
  domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "d84l1y8p4kdic",
}

export const getCognitoAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: cognito.clientId,
    response_type: "code",
    scope: "openid email phone",
    redirect_uri: cognito.redirectSignIn,
    state: crypto.randomUUID(),
  })
  return `https://${cognito.domain}.auth.${cognito.region}.amazoncognito.com/oauth2/authorize?${params}`
}
