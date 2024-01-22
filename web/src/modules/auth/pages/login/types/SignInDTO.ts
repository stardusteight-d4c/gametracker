interface SignInDTO {
  type: "email" | "username"
  access: string
  password: string
}
