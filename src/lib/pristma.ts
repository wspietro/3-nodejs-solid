import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

// conexão com o banco de dados
export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
