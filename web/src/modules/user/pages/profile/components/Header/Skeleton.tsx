import { CircleUserRound } from "lucide-react"

export function HeaderSkeleton() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-11">
        Where reality and imagination merge, <br />
        <span className="leading-10 block text-transparent bg-clip-text bg-gradient-to-t from-[#D5224E] to-[#FF003F]">
          creating captivating worlds.
        </span>
      </h1>
      <div className="flex items-center flex-col-reverse lg:flex-row gap-y-8 justify-between mb-8">
        <div className="flex">
          <div className="flex flex-col">
            <span className="text-lg text-transparent w-fit font-semibold bg-dark-low/10 animate-pulse blur-[2px]">
              123
            </span>
            <span className="text-sm text-transparent w-fit bg-dark-low/10 animate-pulse blur-[2px]">
              No game
            </span>
          </div>
          <div className="w-0 h-12 border-l border-l-dark-low/30 mx-9" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-transparent w-fit bg-dark-low/10 animate-pulse blur-[2px]">
              1/22/2024
            </span>
            <span className="text-sm text-transparent w-fit bg-dark-low/10 animate-pulse blur-[2px]">
              Member since
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="w-[32px] rounded-full h-[32px] bg-dark-low/10 animate-pulse blur-[2px]" />
          <span className="text-lg font-medium text-transparent w-fit bg-dark-low/10 animate-pulse blur-[2px]">
            Stardust
          </span>
        </div>
      </div>
    </>
  )
}
