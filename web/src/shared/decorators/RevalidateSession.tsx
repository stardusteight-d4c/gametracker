"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "../hooks/useAuth"
import { toast } from "../components/ui/Toaster/components/Toast/hooks/use-toast"
import { getFormattedCurrentDate } from "../utils"

function isTokenExpired(token: DecodedToken): boolean {
  const currentTimestamp: number = Math.floor(Date.now() / 1000)
  return currentTimestamp > token.exp
}

export function RevalidateSession() {
  const router = useRouter()
  const formattedCurrentData = getFormattedCurrentDate()

  async function refreshSession() {
    const { getUserSession, clearAuthCookies } = useAuth()
    const session = getUserSession()

    if (session && isTokenExpired(session)) {
      clearAuthCookies()
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/auth/refreshToken`,
        {
          method: "GET",
          credentials: "include",
        }
      ).then(async (res) => {
        const body = res.body ? await res.text() : null
        return body ? JSON.parse(body) : null
      })
      if (result.error || result.statusCode === 500) {
        toast({
          title: "The session has expired",
          description: formattedCurrentData,
          variant: "destructive",
        })
        router.replace("/login")
      }
    }
  }

  useEffect(() => {
    refreshSession()
  }, [])

  setInterval(refreshSession, 1 * 60 * 1000)

  return <></>
}
