import { prisma } from "@/lib/pristma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: "ADMIN" | "MEMBER" = "MEMBER"
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "jd@test.com",
      password_hash: await hash("123456", 6),
      role,
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "jd@test.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
