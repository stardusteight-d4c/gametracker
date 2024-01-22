import { useState } from "react"
import useSWRMutation from "swr/mutation"

import { useToast } from "@/shared/hooks/useToast"
import { getFormattedCurrentDate } from "@/shared/utils/getFormattedCurrentDate"
import { redirect } from "next/navigation"

export function useSignUp() {
  const { toast } = useToast()
  const { trigger, isMutating, error } = useSWRMutation(
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
    const result = await trigger(formData)

    if (result.error) {
      toast({
        title: result.message,
        description: getFormattedCurrentDate(),
        variant: "destructive",
      })
      return
    }

    toast({
      title: result.message,
      description: getFormattedCurrentDate(),
      variant: "success",
    })

    // tratar erros com toasters caso houver
    // logar o usuário e criar a sessão dele, fazer estado para pegar a sessão do usuário
  }

  return {
    handleChange,
    onSubmit,
    isMutating,
  }
}
