export async function uploadImage(uploadUrl: string, file: File) {
  if (import.meta.env.DEV && !import.meta.env.VITE_GRAPHQL_URL) {
    return
  }
  const response = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file })
  if (!response.ok) {
    throw new Error(`이미지 업로드 실패: ${response.status}`)
  }
}
