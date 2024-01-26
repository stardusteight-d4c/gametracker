interface GameListDTO {
  currentPage: number
  pageSize: number
  title: string
  status: "playing" | "finished"
  userId: string
  username: string
  sessionOwner: boolean
}
