interface ICryptoAdapter {
  encrypt(text: string): Promise<string>
  decrypt(request: { text: string; hashedText: string }): Promise<boolean>
}
