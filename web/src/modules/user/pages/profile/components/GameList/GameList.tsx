"use client"

import { GameCard } from "@/shared/components/generics"
import { Frown } from "lucide-react"
import { useEffect, useState } from "react"

interface GameListProps {
  data: PaginationDTO<GameDTO>
  isLoading: boolean
  type: "all" | "playing" | "finished"
  viewAll: "all" | "playing" | "finished" | undefined
  onViewAll: (category: "all" | "playing" | "finished" | undefined) => void
}

export function GameList({
  data,
  type,
  viewAll,
  onViewAll,
  isLoading,
}: GameListProps) {
  function renderSkeletons() {
    return Array.from({
      length: 5,
    }).map((_, index) => <GameCard key={index} skeleton />)
  }

  function renderData() {
    if (data && !isLoading && data.items.length > 0) {
      return data.items.map((game) => (
        <GameCard
          key={game.id}
          coverUrl={game.coverUrl}
          title={game.title}
          score={game.score}
        />
      ))
    }
    if (data && !isLoading && data.items.length === 0) {
      return (
        <div className="text-2xl text-center w-[300px] h-[245px] lg:h-[265px] gap-y-2 flex items-center justify-center flex-col mx-auto font-medium col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5">
          There are no games here yet <Frown size={34} />
        </div>
      )
    }
  }

  function renderTitle() {
    if (type === "all") return "All Games"
    if (type === "playing") return "Playing Games"
    if (type === "finished") return "Finished Games"
  }

  function renderView() {
    if (data) {
      return (
        data.items.length >= 5 && (
          <span
            onClick={() => onViewAll(type)}
            className="text-base font-semibold cursor-pointer underline"
          >
            {viewAll === type ? "View less" : "View all"}
          </span>
        )
      )
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex lg:items-center flex-col lg:flex-row justify-between">
        <div className="flex items-center gap-x-4">
          <h3 className="text-lg font-semibold ">{renderTitle()}</h3>
        </div>
        {renderView()}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 w-full flex-wrap">
        {isLoading ? renderSkeletons() : renderData()}
      </div>
    </div>
  )
}
