import { toast } from "@/shared/components/ui/Toaster/components/Toast/hooks/use-toast"
import { useAuth } from "@/shared/hooks/useAuth"
import { getFormattedCurrentDate } from "@/shared/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

export function useNew() {
  const router = useRouter()
  const { getUserSession } = useAuth()
  const { trigger, isMutating } = useSWRMutation("games/publish", publishGame)
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [formData, setFormData] = useState<NewDTO>({
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

  function handleOpenDropdown() {
    setOpenDropdown(!openDropdown)
  }

  async function publishGame(
    url: string,
    { arg }: { arg: NewDTO }
  ): Promise<ResponseDTO<null>> {
    const parsedBody = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${url}`,
      {
        method: "POST",
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
    const result = await trigger(formData)
    const formattedCurrentData = getFormattedCurrentDate()

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
    handleSelectGameState,
    handleOpenDropdown,
    handleChange,
    handleScore,
  }

  return {
    formData,
    handlers,
    openDropdown,
    onSubmit,
    isMutating,
  }
}
