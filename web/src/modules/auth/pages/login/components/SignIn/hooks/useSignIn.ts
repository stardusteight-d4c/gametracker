import { useRouter } from "next/navigation"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

import { useToast } from "@/shared/hooks/useToast"
import { getFormattedCurrentDate } from "@/shared/utils"
import { useAuth } from "@/shared/hooks/useAuth"
import { isEmail } from "@/shared/utils/isEmail"

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
    const formattedCurrentData = getFormattedCurrentDate()
    let result: ResponseDTO<null>

    if (isEmail(formData.access)) {
      result = await trigger({ ...formData, type: "email" })
    } else {
      result = await trigger({ ...formData, type: "username" })
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

    const session = getUserSession()

    return router.replace(`/profile/${session?.username}`)
  }

  return {
    handleChange,
    onSubmit,
    isMutating,
  }
}
