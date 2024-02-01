import { NextRequest, NextResponse } from "next/server"

import { HandleRedirect } from "./shared/utils"
import { useAuth } from "./shared/hooks"

export default function middleware(req: NextRequest) {
  const { getServerUserSession } = useAuth()

  const isManageRoute = req.nextUrl.pathname === "/games/manage"
  const isLoginRoute = req.nextUrl.pathname === "/login"

  const handleRedirect = new HandleRedirect({
    request: req,
    isAuthenticated: !!getServerUserSession(req),
  })

  if (isManageRoute) return handleRedirect.manageRoute()
  if (isLoginRoute) return handleRedirect.loginRoute()

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-url", req.url)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ["/games/manage", "/login"],
}
