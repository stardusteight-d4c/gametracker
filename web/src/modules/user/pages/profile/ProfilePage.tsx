"use client"

import { GameList, Header } from "./components"
import { useProfilePage } from "./hooks"

import { Navbar } from "@/shared/components/ui"

interface ProfilePageProps {
  username: string
}

export function ProfilePage({ username }: ProfilePageProps) {
  const {
    user,
    viewAll,
    allGamesList,
    playingGamesList,
    finishedGamesList,
    handleViewAll,
    isLoadingUser,
    isLoadingAllGames,
    isLoadingPlayingGames,
    isLoadingFinishedGames,
  } = useProfilePage({ username })

  if (
    !user ||
    !allGamesList ||
    !playingGamesList ||
    !finishedGamesList ||
    isLoadingUser ||
    isLoadingAllGames ||
    isLoadingPlayingGames ||
    isLoadingFinishedGames
  ) {
    return null
  }

  return (
    <main className="bg-white min-h-[100vh] max-w-screen text-dark-str">
      <Navbar />
      <div className="px-3 lg:px-0 flex flex-col max-w-[1022px] mt-[50px] mb-[100px] w-full mx-auto pt-11">
        <Header user={user} allGamesList={allGamesList} />
        <div className="flex flex-col gap-y-12">
          <GameList
            data={allGamesList}
            type="all"
            viewAll={viewAll}
            onViewAll={handleViewAll}
          />
          <GameList
            data={playingGamesList}
            type="playing"
            viewAll={viewAll}
            onViewAll={handleViewAll}
          />
          <GameList
            data={finishedGamesList}
            type="finished"
            viewAll={viewAll}
            onViewAll={handleViewAll}
          />
        </div>
      </div>
      <div className="w-full h-[4px] bg-dark-str" />
    </main>
  )
}
