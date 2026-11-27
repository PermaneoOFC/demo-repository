# Contribuição e organização do Git — Permaneo

## Branch de trabalho

- A branch oficial compartilhada pela equipe é **`main`**.
- Antes de começar uma tarefa, atualize a cópia local da `main`.
- Não crie branches permanentes por pessoa, ferramenta ou tarefa.
- Preserve o histórico já publicado: não use `push --force` nem altere commits antigos que outros integrantes já receberam.
- Se uma alteração grande precisar de revisão, alinhe previamente com a equipe. A branch de trabalho temporária deverá ser removida depois da integração.

## Mensagens de commit

Use **Conventional Commits + Gitmoji**, em português, seguindo o padrão do guia [`iagosm-oliveira/padroes-de-commits`](https://github.com/iagosm-oliveira/padroes-de-commits):

```text
:emoji: tipo: Descrição curta com inicial maiúscula
```

Regras de formato:
- Comece com o **shortcode do emoji** entre dois pontos (`:sparkles:`, `:bug:`, `:books:`, etc.), e não com emoji Unicode literal ou sem emoji.
- Use letra maiúscula no início da descrição e mantenha a primeira linha curta (idealmente até 4 palavras; detalhes vão no corpo do commit).
- Para o primeiro commit de um projeto, admite-se `:tada: Commit inicial`.

Tipos aceitos:
- `feat`: novo recurso (`:sparkles:`) ou estilização de interface (`:lipstick:`)
- `fix`: correção de bug (`:bug:`) ou reversão de mudança ineficiente (`:boom:`)
- `docs`: documentação (`:books:`) ou comentários (`:bulb:`)
- `refactor`: refatoração sem alterar comportamento (`:recycle:`)
- `style`: formatação, lint ou revisão de estilo (`:ok_hand:`)
- `test`: adição ou ajuste de testes (`:test_tube:` / `:white_check_mark:`)
- `build`: build e dependências (`:package:` / `:heavy_plus_sign:` / `:heavy_minus_sign:`)
- `perf`: melhoria de desempenho (`:zap:`)
- `ci`: integração contínua e infraestrutura (`:bricks:`)
- `chore`: configurações rotineiras (`:wrench:`) ou mover/renomear (`:truck:`)
- `raw`: dados e parâmetros (`:card_file_box:`)
- `cleanup`: limpeza de código morto ou comentado (`:broom:`)
- `remove`: exclusão de arquivos ou código obsoleto (`:wastebasket:`)
- `revert`: reversão de commit anterior (`:boom:`)

Exemplos:

```text
:sparkles: feat: Carrossel interativo da equipe
:lipstick: feat: Ajuste visual no painel do professor
:bug: fix: Correção no retorno do login
:books: docs: Atualização do README
:recycle: refactor: Extração de componente compartilhado
:test_tube: test: Validação de cálculo por aluno
:bricks: ci: Configuração do fluxo de validação
:wrench: chore: Configuração do hook de commit
```

Regras gerais:
1. Explique **o que mudou**, não qual ferramenta foi usada.
2. Evite mensagens vagas como `update`, `changes`, `ajustes` ou `versão final`.
3. Não use nomes de ferramentas ou agentes como título, escopo, assinatura automática ou sufixo do commit.
4. Separe mudanças de assuntos diferentes em commits distintos.
5. Não altere a autoria de outra pessoa ao corrigir um commit.

## Hook de validação local

O repositório versiona o hook [`.githooks/commit-msg`](.githooks/commit-msg) para validar automaticamente o formato acima antes de registrar cada commit.

Ative no clone local (uma única vez por máquina):

```bash
git config core.hooksPath .githooks
```

Em macOS ou Linux, garanta também permissão de execução:

```bash
chmod +x .githooks/commit-msg
```

## Rotina compartilhada

Antes de editar:

```bash
git switch main
git pull --rebase origin main
```

Depois de testar a mudança:

```bash
git status
git add caminho/do/arquivo
git commit -m ":sparkles: feat: Descrição da funcionalidade"
git push origin main
```

Se o push for rejeitado porque outro integrante atualizou a `main`, integre as mudanças remotamente com `git pull --rebase origin main`, resolva eventuais conflitos e tente novamente **sem forçar o push**.

## Revisão

Antes de enviar, verifique se a aplicação continua funcionando, se o código não contém credenciais e se a mensagem do commit descreve fielmente a alteração.
