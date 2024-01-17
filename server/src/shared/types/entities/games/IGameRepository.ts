interface IGameRepository {
  save(game: IGame): Promise<IGame>
  update(game: IGame): Promise<IGame>
  delete(gameId: string): Promise<void>
  findByTitle(title: string): Promise<IGame[]>
}
