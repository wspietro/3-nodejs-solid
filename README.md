# APP

Gympass Style app.

## Requisitos funcionais

- [1] Deve ser possível se cadastrar;
- [2] Deve ser possível se autenticar;
- [3] Deve ser possível obter o perfil de um usuário;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [4] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia.

## Regras de negócio (fluxos para usuário conseguir executar os RF)

- [1] O usuário não deve poder se  cadastrar com um e-mail duplicado;
- [4] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## Requisitos não-funcionais

- [1] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [1] A senha do usuário precisa estar criptografada;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);