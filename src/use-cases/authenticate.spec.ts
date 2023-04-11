import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { expect, it, describe, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use-case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jd@example.com",
      password_hash: await hash("test123", 6),
    });

    const { user } = await sut.execute({
      email: "jd@example.com",
      password: "test123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "jd@example.com",
        password: "test123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jd@example.com",
      password_hash: await hash("test123", 6),
    });

    expect(() =>
      sut.execute({
        email: "jd@example.com",
        password: "wrongpassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
