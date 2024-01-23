import { useRouter } from "next/navigation"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

import { useToast } from "@/shared/hooks/useToast"
import { getFormattedCurrentDate, isUsernameValid } from "@/shared/utils"
import { useAuth } from "@/shared/hooks/useAuth"
import { isEmail } from "@/shared/utils/isEmail"

export function useSignUp() {
  const router = useRouter()
  const { getUserSession } = useAuth()
  const { toast } = useToast()
  const { trigger, isMutating } = useSWRMutation(
    "users/auth/signUp",
    registerUser
  )
  const [formData, setFormData] = useState<SignUpDTO>({
    username: "",
    email: "",
    password: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }

  async function registerUser(
    url: string,
    { arg }: { arg: SignUpDTO }
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

    if (formData.username.trim().length <= 2) {
      toast({
        title: "The username must have at least 3 characters",
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

    if (!isUsernameValid(formData.username.trim())) {
      toast({
        title: "The username cannot contain spaces or special characters",
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

    if (!isEmail(formData.email)) {
      toast({
        title: "Enter a valid email address",
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

    if (formData.password.trim().length <= 7) {
      toast({
        title: "The password must have at least 8 characters",
        description: formattedCurrentData,
        variant: "destructive",
      })
      return
    }

    const result = await trigger({
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    })

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
