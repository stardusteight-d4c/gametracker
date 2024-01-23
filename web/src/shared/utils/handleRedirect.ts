import { NextRequest, NextResponse } from "next/server"

export class HandleRedirect {
  request: NextRequest
  isAuthenticated: boolean

  constructor(attr: { request: NextRequest; isAuthenticated: boolean }) {
    this.isAuthenticated = attr.isAuthenticated
    this.request = attr.request
  }

  public manageRoute() {
    if (!this.isAuthenticated) {
      return NextResponse.redirect(new URL("/", this.request.nextUrl))
    }
  }

  public loginRoute() {
    if (this.isAuthenticated) {
      return NextResponse.redirect(new URL("/", this.request.nextUrl))
    }
  }
}
