import { GameCard } from "@/shared/components/generics"

interface GameListProps {
  data: PaginationDTO<GameDTO>
  type: "all" | "playing" | "finished"
  viewAll: "all" | "playing" | "finished" | undefined
  onViewAll: (category: "all" | "playing" | "finished" | undefined) => void
}

export function GameList({ data, type, viewAll, onViewAll }: GameListProps) {
  function isMultipleOfFive(number: number) {
    if (number === 0) {
      return false
    }
    return number % 5 === 0
  }

  function countQuantityOfMultipleOfFive(number: number) {
    let count = 0
    for (let acc = 0; acc <= number; acc++) {
      if (acc % 5 === 0) {
        count++
      }
    }
    return count
  }

  function renderSkeletons(listLegth: number) {
    if (data) {
      return Array.from({
        length:
          listLegth === 0
            ? 5
            : countQuantityOfMultipleOfFive(listLegth) * 5 - listLegth,
      }).map((_, index) => <GameCard key={index} skeleton />)
    }
  }

  function renderTitle() {
    if (type === "all") return "All Games"
    if (type === "playing") return "Playing Games"
    if (type === "finished") return "Finished Games"
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex lg:items-center flex-col lg:flex-row justify-between">
        <div className="flex items-center gap-x-4">
          <h3 className="text-lg font-semibold ">{renderTitle()}</h3>
        </div>
        {data.items.length >= 5 && (
          <span
            onClick={() => onViewAll(type)}
            className="text-base font-semibold cursor-pointer underline"
          >
            {viewAll === type ? "View less" : "View all"}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 w-full flex-wrap">
        {data.items.map((game) => (
          <GameCard
            key={game.id}
            coverUrl={game.coverUrl}
            title={game.title}
            score={game.score}
          />
        ))}
        {!isMultipleOfFive(data.items.length) &&
          renderSkeletons(data.items.length)}
      </div>
    </div>
  )
}
