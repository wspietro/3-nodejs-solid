import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { expect, it, describe, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JS Gym",
      description: "",
      phone: "0",
      latitude: -23.5456482,
      longitude: -46.6859711,
    });

    vi.useFakeTimers(); // criando mock
  });

  afterEach(() => {
    vi.useRealTimers(); // reset do mock
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5456482,
      userLongitude: -46.6859711,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5456482,
      userLongitude: -46.6859711,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.5456482,
        userLongitude: -46.6859711,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice or more but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5456482,
      userLongitude: -46.6859711,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5456482,
      userLongitude: -46.6859711,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JS Gym",
      description: "",
      phone: "0",
      latitude: new Decimal(-23.5874162),
      longitude: new Decimal(-46.6602085),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -23.5456482,
        userLongitude: -46.6859711,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
