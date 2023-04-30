import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { userLatitude, userLongitude } = nearbyGymsQuerySchema.parse(
    request.query
  );

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { matchingGyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude,
    userLongitude,
  });

  return reply.status(201).send({
    matchingGyms,
  });
}
