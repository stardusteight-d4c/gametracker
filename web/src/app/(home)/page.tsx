import { GameCard } from "@/modules/components/GameCard/GameCard"

export default function Home() {
  return (
    <main className="bg-white min-h-[100vh] w-screen text-dark-str">
      <div className="w-full bg-dark-str z-[900] fixed top-0">
        <div className="max-w-[1022px] mx-auto py-4">
          <div className="flex items-center gap-x-1">
            <img src="/assets/logo.svg" alt="" className="h-[28px]" />
            <span className="text-white text-lg">Stardusteight</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[1022px] mt-[50px] mb-[100px] w-full mx-auto pt-11">
        <h1 className="text-3xl font-semibold mb-11">
          Personalized Stats and Insights Powered by Billions of Matches
        </h1>
        <div className="flex mb-8">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">15+</span>
            <span className="text-sm">Games</span>
          </div>
          <div className="w-0 h-12 border-l border-l-light-str/20 mx-9" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">500+</span>
            <span className="text-sm">Hours</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-6">All Games</h3>
          <div className="grid grid-cols-5 gap-x-[10px] gap-y-7 flex-wrap">
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
          </div>
        </div>
      </div>
      <div className="w-full h-[4px] bg-dark-str" />
    </main>
  )
}
