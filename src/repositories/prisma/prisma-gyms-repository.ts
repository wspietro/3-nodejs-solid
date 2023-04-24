import { prisma } from "@/lib/pristma";
import { Prisma, Gym } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repositoy";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async searchMany(query: string, page: number) {
    const RESULTS_PER_PAGE = 20;

    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: RESULTS_PER_PAGE, // quantos itens quero pegar
      skip: (page - 1) * RESULTS_PER_PAGE, // quanto itens quero pular
    });

    return gyms;
  }

  async findManyNearby({ userLatitude, userLongitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
}
