import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { expect, it, describe, beforeEach } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterUseCase } from "./register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register use-case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "Jd@example.com",
      password: "test123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "test123",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same e-mail", async () => {
    const email = "Jd@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "test123",
    });

    await expect(() =>
      // usar await pois temos uma promise
      sut.execute({
        name: "John Doe",
        email,
        password: "test123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "Jd@example.com",
      password: "test123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
