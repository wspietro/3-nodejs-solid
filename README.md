<h1 align="center" style="color: rgba(68, 131, 97, 1);">API Node.Js com SOLID</h1>
<p align="center">
    Nesse projeto foi desenvolvido uma aplicação para check-ins em academias, utilizando conceitos sobre SOLID, Design Patterns, Docker para iniciar o banco de dados, JWT e Refresh Token, RBAC e diversos outros conceitos.
  </p>

<p align="center">
  <a href="#-tecnologias-e-bibliotecas">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>
</p>

<br>

## ✏️ Tecnologias e bibliotecas

Para a construção do projeto, foram utilizadas as seguintes tecnologias:

- [NodeJs](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/) (cookie, jwt)
- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/ladjs/supertest)
- [tsup](https://tsup.egoist.dev/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)
- [DayJs](https://day.js.org/)

<br>

---

## ✨ Sobre o projeto

O core do sistema se assemelha com o sistema Gympass. Termos então as seguintes entidade: User, Check-in e Gym. O projeto foi construído seguindo os seguintes padrões, princípios e arquitetura:
- Arquitetura em camadas (controllers, use-cases e repositories);
- Repository Pattern (separar a lógica de persistência de dados, proporcionando uma camada de abstração);
- Inversão de dependências - SOLID (abstrair dependência dos repositories na camada de use-cases);
- Factory Pattertn (delegar a reponsabilidade de criar objetos para uma Factory Class);
- In Memory Test Database.

### Requisitos funcionais

- [1] Deve ser possível **se cadastrar**;
- [2] Deve ser possível **se autenticar**;
- [3] Deve ser possível **obter o perfil** de um usuário;
- [8] Deve ser possível **obter o número de check-ins** realizados pelo usuário;
- [7] Deve ser possível o usuário **obter seu histórico** de check-ins;
- [9] Deve ser possível o usuário **buscar academias próximas** (ate 10km);
- [8] Deve ser possível o usuário **buscar academias pelo nome**;
- [4] Deve ser possível o usuário **realizar check-in** em uma academia;
- [9] Deve ser possível **validar o check-in** de um usuário;
- [6] Deve ser possível **cadastrar uma academia**.

### Regras de negócio (fluxos para usuário conseguir executar os RF)

- [1] O usuário **não** deve poder se **cadastrar com um e-mail duplicado**;
- [4] O usuário **não** pode fazer **2 check-ins no mesmo dia**;
- [5] O usuário **não** pode fazer **check-in se não estiver perto** (100m) da academia;
- [10] O check-in **só** pode ser **validado até 20 minutos** após criado;
- [12] O check-in **só** pode ser **validado por administradores**;
- [12] A academia **só** pode ser **cadastrada por administradores**;

### Requisitos não-funcionais

- [1] Os **dados** da aplicação precisam estar **persistidos em um banco PostgreSQL**;
- [1] A **senha** do usuário precisa estar **criptografada**;
- [7] Todas as **listas de dados** precisam estar **paginadas com 20 itens por página**;
- [11] O usuário deve ser **identificado por um JWT** (JSON Web Token);

<br>

---

## 📄 Como executar
Para executar o projeto, rode o seguinte código no terminal após clonar o mesmo:

```bash

# Install Dependencies
$ npm install

# run docker compose
$ docker compose up -d

# run prisma
$ npx prisma migrate dev

# Run 
$ npm run start:dev
```
<br>

---