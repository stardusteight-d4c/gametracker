export function GameCard() {
  return (
    <div className="w-[196px] col-span-1 flex flex-col cursor-pointer hover:scale-105 transition-all !duration-75">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/b/b0/Persona_5_cover_art.jpg"
        alt=""
        className="w-[196px] h-[265px] rounded object-cover border border-dark-str/50"
      />
      <span className="text-sm font-semibold mt-[2px] line-clamp-2">
        The Legend of Zelda: Breath of the Wild
      </span>
    </div>
  )
}
