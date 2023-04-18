import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
