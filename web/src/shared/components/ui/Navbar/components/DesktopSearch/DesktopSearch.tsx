import Link from "next/link"
import { Search, X } from "lucide-react"

import { useSearch } from "../../hooks"

export function DesktopSearch() {
  const { handleChange, searchTerm, clearSearch, result } = useSearch()

  return (
    <div className="hidden md:block relative z-[1000] h-fit w-fit ml-10">
      <input
        type="text"
        placeholder="Search for a user"
        value={searchTerm}
        onChange={handleChange}
        className="bg-dark-low/50 px-8 py-[2px] outline-none text-light-str placeholder:text-light-str/50 w-[500px] rounded"
      />
      <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-light-str/50" />
      {result.length > 0 && searchTerm && (
        <>
          <div className="bg-white absolute inset-x-0 top-full mt-1 text-dark-str border border-dark-mid/10 rounded">
            {result?.map((user) => (
              <Link
                href={`/profile/${user.username}`}
                className="hover:bg-light-str block px-2 py-1 cursor-pointer"
              >
                {user.username}
              </Link>
            ))}
          </div>
          <X
            onClick={clearSearch}
            className="absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 text-light-str/50"
          />
        </>
      )}
    </div>
  )
}
