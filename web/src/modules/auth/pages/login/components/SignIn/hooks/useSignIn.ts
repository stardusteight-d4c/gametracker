import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWRMutation from "swr/mutation"

import { useToast, useAuth } from "@/shared/hooks"
import { getFormattedCurrentDate, isEmail, setCookie } from "@/shared/utils"

export function useSignIn() {
  const router = useRouter()
  const { getUserSession } = useAuth()
  const { toast } = useToast()
  const { trigger, isMutating } = useSWRMutation("users/auth/signIn", signIn)
  const [formData, setFormData] = useState<SignInDTO>({
    type: "username",
    access: "",
    password: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }

  async function signIn(
    url: string,
    { arg }: { arg: SignInDTO }
  ): Promise<ResponseDTO<{ accessToken: string; refreshToken: string }>> {
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
    return parsedBody as ResponseDTO<{
      accessToken: string
      refreshToken: string
    }>
  }

  async function onSubmit() {
    const formattedCurrentData = getFormattedCurrentDate()
    let result: ResponseDTO<{ accessToken: string; refreshToken: string }>

    if (isEmail(formData.access)) {
      result = await trigger({
        ...formData,
        type: "email",
      })
    } else {
      result = await trigger({
        ...formData,
        type: "username",
      })
    }

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

    // locally the cookie is being set, but in production it is not, and the header comes correctly
    setCookie("accessToken", result.data.accessToken, 1)
    setCookie("refreshToken", result.data.refreshToken, 30)

    const session = getUserSession()
    return router.replace(`/profile/${session?.username}`)
  }

  return {
    handleChange,
    onSubmit,
    isMutating,
  }
}
