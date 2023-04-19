import { GymsRepository } from "@/repositories/gyms-repositoy";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
  matchingGyms: Gym[];
}

// D - Dependency Inversion Principle

export class FetchNearbyGymsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const matchingGyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    });

    return {
      matchingGyms,
    }; // no futuro, podemos ter outras coisas sendo retornada. Dessa forma não precisamos mudar a estrutura do retorno
  }
}
