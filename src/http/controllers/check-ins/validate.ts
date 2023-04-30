import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeValidateCheckinUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    toValidateCheckInId: z.string().uuid(),
  });

  const { toValidateCheckInId } = validateCheckInParamsSchema.parse(
    request.params
  );

  const validateCheckInUseCase = makeValidateCheckinUseCase();

  await validateCheckInUseCase.execute({
    toValidateCheckInId,
  });

  return reply.status(204).send();
}
