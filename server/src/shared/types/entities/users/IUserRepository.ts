interface IUserRepository {
  save(user: IUser): Promise<IUser>
  findById(id: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  findByUsername(username: string): Promise<IUser | null>
  list(params: UserListDTO): Promise<PaginatedList<IUser[]>>
}
