"use client"

import Link from "next/link"
import { CircleUserRound, Cog, LogOut, Search, X } from "lucide-react"

import { useNavbar, useSearch } from "../../hooks"
import { MobileSearch } from ".."

interface SessionActionsProps {
  showSearchBar: boolean
}

export function SessionActions({ showSearchBar }: SessionActionsProps) {
  const { makeSearch, handleMakeSearch } = useSearch()
  const { session, onLogout } = useNavbar()

  if (!session) {
    return
  }

  return (
    <div className="flex items-center gap-x-2 md:gap-x-4">
      {showSearchBar && (
        <div className="flex md:hidden hover:bg-light-str/10 rounded transition-all h-[30px] active:scale-95 px-1 text-light-str items-center w-fit gap-x-2 cursor-pointer">
          {makeSearch ? (
            <X onClick={handleMakeSearch} />
          ) : (
            <Search onClick={handleMakeSearch} />
          )}
          {makeSearch && <MobileSearch />}
        </div>
      )}
      <Link
        href="/games/manage"
        className="hover:bg-light-str/10 rounded transition-all h-[30px] active:scale-95 px-1 flex text-light-str items-center w-fit gap-x-2 cursor-pointer"
      >
        <Cog />
        <span className="font-medium cursor-pointer hidden md:block">
          Games
        </span>
      </Link>
      <Link
        href={`/profile/${session.username}`}
        className="hover:bg-light-str/10 rounded transition-all h-[30px] active:scale-95 px-1 flex text-light-str items-center w-fit gap-x-2 cursor-pointer"
      >
        <CircleUserRound />
        <span className="font-medium cursor-pointer hidden md:block">
          Profile
        </span>
      </Link>
      <div
        onClick={onLogout}
        className="hover:bg-light-str/10 rounded transition-all h-[30px] active:scale-95 px-1 flex text-light-str items-center w-fit gap-x-2 cursor-pointer"
      >
        <LogOut />
      </div>
    </div>
  )
}
