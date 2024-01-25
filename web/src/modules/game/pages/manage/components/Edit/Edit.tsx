"use client"

import { Search } from "lucide-react"
import { useSearch } from "./hooks/useSearch"

export function Edit() {
  const { handleChange, searchTerm, result } = useSearch()
  
  return (
    <div>
      <div className="relative h-fit md:w-fit mt-8 w-full">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search for a game"
          className="pl-8 pr-3 w-[300px] py-2 rounded outline-none border border-dark-mid/10 focus:border-[#FF003F]"
        />
        <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-dark-low" />
      </div>
    </div>
  )
}
