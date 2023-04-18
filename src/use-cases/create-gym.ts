import { GymsRepository } from "@/repositories/gyms-repositoy";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

// D - Dependency Inversion Principle

export class CreateGymUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    }; // no futuro, podemos ter outras coisas sendo retornada. Dessa forma não precisamos mudar a estrutura do retorno
  }
}
