"use client"

import { CircleUserRound } from "lucide-react"
import useSWR from "swr"

import { Navbar } from "@/shared/components/ui/Navbar"
import { GameCard } from "@/shared/components/GameCard"
import { fetcher } from "@/shared/libs"
import { useState } from "react"

interface ProfilePageProps {
  username: string
}

export function ProfilePage({ username }: ProfilePageProps) {
  const [viewAll, setViewAll] = useState<
    "all" | "playing" | "finished" | undefined
  >(undefined)

  const { data: user, isLoading: isLoadingUser } = useSWR<UserDTO>(
    `users/findBy?username=${username}`,
    fetcher
  )

  const { data: allGamesList, isLoading: isLoadingAllGames } = useSWR<
    PaginationDTO<GameDTO>
  >(
    `games/list?username=${username}${
      viewAll === "all" ? "&currentPage=1" : "&currentPage=1&pageSize=5"
    }`,
    fetcher
  )

  const { data: playingGamesList, isLoading: isLoadingPlayingGames } = useSWR<
    PaginationDTO<GameDTO>
  >(
    `games/list?username=${username}&status=playing${
      viewAll === "playing" ? "&currentPage=1" : "&currentPage=1&pageSize=5"
    }`,
    fetcher
  )

  const { data: finishedGamesList, isLoading: isLoadingFinishedGames } = useSWR<
    PaginationDTO<GameDTO>
  >(
    `games/list?username=${username}&status=finished${
      viewAll === "finished" ? "&currentPage=1" : "&currentPage=1&pageSize=5"
    }`,
    fetcher
  )

  if (
    !user ||
    isLoadingUser ||
    !allGamesList ||
    !playingGamesList ||
    !finishedGamesList ||
    isLoadingAllGames ||
    isLoadingPlayingGames ||
    isLoadingFinishedGames
  ) {
    return null
  }

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
    if (allGamesList) {
      return Array.from({
        length:
          listLegth === 0
            ? 5
            : countQuantityOfMultipleOfFive(listLegth) * 5 - listLegth,
      }).map((_, index) => <GameCard key={index} skeleton />)
    }
  }

  function handleViewAll(category: "all" | "playing" | "finished" | undefined) {
    if (category === viewAll) {
      setViewAll(undefined)
      return
    }
    setViewAll(category)
  }

  return (
    <main className="bg-white min-h-[100vh] max-w-screen text-dark-str">
      <Navbar />
      <div className="px-3 lg:px-0 flex flex-col max-w-[1022px] mt-[50px] mb-[100px] w-full mx-auto pt-11">
        <h1 className="text-3xl font-semibold mb-11">
          Where reality and imagination merge, <br />
          <span className="leading-10 block text-transparent bg-clip-text bg-gradient-to-t from-[#D5224E] to-[#FF003F]">
            creating captivating worlds.
          </span>
        </h1>
        <div className="flex items-center flex-col-reverse lg:flex-row gap-y-8 justify-between mb-8">
          <div className="flex">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {allGamesList.totalItems}
              </span>
              <span className="text-sm">
                {allGamesList.totalItems === 0 && "No game"}
                {allGamesList.totalItems === 1 && "Game"}
                {allGamesList.totalItems >= 2 && "Games"}
              </span>
            </div>
            <div className="w-0 h-12 border-l border-l-dark-low/30 mx-9" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {new Date(user.createdAt).toLocaleDateString("en-US")}
              </span>
              <span className="text-sm">Member since</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2 group cursor-pointer">
            <CircleUserRound size={32} />
            <span className="text-lg font-medium cursor-pointer">
              {user.username}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-6 flex lg:items-center flex-col lg:flex-row justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg font-semibold ">All games</h3>
            </div>
            {allGamesList.items.length >= 5 && (
              <span
                onClick={() => handleViewAll("all")}
                className="text-base font-semibold cursor-pointer underline"
              >
                {viewAll === "all" ? "View less" : "View all"}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 w-full flex-wrap">
            {allGamesList.items.map((game) => (
              <GameCard
                key={game.id}
                coverUrl={game.coverUrl}
                title={game.title}
                score={game.score}
              />
            ))}
            {!isMultipleOfFive(allGamesList.items.length) &&
              renderSkeletons(allGamesList.items.length)}
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <div className="mb-6 flex lg:items-center flex-col lg:flex-row justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg font-semibold">Current playing</h3>
            </div>
            {playingGamesList.items.length >= 5 && (
              <span
                onClick={() => handleViewAll("playing")}
                className="text-base font-semibold cursor-pointer underline"
              >
                {viewAll === "playing" ? "View less" : "View all"}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 flex-wrap">
            {playingGamesList.items.map((game) => (
              <GameCard
                key={game.id}
                coverUrl={game.coverUrl}
                title={game.title}
                score={game.score}
              />
            ))}
            {playingGamesList.items.length < 5 &&
              renderSkeletons(playingGamesList.items.length)}
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <div className="mb-6 flex lg:items-center flex-col lg:flex-row justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg font-semibold">Finished games</h3>
            </div>
            {finishedGamesList.items.length >= 5 && (
              <div
                onClick={() => handleViewAll("finished")}
                className="text-base font-semibold cursor-pointer underline"
              >
                {viewAll === "finished" ? "View less" : "View all"}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 flex-wrap">
            {finishedGamesList.items.map((game) => (
              <GameCard
                key={game.id}
                coverUrl={game.coverUrl}
                title={game.title}
                score={game.score}
              />
            ))}
            {finishedGamesList.items.length < 5 &&
              renderSkeletons(finishedGamesList.items.length)}
          </div>
        </div>
      </div>
      <div className="w-full h-[4px] bg-dark-str" />
    </main>
  )
}
