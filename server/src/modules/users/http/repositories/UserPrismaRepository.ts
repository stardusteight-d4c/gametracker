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
    return user as any
  }

  public async findByEmail(email: string): Promise<IUser> {
    throw new Error("Method not implemented.")
  }

  public async findByUsername(username: string): Promise<IUser> {
    throw new Error("Method not implemented.")
  }
}
