import { FastifyReply } from "fastify"

export function setCookie({
  response,
  name,
  value,
  age,
  httpOnly,
}: {
  response: FastifyReply
  name: string
  value: string
  age: number
  httpOnly: boolean
}) {
  response.setCookie(name, value, {
    httpOnly,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: age,
  })
  // on client (to accept cookies) -> xhr.withCredentials = true;
}
