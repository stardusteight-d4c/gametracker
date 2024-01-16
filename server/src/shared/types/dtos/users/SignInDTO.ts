interface SignInDTO {
  type: 'username' | 'email'
  access: string 
  password: string
}