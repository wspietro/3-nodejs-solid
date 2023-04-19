import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { LateCheckinValidationError } from "./errors/late-checkin-validation-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ValidateCheckInUseCase } from "./validate-checkin";

let checkInsRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    // await gymsRepository.create({
    //   id: "gym-01",
    //   title: "JS Gym",
    //   description: "",
    //   phone: "0",
    //   latitude: -23.5456482,
    //   longitude: -46.6859711,
    // });

    vi.useFakeTimers(); // criando mock
  });

  afterEach(() => {
    vi.useRealTimers(); // reset do mock
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      toValidatecheckInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(
      sut.execute({
        toValidatecheckInId: "inexistent-check-in-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const TWENTY_ONE_MIN_IN_MS = 1000 * 60 * 21;

    vi.advanceTimersByTime(TWENTY_ONE_MIN_IN_MS);

    await expect(() =>
      sut.execute({
        toValidatecheckInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckinValidationError);
  });
});
