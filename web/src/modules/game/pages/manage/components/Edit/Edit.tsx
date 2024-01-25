"use client"

import { ChevronDown, Search, X } from "lucide-react"
import { useSearch } from "./hooks/useSearch"
import { useState } from "react"
import { useEdit } from "./hooks/useEdit"
import { scoreRank } from "@/shared/utils"

export function Edit() {
  const {
    formData,
    openDropdown,
    selectedGame,
    handlers,
    onSubmit,
    isMutating,
  } = useEdit()
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
            className="pl-8 pr-3 w-[300px] py-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
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
        <div className="flex flex-col gap-y-4 mt-4 md:w-fit w-full">
          <div className="flex flex-col">
            <label
              htmlFor="coverUrl"
              className="text-sm text-dark-low cursor-pointer"
            >
              Image URL
            </label>
            <input
              type="text"
              id="coverUrl"
              placeholder="Enter a cover url"
              autoComplete="off"
              value={formData.coverUrl}
              onChange={handlers.handleChange}
              className="lg:w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm text-dark-low cursor-pointer"
            >
              Game Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter a game title"
              autoComplete="off"
              value={formData.title}
              onChange={handlers.handleChange}
              className="lg:w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <span
              onClick={handlers.handleOpenDropdown}
              className="text-sm w-fit relative text-dark-low cursor-pointer font-normal -mb-[2px] flex items-center"
            >
              {formData.status === "playing"
                ? "Current playing"
                : "Finished game"}
              <ChevronDown
                className={`h-[18px] transition-all ${
                  openDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
              {openDropdown && (
                <div
                  onClick={handlers.handleSelectGameState}
                  className="absolute whitespace-nowrap top-full mt-1 shadow-md shadow-black/10 rounded px-3 py-2 bg-dark-str text-light-str border border-dark-mid/10"
                >
                  {formData.status === "playing"
                    ? "Finished game"
                    : "Current playing"}
                </div>
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="note"
              className="text-sm text-dark-low cursor-pointer"
            >
              Note
            </label>
            <textarea
              id="note"
              placeholder="Enter a note"
              autoComplete="off"
              maxLength={255}
              value={formData.note}
              onChange={handlers.handleChange}
              className="lg:w-[300px] p-2 resize-none h-[100px] rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
            />
            <span
              className={`text-sm cursor-pointer mt-[2px] ${
                formData.note.length === 255
                  ? "text-[#FF003F]"
                  : "text-dark-low "
              }`}
            >
              {formData.note.length}/255
            </span>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="score"
              className="text-sm text-dark-low cursor-pointer"
            >
              Score
            </label>
            <div className="flex items-center justify-between z-50 transition-all">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  onClick={() => handlers.handleScore(index + 1)}
                  key={index}
                  className="relative cursor-pointer"
                >
                  <div
                    className={`w-[18px] group h-[18px] rounded ${
                      index + 1 <= formData.score
                        ? "bg-gradient-to-t from-[#D5224E] to-[#FF003F]"
                        : "bg-dark-mid"
                    } `}
                  >
                    <div className="absolute border border-dark-low/30 z-50 whitespace-nowrap hidden group-hover:block -top-9 left-1/2 -translate-x-1/2 bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                      {scoreRank[index]}
                    </div>
                    <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute -top-[13px] border border-dark-low/30 left-1/2 -translate-x-1/2 bg-dark-str" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="flex mt-2 font-semibold items-center justify-center h-[29px] p-5 gap-x-1 active:scale-95 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded"
          >
            {isMutating ? "Loading..." : "Edit"}
          </button>
        </div>
      )}
    </div>
  )
}
