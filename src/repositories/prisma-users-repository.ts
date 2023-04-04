import { prisma } from "@/lib/pristma";
import { Prisma } from "@prisma/client";

export class PrismaUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}