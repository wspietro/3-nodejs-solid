import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

// D - Dependency Inversion Principle

export class RegisterUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6); // 6 rounds hash

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    // não usamos o reply diretamente pois a lógica de criacao do usuário deve ser separada da criação por requisicao http
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    } else {
      // TODO: we shoul log to an external tool like DataDog/NewRelic/Sentry
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    }; // no futuro, podemos ter outras coisas sendo retornada. Dessa forma não precisamos mudar a estrutura do retorno
  }
}
