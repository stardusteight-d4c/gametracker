import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

import { getCookie, deleteCookie } from "../utils"

export function useAuth() {
  let serverAccessToken: string

  function getUserSession(): DecodedToken | null {
    const accessToken = !serverAccessToken && getCookie("accessToken")
    if (!accessToken) {
      console.error("AccessToken cookie not found")
      return null
    }

    try {
      const decodedToken = jwt.decode(serverAccessToken ?? accessToken) as DecodedToken
      return decodedToken
    } catch (error) {
      console.error("Error decoding AccessToken:", error)
      return null
    }
  }

  function getServerUserSession(req: NextRequest): DecodedToken | null {
    const accessToken = req.cookies.get("accessToken")?.value
    if (!accessToken) {
      console.error("AccessToken cookie not found")
      return null
    }

    serverAccessToken = accessToken

    try {
      const decodedToken = jwt.decode(accessToken) as DecodedToken
      return decodedToken
    } catch (error) {
      console.error("Error decoding AccessToken:", error)
      return null
    }
  }

  function clearAuthCookies(): void {
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
  }

  return {
    getUserSession,
    getServerUserSession,
    clearAuthCookies,
  }
}
