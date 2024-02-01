import { CircleUserRound, Link } from "lucide-react"

export function SignInButton() {
  return (
    <Link href="/login" className="flex items-center gap-x-1">
      <button className="flex font-medium items-center h-[30px] px-3 gap-x-1 active:scale-95 transition-all text-light-str bg-gradient-to-t from-[#D5224E] to-[#FF003F] rounded">
        <CircleUserRound className="w-[20px] cursor-pointer -mt-[1px]" />
        Sign In
      </button>
    </Link>
  )
}
