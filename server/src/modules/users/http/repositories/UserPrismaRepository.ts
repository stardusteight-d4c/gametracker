import { db } from "@connect/prisma"

export class UserPrismaRepository implements IUserRepository {
  private static instance: UserPrismaRepository
  private constructor() {}

  public static getInstance(): UserPrismaRepository {
    if (!UserPrismaRepository.instance) {
      UserPrismaRepository.instance = new UserPrismaRepository()
    }
    return UserPrismaRepository.instance
  }

  public async save(user: IUser): Promise<IUser> {
    await db.user.create({
      data: user,
    })
    return user
  }

  public async findByEmail(email: string): Promise<IUser> {
    return await db.user
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
    return await db.user
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
}
