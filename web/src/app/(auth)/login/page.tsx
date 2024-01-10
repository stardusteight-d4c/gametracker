"use client"

import { useState } from "react"
import { Navbar } from "@/shared/components/organisms/Navbar"
import { SignIn } from "@/modules/auth/pages/login/components/SignIn"
import { SignUp } from "@/modules/auth/pages/login/components/SignUp"

export default function Login() {
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
        {renderLogin()}
      </div>
    </main>
  )
}
