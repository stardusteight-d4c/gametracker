import { randomUUID } from "node:crypto"

export class User {
  private props: IUser

  public constructor(props: IUser) {
    props.id === undefined && delete props.id
    props.id === null && delete props.id
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
    }
  }

  public get get(): IUser {
    return this.props
  }

  public set(_values: IUser) {
    throw new Error(
      "Cannot modify User directly. Use the UserService methods instead"
    )
  }
}
