import { ChevronLeft, CircleUserRound, Search } from "lucide-react"
import Link from "next/link"

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
  return (
    <div className="w-full bg-dark-str z-[900] h-[61px] fixed top-0">
      <div className="max-w-[1022px] mx-auto py-4 flex items-center justify-between">
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
          <div className="relative h-fit w-fit ml-10">
            <input
              type="text"
              placeholder="Search for a user"
              className="bg-dark-low/50 pl-8 pr-3 py-[2px] outline-none text-light-str placeholder:text-light-str/50 w-[500px] rounded"
            />
            <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-light-str/50" />
          </div>
        )}
        {signIn && (
          <Link href="/login" className="flex items-center gap-x-1">
            <button className="flex items-center h-[29px] px-3 gap-x-1 hover:scale-105 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
              <CircleUserRound className="w-[20px] cursor-pointer" />
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
