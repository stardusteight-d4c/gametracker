import { useEffect, useState } from "react"
import { useDebounce } from "@/shared/hooks/useDebounce"

export function useSearch() {
  const [result, setResult] = useState<UserDTO[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [makeSearch, setMakeSearch] = useState<boolean>(false)
  const debouncedValue = useDebounce<string>(searchTerm, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (searchTerm) {
      ;(async () => {
        const parsedBody: ResponseDTO<PaginationDTO<UserDTO>> = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/list?username=${searchTerm}`,
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

  function clearSearch() {
    setSearchTerm("")
    setResult([])
  }

  function handleMakeSearch() {
    setMakeSearch(!makeSearch)
  }

  return {
    searchTerm,
    result,
    makeSearch,
    clearSearch,
    handleMakeSearch,
    handleChange,
  }
}
