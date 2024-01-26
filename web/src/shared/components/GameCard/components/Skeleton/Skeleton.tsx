export function Skeleton() {
  return (
    <div className="lg:w-[196px] col-span-1 rounded flex flex-col pointer-events-none select-none opacity-70">
      <div className="lg:w-[196px] h-[245px] lg:h-[265px] relative rounded border border-dark-str/10 overflow-hidden">
        <div className="w-[196px] h-[265px] flex flex-col items-center justify-center bg-dark-low/10" />
        <div className="absolute bottom-0 left-0 bg-dark-str/10 px-1 py-2 rounded-tr flex items-center justify-between">
          <div className="flex flex-col-reverse items-center mt-1 gap-[6px] z-50">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <div className="w-[10px] h-[10px] rounded-full bg-dark-str/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="text-sm w-full text-transparent pointer-events-none select-none bg-dark-str/10 rounded-md font-semibold mt-[2px] line-clamp-2">
        The Legend of Zelda: Tears
      </span>
      <span className="text-sm w-fit text-transparent pointer-events-none select-none bg-dark-str/10 rounded-md font-semibold mt-[2px] line-clamp-2">
        of the Kingdom
      </span>
    </div>
  )
}
