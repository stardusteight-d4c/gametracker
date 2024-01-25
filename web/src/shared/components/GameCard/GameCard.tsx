import { isValidURL } from "@/shared/utils"
import { scoreRank } from "@/shared/utils/scoreRank"
import { FileX } from "lucide-react"

interface GameCardProps {
  title: string
  coverUrl: string
  score: number
}

export function GameCard({ title, coverUrl, score }: GameCardProps) {
  return (
    <div className="lg:w-[196px] col-span-1 rounded flex flex-col cursor-pointer">
      <div className="lg:w-[196px] h-[245px] lg:h-[265px] relative rounded border border-dark-str/10 overflow-hidden">
        {coverUrl && isValidURL(coverUrl) ? (
          <img
            src={coverUrl}
            alt=""
            className="lg:w-[196px] w-full h-[245px] lg:h-[265px] object-fill transition-all"
          />
        ) : (
          <div className="w-[196px] h-[265px] flex flex-col items-center justify-center bg-dark-low/10">
            <FileX className="w-[50px] h-[50px] text-dark-low" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 bg-dark-str/10 backdrop-blur-sm px-1 py-2 rounded-tr flex items-center justify-between">
          <div className="flex flex-col-reverse items-center mt-1 gap-[6px] z-50">
            {Array.from({ length: score }).map((_, index) => (
              <div key={index} className="relative">
                <div className="w-[10px] relative group h-[10px] rounded-full bg-white">
                  <div className="absolute border border-dark-low/30 whitespace-nowrap w-fit z-50 hidden group-hover:block left-full ml-2 -translate-y-1/2 top-1/2  bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                    {scoreRank[index]}
                  </div>
                  <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute left-full -translate-y-1/2 top-1/2 ml-1 border border-dark-low/30 bg-dark-str" />
                </div>
              </div>
            ))}
            {Array.from({ length: 10 - score }).map((_, index) => (
              <div key={index} className="relative">
                <div className="w-[10px] relative group h-[10px] rounded-full bg-white/40">
                  <div className="absolute border border-dark-low/30 whitespace-nowrap w-fit z-50 hidden group-hover:block left-full ml-2 -translate-y-1/2 top-1/2  bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                    {scoreRank[index + score]}
                  </div>
                  <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute left-full -translate-y-1/2 top-1/2 ml-1 border border-dark-low/30 bg-dark-str" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="text-sm font-semibold mt-[2px] line-clamp-2">
        {title}
      </span>
    </div>
  )
}
