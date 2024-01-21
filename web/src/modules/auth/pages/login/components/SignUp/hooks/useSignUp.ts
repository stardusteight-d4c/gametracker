import { useState } from "react"
import useSWRMutation from "swr/mutation"

export function useSignUp() {
  const { trigger, isMutating } = useSWRMutation("users/auth/signUp", registerUser)
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

  async function registerUser(url: string, { arg }: { arg: SignUpDTO }) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(arg),
    })
  }

  async function onSubmit() {
    const result = await trigger(formData)
    console.log("result", result)
  }

  return {
    handleChange,
    onSubmit,
    isMutating,
  }
}
