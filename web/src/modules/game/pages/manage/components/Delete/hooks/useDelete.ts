import { toast } from "@/shared/components/ui/Toaster/components/Toast/hooks/use-toast"
import { useAuth } from "@/shared/hooks/useAuth"
import { getFormattedCurrentDate, isValidURL } from "@/shared/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

export function useDelete() {
  const router = useRouter()
  const { getUserSession } = useAuth()
  const [selectedGame, setSelectedGame] = useState<GameDTO>()
  const { trigger, isMutating } = useSWRMutation(
    `games/delete/${selectedGame?.id}`,
    deleteGame
  )

  const [formData, setFormData] = useState<EditDTO>({
    id: "",
    coverUrl: "",
    title: "",
    status: "playing",
    note: "",
    score: 1,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }

  function handleSelectedGame(game: GameDTO) {
    setSelectedGame(game)
    setFormData({
      id: game.id,
      coverUrl: game.coverUrl,
      title: game.title,
      status: game.status,
      note: game.note,
      score: game.score,
    })
  }

  async function deleteGame(
    url: string,
    { arg }: { arg: EditDTO }
  ): Promise<ResponseDTO<null>> {
    const parsedBody = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${url}`,
      {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(arg),
      }
    ).then(async (res) => {
      const body = res.body ? await res.text() : null
      return body ? JSON.parse(body) : null
    })
    return parsedBody as ResponseDTO<null>
  }

  async function onSubmit() {
    const formattedCurrentData = getFormattedCurrentDate()

    const result = await trigger(formData)

    if (result.error || result.statusCode === 500) {
      toast({
        title: result.message,
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

    toast({
      title: result.message,
      description: formattedCurrentData,
      variant: "success",
    })

    const session = getUserSession()

    return router.replace(`/profile/${session?.username}`)
  }

  const handlers = {
    handleSelectedGame,
    handleChange,
  }

  return {
    formData,
    handlers,
    selectedGame,
    onSubmit,
    isMutating,
  }
}
