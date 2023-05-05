import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-athenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    // JWT
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "10m",
        },
      }
    );

    // Refresh Token
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
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
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message });
    }
    // Fastify faz a tratativa do erro
    throw err;
  }
}
