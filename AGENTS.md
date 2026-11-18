# Instruções para agentes — Permaneo

## Primeira inicialização
- Leia `PROJECT_CONTEXT.md` por completo.
- Leia `README.md` e os documentos relevantes em `Documentacao/`.
- Leia `permaneo-app/package.json` e inspecione a estrutura real de `permaneo-app/src`.
- Não comece editando antes de entender a tarefa e o fluxo existente.

## Regras obrigatórias
1. Trate o código atual como fonte de verdade para implementação.
2. O projeto é um protótipo com dados fictícios; não alegue que funcionalidades demonstrativas são integrações de produção.
3. Não invente APIs, endpoints, credenciais, regras escolares, funcionalidades, telas ou status.
4. Não transforme seleção de perfil em afirmação de autenticação real.
5. Preserve navegação, três perfis, temas claro/escuro, responsividade, acessibilidade e fluxos existentes.
6. Preserve CSS Modules. Evite resets globais e refatorações amplas.
7. Não adicione dados reais de estudantes, segredos ou credenciais.
8. Não altere preços, planos, textos institucionais, marca ou regras de negócio sem solicitação.
9. Não faça deploy, publicação, envio externo ou integração com terceiros sem autorização explícita.
10. Faça mudanças pequenas, revisáveis e testadas.

## Processo de trabalho
- Diagnóstico: explique causa provável com evidências do código.
- Plano: liste arquivos que pretende tocar e risco de regressão.
- Implementação: faça a menor mudança que resolve o pedido.
- Verificação: rode os testes pertinentes, `npm test` e `npm run build` quando possível.
- Revisão: examine diff, responsividade, temas e acessibilidade.
- Entrega: liste mudanças, testes executados, resultados e limitações.

## Comandos
Na pasta `permaneo-app`:
```bash
npm ci
npm run dev
npm test
npm run build
```
No PowerShell, use `npm.cmd` se necessário. Node 22 LTS é a opção recomendada pela documentação do app.

## Padrões de commit
Ao criar commits neste repositório, siga a convenção de **Conventional Commits + Gitmoji** adotada em `https://github.com/iagosm-oliveira/padroes-de-commits`:

- **Formato recomendado (com emoji):** `:emoji: <tipo>: <descrição>`
  - Exemplos: `:sparkles: feat: ...`, `:bug: fix: ...`, `:books: docs: ...`, `:lipstick: feat: ...`, `:recycle: refactor: ...`, `:test_tube: test: ...`, `:bricks: ci: ...`, `:zap: perf: ...`, `:broom: cleanup: ...`, `:wastebasket: remove: ...`, `:wrench: chore: ...`, `:package: build: ...`
- **Formato compatível com o hook `commit-msg.sh`:** `<tipo>(<escopo opcional>): <descrição>`
  - Exemplos: `feat(dashboard): adicionar filtro por turma`, `fix(team): corrigir gesto de arraste no carrossel`
- **Tipos suportados:** `feat`, `fix`, `docs`, `test`, `build`, `perf`, `style`, `refactor`, `chore`, `ci`, `raw`, `cleanup`, `remove`, `revert`.
- **Boas práticas:** escreva mensagens concisas, claras e em português, descrevendo a intenção da alteração (título curto na primeira linha e, quando necessário, corpo detalhando impacto ou motivo).

## Ao receber uma tarefa ambígua
Faça uma pergunta objetiva antes de alterar comportamento de negócio, dados, permissões, autenticação, privacidade, integrações ou publicação. Não faça perguntas sobre detalhes que podem ser descobertos lendo o repositório.
