import { Navbar } from "@/shared/components/ui"
import Icon from "./components/Icon"

export function UserNotFound() {
  return (
    <main className="bg-white h-screen max-w-screen text-dark-str">
      <Navbar />
      <div className="flex items-center h-screen justify-center flex-col pt-4">
        <Icon />
        <h1 className="font-bold text-4xl mt-12">User Not Found!</h1>
      </div>
    </main>
  )
}
