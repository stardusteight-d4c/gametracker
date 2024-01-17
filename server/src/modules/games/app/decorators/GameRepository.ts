import { GamePrismaRepository } from "@modules/games/http/repositories/GamePrismaRepository"

interface IRepository {
  repository: IGameRepository
}

export function GameRepository<T extends Constructor>(
  constructor: T
): T | void {
  return class extends constructor implements IRepository {
    repository = GamePrismaRepository.getInstance()
  }
}
