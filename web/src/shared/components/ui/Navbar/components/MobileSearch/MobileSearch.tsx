import Link from "next/link"
import ReactDOM from "react-dom"
import { Search, X } from "lucide-react"

import { useSearch } from "../../hooks"

export function MobileSearch() {
  const { searchTerm, clearSearch, result, handleChange, handleMakeSearch } =
    useSearch()

  return ReactDOM.createPortal(
    <div className="w-screen h-screen fixed inset-0 text-white bg-light-str/10 backdrop-blur-sm">
      <div className="fixed top-[100px] left-1/2 -translate-x-1/2">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for a user"
            className="bg-dark-str/90 px-8 py-[2px] outline-none text-light-str placeholder:text-light-str/50 w-[300px] rounded"
          />
          <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-light-str/50" />
          {result.length > 0 && searchTerm && (
            <>
              <div className="bg-white absolute inset-x-0 top-full mt-1 text-dark-str border border-dark-mid/10 rounded">
                {result?.map((user) => (
                  <Link
                    onClick={handleMakeSearch}
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
      </div>
    </div>,
    document.body
  )
}
