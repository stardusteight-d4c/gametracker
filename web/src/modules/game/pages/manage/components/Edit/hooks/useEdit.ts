import { toast } from "@/shared/components/ui/Toaster/components/Toast/hooks/use-toast"
import { useAuth } from "@/shared/hooks/useAuth"
import { getFormattedCurrentDate, isValidURL } from "@/shared/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

export function useEdit() {
  const router = useRouter()
  const { getUserSession } = useAuth()
  const { trigger, isMutating } = useSWRMutation("games/edit", editGame)
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [selectedGame, setSelectedGame] = useState<GameDTO>()

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

  function handleScore(value: number) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      score: value,
    }))
  }

  function handleSelectGameState() {
    if (formData.status === "playing")
      setFormData((prevFormData) => ({
        ...prevFormData,
        status: "finished",
      }))
    if (formData.status === "finished")
      setFormData((prevFormData) => ({
        ...prevFormData,
        status: "playing",
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

  function handleOpenDropdown() {
    setOpenDropdown(!openDropdown)
  }

  async function editGame(
    url: string,
    { arg }: { arg: EditDTO }
  ): Promise<ResponseDTO<null>> {
    const parsedBody = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${url}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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

    if (!isValidURL(formData.coverUrl.trim())) {
      toast({
        title: "Enter a valid url",
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

    if (!formData.title.trim()) {
      toast({
        title: "The title field cannot be empty",
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

    if (formData.note.trim().length <= 4) {
      toast({
        title: "The note field cannot be empty",
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

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
    handleSelectGameState,
    handleOpenDropdown,
    handleChange,
    handleScore,
  }

  return {
    formData,
    handlers,
    selectedGame,
    openDropdown,
    onSubmit,
    isMutating,
  }
}
