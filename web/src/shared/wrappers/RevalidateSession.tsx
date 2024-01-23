"use client"

import { useAuth } from "../hooks/useAuth"

function isTokenExpired(token: DecodedToken): boolean {
  const currentTimestamp: number = Math.floor(Date.now() / 1000)
  return currentTimestamp > token.exp
}

export async function RevalidateSession() {
  const { getUserSession } = useAuth()
 
 // async function refreshSession() {
  //   const session = getUserSession()

  //   if (session) {
  //     if (isTokenExpired(session)) {
  //       const res = await fetch("/users/auth/refreshToken", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //     }
  //   }
  // }

  return <></>
}
