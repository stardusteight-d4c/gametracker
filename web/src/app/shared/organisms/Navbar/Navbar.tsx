import { CircleUserRound, Search } from "lucide-react"

interface NavbarProps {
  search?: boolean
}

export const Navbar = ({ search = true }: NavbarProps) => {
  return (
    <div className="w-full bg-dark-str z-[900] fixed top-0">
      <div className="max-w-[1022px] mx-auto py-4 flex items-center justify-between">
        <div className="flex cursor-pointer items-center gap-x-1">
          <img src="/assets/logo.svg" alt="" className="h-[28px]" />
          <span className="text-white text-lg">Trackx</span>
        </div>
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
        <div className="flex items-center gap-x-1">
          <button className="flex items-center h-[29px] px-3 gap-x-1 hover:scale-105 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
            <CircleUserRound className="w-[20px] cursor-pointer" />
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
