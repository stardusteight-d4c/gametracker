import { UserPrismaRepository } from "@modules/users/http/repositories/UserPrismaRepository"

interface IRepository {
  repository: IUserRepository
}

export function UserRepository<T extends Constructor>(
  constructor: T
): T | void {
  return class extends constructor implements IRepository {
    repository = UserPrismaRepository.getInstance()
  }
}
