import { GameCard } from "@/modules/components/GameCard/GameCard"
import {
  ChevronDown,
  CircleUserRound,
  Instagram,
  LogIn,
  Mail,
  Search,
  Twitter,
} from "lucide-react"

export default function Home() {
  return (
    <main className="bg-white min-h-[100vh] max-w-screen text-dark-str">
      <div className="w-full bg-dark-str z-[900] fixed top-0">
        <div className="max-w-[1022px] mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <img src="/assets/logo.svg" alt="" className="h-[28px]" />
            <span className="text-white text-lg">Trackx</span>
          </div>
          <div className="relative h-fit w-fit ml-10">
            <input
              type="text"
              placeholder="Search for a user"
              className="bg-dark-low/50 pl-8 pr-3 py-[2px] outline-none text-light-str placeholder:text-light-str/50 w-[500px] rounded"
            />
            <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-light-str/50" />
          </div>
          <div className="flex items-center gap-x-1">
            <button className="flex items-center h-[29px] px-3 gap-x-1 hover:scale-105 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
              <CircleUserRound className="w-[20px] cursor-pointer" />
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[1022px] mt-[50px] mb-[100px] w-full mx-auto pt-11">
        <h1 className="text-3xl font-semibold mb-11">
          Where reality and imagination merge, <br />
          <span className="leading-10 block text-transparent bg-clip-text bg-gradient-to-t from-[#D5224E] to-[#FF003F]">
            creating captivating worlds.
          </span>
        </h1>
        <div className="flex mb-8">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">15+</span>
            <span className="text-sm">Games</span>
          </div>
          <div className="w-0 h-12 border-l border-l-dark-low/30 mx-9" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">500+</span>
            <span className="text-sm">Hours</span>
          </div>
          <div className="w-0 h-12 border-l border-l-dark-low/30 mx-9" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold flex items-center gap-x-2">
              <Instagram className="h-7 cursor-pointer" />
              <Twitter className="h-7 cursor-pointer" />
              <Mail className="h-7 cursor-pointer" />
            </span>
            <span className="text-sm">Connect</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg font-semibold ">My games</h3>
              <span className="text-sm text-dark-low cursor-pointer font-normal -mb-[2px] flex items-center">
                Sort by post date <ChevronDown className="h-[18px]" />
              </span>
            </div>
            <h3 className="text-base font-semibold cursor-pointer underline text-dark-mid/80">View all</h3>

          </div>
          <div className="grid grid-cols-5 gap-x-[10px] gap-y-7 flex-wrap">
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
          </div>
        </div>
      </div>
      <div className="w-full h-[4px] bg-dark-str" />
    </main>
  )
}
