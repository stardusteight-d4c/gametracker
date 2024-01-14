import bcrypt from "bcrypt"

export class BcryptCryptoAdapter implements ICryptoAdapter {
  constructor() {}

  public async encrypt(text: string): Promise<string> {
    return await bcrypt.hash(text, 10)
  }

  public async decrypt(request: {
    text: string
    hashedText: string
  }): Promise<boolean> {
    const { text, hashedText } = request
    return await bcrypt.compare(text, hashedText)
  }
}
