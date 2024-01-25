interface EditDTO {
  id: string
  coverUrl: string
  title: string
  status: "playing" | "finished"
  note: string
  score: number
}
