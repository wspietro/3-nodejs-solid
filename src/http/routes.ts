import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";

// fastify plugin
export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
