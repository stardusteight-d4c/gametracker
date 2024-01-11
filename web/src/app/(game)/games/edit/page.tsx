"use client"

import { useState } from "react"

import { Navbar } from "@/shared/components/organisms/Navbar"
import { scoreRank } from "@/shared/utils/scoreRank"
import { ChevronDown } from "lucide-react"

export default function Game() {
  const [score, setScore] = useState<number>(1)
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [note, setNote] = useState("")
  const [gameState, setGameState] = useState<
    "Current playing" | "Finished game"
  >("Current playing")

  function handleSelectGameState() {
    if (gameState === "Current playing") setGameState("Finished game")
    if (gameState === "Finished game") setGameState("Current playing")
  }

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = event.target.value
    setNote(updatedNote)
  }

  return (
    <main className="w-screen min-h-screen">
      <div className="flex flex-col h-screen items-center justify-center">
        <Navbar />
        <div className="flex flex-col border border-dark-mid/10 mt-[61px] rounded p-7">
          <div className="flex flex-col gap-y-4">
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
                className="w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="gameTitle"
                className="text-sm text-dark-low cursor-pointer"
              >
                Game Title
              </label>
              <input
                type="text"
                id="gameTitle"
                placeholder="Enter a game title"
                autoComplete="off"
                className="w-[300px] p-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <span
                onClick={() => setOpenDropdown(!openDropdown)}
                className="text-sm w-fit relative text-dark-low cursor-pointer font-normal -mb-[2px] flex items-center"
              >
                {gameState}{" "}
                <ChevronDown
                  className={`h-[18px] transition-all ${
                    openDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
                {openDropdown && (
                  <div
                    onClick={handleSelectGameState}
                    className="absolute whitespace-nowrap top-full mt-1 shadow-md shadow-black/10 rounded px-3 py-2 bg-dark-str text-light-str border border-dark-mid/10"
                  >
                    {gameState === "Current playing"
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
                value={note}
                onChange={handleNoteChange}
                className="w-[300px] p-2 resize-none h-[100px] rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
              />
              <span
                className={`text-sm cursor-pointer mt-[2px] ${
                  note.length === 255 ? "text-[#FF003F]" : "text-dark-low "
                }`}
              >
                {note.length}/255
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
                    onClick={() => setScore(index + 1)}
                    key={index}
                    className="relative cursor-pointer"
                  >
                    <div
                      className={`w-[18px] group h-[18px] rounded ${
                        index + 1 <= score
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
            <button className="flex mt-2 font-semibold items-center justify-center h-[29px] p-5 gap-x-1 active:scale-95 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
              Publish
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
