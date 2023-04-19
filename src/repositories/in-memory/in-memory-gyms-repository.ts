import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRepository } from "../gyms-repositoy";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async searchMany(query: string, page: number) {
    const RESULTS_PER_PAGE = 20;

    const matchingGyms = this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);

    return matchingGyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
