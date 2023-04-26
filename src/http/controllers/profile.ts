import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // Buscar o token dentro do Header
  // Fazer a validação de signature/secret
  // Se !token, nada após será executado
  // Podemos acessar as informações através do request.user
  await request.jwtVerify();

  console.log(request.user.sub);

  return reply.status(200).send();
}
