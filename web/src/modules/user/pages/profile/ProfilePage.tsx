"use client"

import {
  ChevronDown,
  CircleUserRound,
  Frown,
  Instagram,
  Mail,
  Twitter,
} from "lucide-react"

import { Navbar } from "@/shared/components/ui/Navbar"
import { GameCard } from "@/shared/components/GameCard"
import useSWR from "swr"
import { fetcher } from "@/shared/libs"

interface ProfilePageProps {
  username: string
}

export function ProfilePage({ username }: ProfilePageProps) {
  const { data: user, isLoading: isLoadingUser } = useSWR<UserDTO>(
    `users/findBy?username=${username}`,
    fetcher
  )

  const { data: allGamesList, isLoading: isLoadingAllGames } = useSWR<
    PaginationDTO<GameDTO>
  >(`games/list?username=${username}&pageSize=5`, fetcher)

  const { data: playingGamesList, isLoading: isLoadingPlayingGames } = useSWR<
    PaginationDTO<GameDTO>
  >(`games/list?username=${username}&status=playing&pageSize=5`, fetcher)

  const { data: finishedGamesList, isLoading: isLoadingFinishedGames } = useSWR<
    PaginationDTO<GameDTO>
  >(`games/list?username=${username}&status=finished&pageSize=5`, fetcher)

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

  function renderSkeletons(listLegth: number) {
    if (allGamesList) {
      return Array.from({ length: 5 - listLegth }).map((_, index) => (
        <GameCard key={index} skeleton />
      ))
    }
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
              <span className="text-sm text-dark-low cursor-pointer font-normal -mb-[2px] flex items-center">
                Sort by post date <ChevronDown className="h-[18px]" />
              </span>
            </div>
            <h3 className="text-base font-semibold cursor-pointer underline">
              View all
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 w-full flex-wrap">
            {allGamesList.items.length > 0 ? (
              <>
                {allGamesList.items.map((game) => (
                  <GameCard
                    key={game.id}
                    coverUrl={game.coverUrl}
                    title={game.title}
                    score={game.score}
                  />
                ))}
                {allGamesList.items.length < 5 &&
                  renderSkeletons(allGamesList.items.length)}
              </>
            ) : (
              <div className="flex flex-col col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 text-2xl items-center justify-center w-full h-[210px] gap-y-1">
                There are no games <Frown size={32} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <div className="mb-6 flex lg:items-center flex-col lg:flex-row justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg font-semibold">Current playing</h3>
              <span className="text-sm text-dark-low cursor-pointer font-normal -mb-[2px] flex items-center">
                Sort by post date <ChevronDown className="h-[18px]" />
              </span>
            </div>
            <h3 className="text-base font-semibold cursor-pointer underline">
              View all
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 flex-wrap">
            {playingGamesList.items.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className="flex flex-col col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 text-2xl items-center justify-center w-full h-[210px] gap-y-1">
                There are no games <Frown size={32} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <div className="mb-6 flex lg:items-center flex-col lg:flex-row justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg font-semibold">Finished games</h3>
              <span className="text-sm text-dark-low cursor-pointer font-normal -mb-[2px] flex items-center">
                Sort by post date <ChevronDown className="h-[18px]" />
              </span>
            </div>
            <h3 className="text-base font-semibold cursor-pointer underline">
              View all
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 flex-wrap">
            {finishedGamesList.items.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className="flex flex-col col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 text-2xl items-center justify-center w-full h-[210px] gap-y-1">
                There are no games <Frown size={32} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[4px] bg-dark-str" />
    </main>
  )
}
