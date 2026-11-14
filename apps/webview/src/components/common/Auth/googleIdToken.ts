export async function requestGoogleIdToken() {
  if (import.meta.env.DEV && !import.meta.env.VITE_GRAPHQL_URL) {
    return 'mock-google-id-token'
  }
  throw new Error('구글 로그인은 준비 중이에요')
}
