interface IGameRepository {
  save(game: IGame): Promise<IGame>
  update(game: { game: IGame; userId: string }): Promise<IGame>
  delete(params: { gameId: string; userId: string }): Promise<void>
  findByTitle(title: string): Promise<IGame[]>
  list(params: GameListDTO): Promise<PaginatedList<IGame[]>>
}
