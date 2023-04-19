import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { SearchGymUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search Gym use-case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -23.5456482,
      longitude: -46.6859711,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -23.5456482,
      longitude: -46.6859711,
    });

    const { matchingGyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(matchingGyms).toHaveLength(1);
    expect(matchingGyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5456482,
        longitude: -46.6859711,
      });
    }

    const { matchingGyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(matchingGyms).toHaveLength(2);
    expect(matchingGyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
