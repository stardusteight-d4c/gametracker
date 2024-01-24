import { db } from "@connect/prisma"
import { Prisma } from "@prisma/client"

export class UserPrismaRepository implements IUserRepository {
  private static instance: UserPrismaRepository
  private constructor() {}

  public static getInstance(): UserPrismaRepository {
    if (!UserPrismaRepository.instance) {
      UserPrismaRepository.instance = new UserPrismaRepository()
    }
    return UserPrismaRepository.instance
  }

  private async getTotalItemsThatMatchWithListQuery(params: UserListDTO) {
    const where: Prisma.UserWhereInput = {
      username: params.username
        ? { contains: params.username, mode: "insensitive" }
        : undefined,
    }
    const query = {
      where,
    }

    return await db.user.count(query)
  }

  public async save(user: IUser): Promise<IUser> {
    return db.user
      .create({
        data: user,
      })
      .then((user) => user)
  }

  public async find(id: string): Promise<IUser> {
    return db.user.findFirst({ where: { id } }).then((user) => user)
  }

  public async findByEmail(email: string): Promise<IUser> {
    return db.user
      .findFirst({
        where: {
          email,
        },
      })
      .then((user) => {
        if (user) return user as IUser
        if (!user) return null
      })
  }

  public async findByUsername(username: string): Promise<IUser> {
    return db.user
      .findFirst({
        where: {
          username,
        },
      })
      .then((user) => {
        if (user) return user as IUser
        if (!user) return null
      })
  }

  public async list(params: UserListDTO): Promise<PaginatedList<IUser[]>> {
    const pagination =
      params.currentPage !== undefined && params.pageSize !== undefined
    const skip = pagination
      ? (params.currentPage - 1) * params.pageSize
      : undefined
    const take = params.pageSize ? params.pageSize : 5

    const where: Prisma.UserWhereInput = {
      username: params.username
        ? { contains: params.username, mode: "insensitive" }
        : undefined,
    }

    const query = {
      where,
      skip,
      take,
    }

    return db.user.findMany(query).then((result) =>
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
