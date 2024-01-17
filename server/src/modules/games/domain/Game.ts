import { randomUUID } from "node:crypto"

export class Game {
  private props: IGame

  public constructor(props: IGame) {
    props.id === undefined && delete props.id
    props.id === null && delete props.id
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
    }
  }

  public get get(): IGame {
    return this.props
  }

  public set(_values: IGame) {
    throw new Error(
      "Cannot modify Game directly"
    )
  }
}
