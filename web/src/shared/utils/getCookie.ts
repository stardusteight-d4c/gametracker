export function getCookie(name: string): string | null {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim())
      if (cookieName === name) {
        return cookieValue
      }
    }
  }
  return null
}
