import { GymsRepository } from "@/repositories/gyms-repositoy";
import { Gym } from "@prisma/client";

interface SearchGymUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymUseCaseResponse {
  matchingGyms: Gym[];
}

// D - Dependency Inversion Principle

export class SearchGymUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const matchingGyms = await this.gymsRepository.searchMany(query, page);

    return {
      matchingGyms,
    }; // no futuro, podemos ter outras coisas sendo retornada. Dessa forma não precisamos mudar a estrutura do retorno
  }
}
