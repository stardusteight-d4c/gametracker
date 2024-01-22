import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Navbar } from "@/shared/components/ui/Navbar"

export function HomePage() {
  return (
    <main className="bg-white h-full min-h-screen max-w-screen text-dark-str">
      <Navbar search={false} />
      <div className="px-3 lg:px-0 max-w-[1022px] mt-36 mb-24 md:text-center h-full w-full md:mx-auto flex flex-col md:items-center md:justify-center">
        <div className="flex items-center w-fit gap-x-1 py-1 px-3 rounded-full bg-light-str/30 border border-dark-mid/10">
          <img src="/assets/logo.svg" alt="" className="h-[24px]" />
          <span className="text-md">Trackx</span>
        </div>
        <h1 className="text-5xl mt-2 md:mt-0 md:text-center md:text-7xl font-semibold">
          Your{" "}
          <span className="bg-gradient-to-t from-[#D5224E] to-[#FF003F] bg-clip-text text-transparent">
            space
          </span>{" "}
          to store experiences
        </h1>
        <span className="md:w-[500px] text-lg font-medium mt-6">
          Share your moments and discover games that move others. Together, the
          adventure is more intense.
        </span>
        <div className="flex items-center gap-x-1 mt-6">
          <Link
            href="/login"
            className="flex font-semibold items-center justify-center h-[29px] p-5 gap-x-1 active:scale-95 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded"
          >
            Try Now for Free
            <ChevronRight />
          </Link>
        </div>
        <img
          src="/assets/hero.png"
          className="mt-[55px] object-contain md:object-fill mx-auto w-[808px] h-[265px] sm:h-[465px] rounded-lg border border-dark-mid/10"
        />
      </div>
    </main>
  )
}
