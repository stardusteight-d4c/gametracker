interface IGame {
  id?: string
  userId: string
  title: string
  coverUrl: string
  status: "playing" | "finished"
  note: string
  score: number
}
