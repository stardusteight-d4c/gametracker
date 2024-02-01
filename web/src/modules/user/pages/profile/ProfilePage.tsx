"use client"

import { GameList, Header } from "./components"
import { useProfilePage } from "./hooks"

import { Navbar } from "@/shared/components/ui"
import { UserNotFound } from "@/shared/components/not-found"
import { HeaderSkeleton } from "./components/Header/Skeleton"
import { useEffect, useState } from "react"

interface ProfilePageProps {
  username: string
}

export function ProfilePage({ username }: ProfilePageProps) {
  const [mounted, setMounted] = useState<boolean>(false)
  const {
    user,
    viewAll,
    allGamesList,
    playingGamesList,
    finishedGamesList,
    handleViewAll,
    isLoading,
  } = useProfilePage({ username })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!user && !isLoading) {
    return <UserNotFound />
  }

  return (
    <main className="bg-white min-h-[100vh] max-w-screen text-dark-str">
      <Navbar />
      <div className="px-3 lg:px-0 flex flex-col max-w-[1022px] mt-[50px] mb-[100px] w-full mx-auto pt-11">
        {!user || isLoading ? (
          <HeaderSkeleton />
        ) : (
          <Header user={user} allGamesList={allGamesList!} />
        )}
        <div className="flex flex-col gap-y-12">
          <GameList
            isLoading={isLoading}
            data={allGamesList!}
            type="all"
            viewAll={viewAll}
            onViewAll={handleViewAll}
          />
          <GameList
            isLoading={isLoading}
            data={playingGamesList!}
            type="playing"
            viewAll={viewAll}
            onViewAll={handleViewAll}
          />
          <GameList
            isLoading={isLoading}
            data={finishedGamesList!}
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
