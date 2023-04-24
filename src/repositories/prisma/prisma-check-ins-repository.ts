import { prisma } from "@/lib/pristma";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date"); // date = dia
    const endOfTheDay = dayjs(date).endOf("date");
    // descartando hora, minuto e segundo

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
    // findFirst já retora nulo caso nao encontre

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const RESULTS_PER_PAGE = 20;

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: RESULTS_PER_PAGE, // quantos itens quero pegar
      skip: (page - 1) * RESULTS_PER_PAGE, // quanto itens quero pular
    });

    return checkIns;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
