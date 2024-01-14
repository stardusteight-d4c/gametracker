interface IUserRepository {
  save(user: IUser): Promise<IUser>
}
