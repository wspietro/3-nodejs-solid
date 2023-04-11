import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credentials-error";

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
    const usersRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message });
    }
    // Fastify faz a tratativa do erro
    throw err;
  }

  return reply.status(200).send();
}
