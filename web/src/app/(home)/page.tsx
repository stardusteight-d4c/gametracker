import { ChevronRight } from "lucide-react"
import { Navbar } from "../shared/organisms/Navbar"

export default function UserProfile() {
  return (
    <main className="bg-white min-h-screen max-w-screen text-dark-str">
      <Navbar search={false} />
      <div className="max-w-[1022px] mt-36 mb-24 text-center h-full w-full mx-auto flex flex-col items-center justify-center">
        <div className="flex cursor-pointer items-center gap-x-1 py-1 px-3 rounded-full bg-light-str border border-dark-mid/10">
          <img src="/assets/logo.svg" alt="" className="h-[24px]" />
          <span className="text-lg">Trackx</span>
        </div>
        <h1 className="text-7xl font-semibold">
          Your{" "}
          <span className="bg-gradient-to-t from-[#D5224E] to-[#FF003F] bg-clip-text text-transparent">
            space
          </span>{" "}
          to store experiences
        </h1>
        <span className="w-[500px] text-lg font-medium mt-6">
          Share your moments and discover games that move others. Together, the
          adventure is more intense.
        </span>
        <div className="flex items-center gap-x-1 mt-6">
          <button className="flex items-center h-[29px] p-5 gap-x-1 hover:scale-105 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
            Try Now for Free
            <ChevronRight />
          </button>
        </div>
        <img
          src="/assets/hero.png"
          className="mt-[55px] shadow-md shadow-dark-str/10 object-fill mx-auto w-[808px] h-[465px] rounded-lg border border-dark-mid/10"
        />
      </div>
      <div className="w-full h-[4px] bg-dark-str" />
    </main>
  )
}
