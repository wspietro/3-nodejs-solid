import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Search Gym use-case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms nearby 10km", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.5456482,
      longitude: -46.6859711,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -23.5259392,
      longitude: 46.6221082,
    });

    const { matchingGyms } = await sut.execute({
      userLatitude: -23.5456482,
      userLongitude: -46.6859711,
    });

    expect(matchingGyms).toHaveLength(1);
    expect(matchingGyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });
});
