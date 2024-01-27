import { useRouter } from "next/navigation"

import { useAuth } from "@/shared/hooks/useAuth"

export function useNavbar() {
  const { getUserSession, clearAuthCookies } = useAuth()
  const session = getUserSession()
  const router = useRouter()

  function onLogout() {
    clearAuthCookies()
    router.replace("/")
  }

  return {
    session,
    onLogout,
  }
}
