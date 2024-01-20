"use client"

import { useState } from "react"

import { SignIn, SignUp } from "./components"

import { Navbar } from "@/shared/components/organisms/Navbar"

export function LoginPage() {
  const [type, setType] = useState<"sign-in" | "sign-up">("sign-in")

  function renderLogin() {
    if (type === "sign-in") {
      return <SignIn onTypeChange={setType} />
    } else {
      return <SignUp onTypeChange={setType} />
    }
  }

  return (
    <main className="w-screen min-h-screen">
      <div className="flex flex-col h-screen items-center justify-center">
        <Navbar search={false} signIn={false} back={true} />
        <div className="w-full px-3 lg:px-0">{renderLogin()}</div>
      </div>
    </main>
  )
}
