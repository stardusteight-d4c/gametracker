export function tokenPayloadTransformer(user: IUser) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  }
}
