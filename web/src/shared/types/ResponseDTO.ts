interface ResponseDTO<T> {
  message: string
  error: string
  statusCode: number
  data: T
}
