"use client"

import { useNavbar } from "./hooks"
import { DesktopSearch, SessionActions, Main, SignInButton } from "./components"

interface NavbarProps {
  search?: boolean
  signIn?: boolean
  back?: boolean
}

export const Navbar = ({
  search = true,
  signIn = true,
  back = false,
}: NavbarProps) => {
  const { session } = useNavbar()

  function renderingSessionActions() {
    return <SessionActions showSearchBar={search} />
  }

  function renderingSignInButton() {
    if (signIn && !session) {
      return <SignInButton />
    }
  }

  function renderingSearch() {
    if (search) {
      return <DesktopSearch />
    }
  }

  return (
    <div className="px-3 lg:px-0 w-screen bg-dark-str z-[900] h-[61px] fixed top-0">
      <div className="max-w-[1022px] w-full mx-auto py-4 flex items-center justify-between">
        <Main show={back ? "back" : "logo"} />
        {renderingSearch()}
        {renderingSignInButton()}
        {renderingSessionActions()}
      </div>
    </div>
  )
}
