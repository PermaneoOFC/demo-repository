# Banco de dados · Permaneo

Use MySQL 8.4. O [esquema](schema.sql) cria usuários, turmas, matrículas e frequências. A frequência referencia uma matrícula válida e tem um registro por estudante, turma, componente e dia. O [seed](seed.sql) adiciona somente contas e registros fictícios.

## Com Docker Compose

Na pasta `database`, copie `.env.example` para `.env` e preencha `MYSQL_ROOT_PASSWORD` e `DB_PASSWORD` com senhas locais distintas. Rode:

```bash
docker compose up -d
docker compose logs mysql
```

A inicialização importa o esquema e os dados fictícios na primeira criação do volume. A API usa o usuário `permaneo` e a senha de `DB_PASSWORD`.

## Com MySQL instalado

No MySQL Workbench, abra e execute `schema.sql` e depois `seed.sql`, nessa ordem, em uma instância de teste. O seed é destinado a um banco novo. Configure um usuário local com `SELECT` e `UPDATE` no banco `permaneo` para a API e use suas credenciais ao iniciá-la.

## Contas de demonstração

| Perfil | E-mail |
| --- | --- |
| Coordenação | `direcao@permaneo.example` |
| Professor | `professor@permaneo.example` |
| Estudante | `estudante@permaneo.example` |

A senha fictícia das três contas é `PermaneoDemo2026!`. O seed também inclui uma segunda turma e contas fictícias para validar o isolamento dos registros. Reserve o seed e essas credenciais para o ambiente de demonstração.
