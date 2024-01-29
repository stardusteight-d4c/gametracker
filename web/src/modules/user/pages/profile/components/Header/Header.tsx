import { CircleUserRound } from "lucide-react"

interface HeaderProps {
  user: UserDTO
  allGamesList: PaginationDTO<GameDTO>
}

export function Header({ user, allGamesList }: HeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-11">
        Where reality and imagination merge, <br />
        <span className="leading-10 block text-transparent bg-clip-text bg-gradient-to-t from-[#D5224E] to-[#FF003F]">
          creating captivating worlds.
        </span>
      </h1>
      <div className="flex items-center flex-col-reverse lg:flex-row gap-y-8 justify-between mb-8">
        <div className="flex">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {allGamesList.totalItems}
            </span>
            <span className="text-sm">
              {allGamesList.totalItems === 0 && "No game"}
              {allGamesList.totalItems === 1 && "Game"}
              {allGamesList.totalItems >= 2 && "Games"}
            </span>
          </div>
          <div className="w-0 h-12 border-l border-l-dark-low/30 mx-9" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {new Date(user.createdAt).toLocaleDateString("en-US")}
            </span>
            <span className="text-sm">Member since</span>
          </div>
        </div>
        <div className="flex items-center gap-x-2 group cursor-pointer">
          <CircleUserRound size={32} />
          <span className="text-lg font-medium cursor-pointer">
            {user.username}
          </span>
        </div>
      </div>
    </>
  )
}
