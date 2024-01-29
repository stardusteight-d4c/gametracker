import { fetcher } from "@/shared/libs"
import { useState } from "react"
import useSWR from "swr"

export function useProfilePage({ username }: { username: string }) {
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

  function handleViewAll(category: "all" | "playing" | "finished" | undefined) {
    if (category === viewAll) {
      setViewAll(undefined)
      return
    }
    setViewAll(category)
  }

  return {
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
  }
}
