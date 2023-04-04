import { prisma } from "@/lib/pristma";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6); // 6 rounds hash

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // não usamos o reply diretamente pois a lógica de criacao do usuário deve ser separada da criação por requisicao http
  if (userWithSameEmail) {
    throw new Error("E-mail already exists.");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
