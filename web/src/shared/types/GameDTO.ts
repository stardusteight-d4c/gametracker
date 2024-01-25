interface GameDTO {
  id: string
  userId: string
  coverUrl: string
  title: string
  note: string
  score: number
  status: "finished" | "playing"
  createdAt: string
  updatedAt: string
}
