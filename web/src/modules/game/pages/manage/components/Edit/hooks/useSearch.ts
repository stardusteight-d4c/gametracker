import { useEffect, useState } from "react"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { useAuth } from "@/shared/hooks/useAuth"

export function useSearch() {
  const { getUserSession } = useAuth()
  const [result, setResult] = useState<UserDTO[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedValue = useDebounce<string>(searchTerm, 500)

  const session = getUserSession()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (searchTerm) {
      ;(async () => {
        const parsedBody: ResponseDTO<PaginationDTO<UserDTO>> = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/games/list?userId=${
            session!.id
          }&sessionOwner=true`,
          {
            method: "GET",
          }
        ).then(async (res) => {
          const body = res.body ? await res.text() : null
          return body ? JSON.parse(body) : null
        })
        setResult(parsedBody.data.items)
      })()
    }
  }, [debouncedValue])

  return {
    searchTerm,
    handleChange,
    result,
  }
}
