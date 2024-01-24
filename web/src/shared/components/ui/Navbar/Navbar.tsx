"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, CircleUserRound, Cog, LogOut, Search } from "lucide-react"

import { useAuth } from "@/shared/hooks/useAuth"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { useEffect, useState } from "react"

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
  const [result, setResult] = useState<UserDTO[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { getUserSession, clearAuthCookies } = useAuth()
  const session = getUserSession()
  const router = useRouter()
  const debouncedValue = useDebounce<string>(searchTerm, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (searchTerm) {
      ;(async () => {
        const parsedBody: ResponseDTO<PaginationDTO<UserDTO>> = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/list?username=${searchTerm}`,
          {
            method: "GET",
          }
        ).then(async (res) => {
          const body = res.body ? await res.text() : null
          return body ? JSON.parse(body) : null
        })
        setResult(parsedBody.data.items)
      })()
    }
  }, [debouncedValue])

  function onLogout() {
    clearAuthCookies()
    router.replace("/")
  }

  return (
    <div className="px-3 lg:px-0 w-screen bg-dark-str z-[900] h-[61px] fixed top-0">
      <div className="max-w-[1022px] w-full mx-auto py-4 flex items-center justify-between">
        {back ? (
          <Link
            href="/"
            className="flex items-center gap-x-1 text-light-str cursor-pointer"
          >
            <ChevronLeft />
            Back
          </Link>
        ) : (
          <Link href="/" className="flex cursor-pointer items-center gap-x-1">
            <img src="/assets/logo.svg" alt="" className="h-[28px]" />
            <span className="text-white text-lg">Trackx</span>
          </Link>
        )}
        {search && (
          <div className="hidden md:block relative h-fit w-fit ml-10">
            <input
              type="text"
              placeholder="Search for a user"
              onChange={handleChange}
              className="bg-dark-low/50 pl-8 pr-3 py-[2px] outline-none text-light-str placeholder:text-light-str/50 w-[500px] rounded"
            />
            <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-light-str/50" />
            {result.length > 0 && searchTerm && (
              <div className="bg-white absolute inset-x-0 top-full mt-1 text-dark-str border border-dark-mid/10 rounded">
                {result?.map((user) => (
                  <Link href={`/profile/${user.username}`} className="hover:bg-light-str block px-2 py-1 cursor-pointer">{user.username}</Link>
                ))}
              </div>
            )}
          </div>
        )}

        {signIn && !session && (
          <Link href="/login" className="flex items-center gap-x-1">
            <button className="flex font-medium items-center h-[30px] px-3 gap-x-1 active:scale-95 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
              <CircleUserRound className="w-[20px] cursor-pointer -mt-[1px]" />
              Sign In
            </button>
          </Link>
        )}
        {session && (
          <div className="flex items-center gap-x-2 md:gap-x-4">
            <div className="flex md:hidden hover:bg-light-str/10 rounded transition-all h-[30px] active:scale-95 px-1 text-light-str items-center w-fit gap-x-2 cursor-pointer">
              <Search />
            </div>
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
        )}
      </div>
    </div>
  )
}
