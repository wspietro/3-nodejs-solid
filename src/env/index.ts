import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  // DATABASE_CLIENT: z.literal('pg'),
  // DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variable", _env.error.format());

  // nenhum código é executado a partir (app será derrubado)
  throw new Error("Invalid environment variable");
}

export const env = _env.data;
