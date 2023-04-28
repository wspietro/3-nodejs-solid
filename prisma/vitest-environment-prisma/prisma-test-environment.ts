/* eslint-disable prettier/prettier */
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import { execSync } from 'node:child_process'
import 'dotenv/config'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  // retorna cada parte da url separada
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: "prisma",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,)

        await prisma.$disconnect
      }
    };
  },
};

// setup é a unica função que environment precisa. Qual código quero executar antes dos meus testes (antes de cada ARQUIVO de testes)
// teardown executa após os testes executarem (cada ARQUIVO)ß
