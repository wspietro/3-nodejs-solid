import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // Verificar se o RT e se ele já expirou
  // Essa rota não passa pela verificação de JWT (AT) pq é chamada justamente quando ele não está mais válido
  await request.jwtVerify({ onlyCookie: true });

  const { role } = request.user;

  // JWT
  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  // Refresh Token
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true, // HTTPs
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}
