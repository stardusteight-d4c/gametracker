"use client"

import { Search, X } from "lucide-react"

import { GameCard } from "@/shared/components/generics"

import { useSearch, useDelete } from "./hooks"

export function Delete() {
  const { formData, selectedGame, handlers, onSubmit, isMutating } = useDelete()
  const { handleChange, searchTerm, clearSearch, result } = useSearch()

  return (
    <div>
      {!selectedGame && (
        <div className="relative h-fit md:w-fit mt-8 w-full">
          <input
            type="text"
            placeholder="Search for a game"
            value={searchTerm}
            onChange={handleChange}
            className="px-8 w-full py-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
          />
          <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-dark-low" />
          {result.length > 0 && searchTerm && (
            <>
              <div className="bg-white absolute inset-x-0 top-full mt-1 text-dark-str border border-dark-mid/10 rounded">
                {result?.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handlers.handleSelectedGame(game)}
                    className="hover:bg-light-str block px-2 py-1 cursor-pointer"
                  >
                    {game.title}
                  </div>
                ))}
              </div>
              <X
                onClick={clearSearch}
                className="absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 text-dark-low"
              />
            </>
          )}
        </div>
      )}
      {selectedGame && (
        <div className="flex flex-col mt-8 md:mt-4 items-center justify-center">
          <div className="max-w-[200px]">
            <GameCard
              coverUrl={formData.coverUrl}
              title={formData.title}
              score={formData.score}
            />
          </div>
          <button
            disabled={isMutating}
            onClick={onSubmit}
            className="flex w-full mt-4 font-semibold items-center justify-center h-[29px] p-5 gap-x-1 active:scale-95 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded"
          >
            {isMutating ? "Loading..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  )
}
