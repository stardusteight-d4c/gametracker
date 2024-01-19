import { db } from "@connect/prisma"
import { Prisma } from "@prisma/client"

export class GamePrismaRepository implements IGameRepository {
  private static instance: GamePrismaRepository
  private constructor() {}

  public static getInstance(): GamePrismaRepository {
    if (!GamePrismaRepository.instance) {
      GamePrismaRepository.instance = new GamePrismaRepository()
    }
    return GamePrismaRepository.instance
  }

  private async getTotalItemsThatMatchWithListQuery(params: GameListDTO) {
    const where: Prisma.GameWhereInput = {
      userId: params.userId
        ? { contains: params.userId, mode: "insensitive" }
        : undefined,
    }
    const query = {
      where,
    }

    return await db.game.count(query)
  }

  public async save(game: IGame): Promise<IGame> {
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

  public async update(params: { game: IGame; userId: string }): Promise<IGame> {
    const { userId, id: gameId, ...gameParsed } = params.game
    await db.game.update({
      where: {
        id: gameId,
        AND: {
          userId: params.userId,
        },
      },
      data: {
        ...gameParsed,
      },
    })
    return params.game
  }

  public async delete(params: {
    gameId: string
    userId: string
  }): Promise<void> {
    await db.game.delete({
      where: { id: params.gameId, AND: { userId: params.userId } },
    })
  }

  public async findByTitle(title: string): Promise<IGame[]> {
    return await db.game.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    })
  }

  public async list(params: GameListDTO): Promise<PaginatedList<IGame[]>> {
    const pagination =
      params.currentPage !== undefined && params.pageSize !== undefined
    const skip = pagination
      ? (params.currentPage - 1) * params.pageSize
      : undefined
    const take = pagination ? params.pageSize : undefined

    const where: Prisma.GameWhereInput = {
      userId: params.userId ? params.userId : undefined,
    }

    const query = {
      where,
      skip,
      take,
    }

    return db.game.findMany(query).then((result) =>
      this.getTotalItemsThatMatchWithListQuery(params).then((totalItems) => ({
        currentPage: params.currentPage,
        itemsOnPage: result.length,
        totalPages: Math.ceil(totalItems / params.pageSize),
        totalItems,
        items: result,
      }))
    )
  }
}
