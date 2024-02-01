import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface BackProps {
  show: "logo" | "back"
}

export function Main({ show }: BackProps) {
  return show === "back" ? (
    <Link
      href="/"
      className="flex items-center gap-x-1 text-light-str cursor-pointer"
    >
      <ChevronLeft />
      Back
    </Link>
  ) : (
    <Link href="/" className="flex cursor-pointer items-center gap-x-1">
      <img src="/assets/logo.svg" alt="" className="h-[28px]" />
      <span className="text-white text-lg">Trackx</span>
    </Link>
  )
}
