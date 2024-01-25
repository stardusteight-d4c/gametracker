"use client"

import {
  ChevronDown,
  CircleUserRound,
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
  const { data: gamesList, isLoading: isLoadingGames } = useSWR<
    PaginationDTO<GameDTO>
  >(`games/list?username=${username}&pageSize=5`, fetcher)

  if (!user || isLoadingUser || !gamesList || isLoadingGames) {
    return null
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
                {gamesList.totalItems}
              </span>
              <span className="text-sm">
                {gamesList.totalItems === 0 && "No game"}
                {gamesList.totalItems === 1 && "Game"}
                {gamesList.totalItems >= 2 && "Games"}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] gap-y-7 flex-wrap">
            {gamesList.items.map((game) => (
              <GameCard
                key={game.id}
                coverUrl={game.coverUrl}
                title={game.title}
                score={game.score}
              />
            ))}
            {gamesList.items.length < 5 && (
              <>
                {Array.from({ length: 5 - gamesList.items.length }).map(
                  (_, index) => (
                    <GameCard key={index} coverUrl="" title="" score={0} />
                  )
                )}
              </>
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
            {/* <GameCard
              coverUrl="https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg"
              title="The Legend of Zelda: Breath of the Wild"
            />
            <GameCard
              coverUrl="https://cdn.awsli.com.br/2500x2500/1610/1610163/produto/216584583/poster-the-legend-of-zelda-tears-of-the-kingdom-a-5d718770.jpg"
              title="The Legend of Zelda: Tears of the Kingdom"
            />
            <GameCard
              coverUrl="https://www.gameinformer.com/sites/default/files/styles/product_box_art/public/2022/09/14/51bb7448/persona5royal.jpg"
              title="Persona 5 Royal"
            />
            <GameCard
              coverUrl="https://cdkeyprices.uk/images/games/5605266/pokemon-sword-desktop-logo-all.jpg"
              title="Pokémon Sword"
            />
            <GameCard
              coverUrl="https://upload.wikimedia.org/wikipedia/en/b/bd/Shin_Megami_Tensei_V.png"
              title="Shin Megami Tensei V"
            /> */}
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
            {/* <GameCard
              coverUrl="https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg"
              title="The Legend of Zelda: Breath of the Wild"
            />
            <GameCard
              coverUrl="https://cdn.awsli.com.br/2500x2500/1610/1610163/produto/216584583/poster-the-legend-of-zelda-tears-of-the-kingdom-a-5d718770.jpg"
              title="The Legend of Zelda: Tears of the Kingdom"
            />
            <GameCard
              coverUrl="https://www.gameinformer.com/sites/default/files/styles/product_box_art/public/2022/09/14/51bb7448/persona5royal.jpg"
              title="Persona 5 Royal"
            />
            <GameCard
              coverUrl="https://cdkeyprices.uk/images/games/5605266/pokemon-sword-desktop-logo-all.jpg"
              title="Pokémon Sword"
            />
            <GameCard
              coverUrl="https://upload.wikimedia.org/wikipedia/en/b/bd/Shin_Megami_Tensei_V.png"
              title="Shin Megami Tensei V"
            /> */}
          </div>
        </div>
      </div>
      <div className="w-full h-[4px] bg-dark-str" />
    </main>
  )
}
