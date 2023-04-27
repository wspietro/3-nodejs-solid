/* eslint-disable prettier/prettier */
import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("Setup");

    return {
      async teardown() {
        console.log("teardown");
      },
    };
  },
};

// setup é a ;unica função que environment precisa. Qual código quero executar antes dos meus testes (antes de cada ARQUIVO de testes)
// teardown executa após os testes executarem (cada ARQUIVO)ß
