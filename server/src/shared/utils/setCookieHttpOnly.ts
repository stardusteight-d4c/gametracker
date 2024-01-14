import { FastifyReply } from "fastify";

export function setCookieHttpOnly(
  response: FastifyReply,
  refreshToken: string
) {
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  // response.setCookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  //   path: "/",
  //   maxAge: thirtyDays,
  // });
  // on client (to accept cookies) -> xhr.withCredentials = true;
}
