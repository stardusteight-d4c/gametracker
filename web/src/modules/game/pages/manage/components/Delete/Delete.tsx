'use client'

import { useDebounce } from "@/shared/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function Delete() {
  const [value, setValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  // Fetch API (optional)
  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue])

  return (
    <div>
      <div className="relative h-fit w-fit mt-4">
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
