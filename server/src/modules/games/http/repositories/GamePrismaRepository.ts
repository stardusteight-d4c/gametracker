import { db } from "@connect/prisma"

export class GamePrismaRepository implements IGameRepository {
  private static instance: GamePrismaRepository
  private constructor() {}

  public static getInstance(): GamePrismaRepository {
    if (!GamePrismaRepository.instance) {
      GamePrismaRepository.instance = new GamePrismaRepository()
    }
    return GamePrismaRepository.instance
  }

  async save(game: IGame): Promise<IGame> {
    const { userId, ...gameParsed } = game
    await db.game.create({
      data: {
        ...gameParsed,
        user: {
          connect: { id: userId },
        },
      },
    })
    return game
  }

  async update(game: IGame): Promise<IGame> {
    const { userId, id: gameId, ...gameParsed } = game
    await db.game.update({
      where: {
        id: gameId,
      },
      data: {
        ...gameParsed,
      },
    })
    return game
  }

  async delete(gameId: string): Promise<void> {
    await db.game.delete({ where: { id: gameId } })
  }

  async findByTitle(title: string): Promise<IGame[]> {
    return await db.game.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    })
  }
}
