import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInRepository;
let sut: FetchUserCheckInHistoryUseCase;

describe("Fetch use check-ins history use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new FetchUserCheckInHistoryUseCase(checkInsRepository);

    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });
  });

  it("should be able to fetch check in history", async () => {
    const { checkIns } = await sut.execute({
      userId: "user-01",
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });
});
