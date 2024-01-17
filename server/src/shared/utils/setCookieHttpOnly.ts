import { FastifyReply } from "fastify"

export function setCookieHttpOnly({
  response,
  name,
  value,
  age,
}: {
  response: FastifyReply
  name: string
  value: string
  age: number
}) {
  response.setCookie(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: age,
  })
  // on client (to accept cookies) -> xhr.withCredentials = true;
}
