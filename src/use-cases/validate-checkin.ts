/* eslint-disable prettier/prettier */
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./errors/late-checkin-validation-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckInUseCaseRequest {
  toValidateCheckInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({
    toValidateCheckInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(toValidateCheckInId)

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )

    const MAX_VALIDATION_TIME = 20

    if (distanceInMinutesFromCheckInCreation > MAX_VALIDATION_TIME) {
      throw new LateCheckinValidationError();
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    };
  }
}
