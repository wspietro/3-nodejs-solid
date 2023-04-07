import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { expect, it, describe } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterUseCase } from "./register";

describe("Register use-case", () => {
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "Jd@example.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "test123",
    });

    expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "test123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "Jd@example.com",
      password: "test123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
