import { scoreRank } from "@/shared/utils/scoreRank"
import { FileX } from "lucide-react"

interface GameCardProps {
  title: string
  coverUrl: string
}

export function GameCard({ title, coverUrl }: GameCardProps) {
  return (
    <div className="w-[196px] col-span-1 rounded flex flex-col cursor-pointer">
      <div className="w-[196px] h-[265px] relative rounded border border-dark-str/10 overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt=""
            className="w-[196px] h-[265px] object-fill hover:scale-105 transition-all"
          />
        ) : (
          <div className="w-[196px] h-[265px] flex flex-col items-center justify-center bg-dark-low/10">
            <FileX className="w-[50px] h-[50px] text-dark-low" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center mt-1 gap-x-[6px] z-50">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="relative">
              <div className="w-[10px] group h-[10px] rounded-sm bg-gradient-to-t from-[#D5224E] to-[#FF003F]">
                <div className="absolute border border-dark-low/30 whitespace-nowrap z-50 hidden group-hover:block -top-9 left-1/2 -translate-x-1/2 bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                  {scoreRank[index]}
                </div>
                <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute -top-[13px] border border-dark-low/30 left-1/2 -translate-x-1/2 bg-dark-str" />
              </div>
            </div>
          ))}
          {Array.from({ length: 10 - 7 }).map((_, index) => (
            <div key={index} className="relative">
              <div className="w-[10px] group h-[10px] rounded-sm bg-dark-mid">
                <div className="absolute border border-dark-low/30 z-50 whitespace-nowrap hidden group-hover:block -top-9 left-1/2 -translate-x-1/2 bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                  {scoreRank[index + 7]}
                </div>
                <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute -top-[13px] border border-dark-low/30 left-1/2 -translate-x-1/2 bg-dark-str" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="text-sm font-semibold mt-[2px] line-clamp-2">
        {title}
      </span>
    </div>
  )
}
