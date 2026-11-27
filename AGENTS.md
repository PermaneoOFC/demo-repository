# AGENTS.md — Antigravity e agentes de IA no Permaneo

## Antes de trabalhar
1. Leia `PROJECT_CONTEXT.md`, `AGENTS.md`, `CONTRIBUTING.md` e `README.md` na raiz do repositório.
2. Leia os documentos relevantes em `Documentacao/`.
3. Leia `permaneo-app/package.json` e inspecione o código envolvido antes de editar.
4. Confira branch, `HEAD` e `git status`.

## Fonte de verdade
- O código da branch em uso é a fonte de verdade para implementação.
- Documentação pode estar desatualizada.
- Mensagens de commit indicam intenção, não comprovam comportamento.
- Diante de divergências, investigue e registre evidências.

## Limites do produto
- Permaneo é protótipo com dados fictícios.
- Escolha de perfil não é autenticação/autorização.
- Armazenamento local não é banco institucional nem sincronização multiusuário.
- Não prometa alertas automáticos, SMS/e-mail, integrações, relatórios oficiais ou contratação sem prova no código.
- Câmeras/IA são visão conceitual; não implementar captura/identificação sem nova especificação e autorização.
- Preços documentados: Mensal R$ 249,00 + R$ 6,90/aluno/mês; Anual equivalente mensal R$ 210,00 + R$ 5,90/aluno/mês por 12 meses; acima de 1.000 alunos, proposta sob medida.

## Regras obrigatórias
1. Preservar os três perfis, rotas, temas claro/escuro, responsividade e acessibilidade.
2. Preservar CSS Modules; evitar resets globais e refatorações amplas.
3. Usar somente dados fictícios. Nunca adicionar dados reais de estudantes.
4. Não adicionar segredos, tokens, credenciais ou dados pessoais.
5. Não alterar preços, planos, marca, conteúdo institucional, pitch ou regras sem solicitação explícita.
6. Não alterar autenticação, autorização, privacidade, integrações ou arquitetura de dados sem discutir impactos e obter aprovação.
7. Não fazer deploy, publicação, cobrança, contratação ou envio externo sem autorização explícita.
8. Não instalar dependências ou executar comandos destrutivos sem justificativa.
9. Não remover código/arquivos sem rastrear referências.
10. Não inventar APIs, endpoints, variáveis ou status de funcionalidades.

## Processo
- **Diagnóstico:** reproduzir/localizar o problema e citar arquivos/trechos.
- **Plano:** listar arquivos a alterar, solução mínima e riscos.
- **Implementação:** mudanças pequenas, localizadas e reversíveis.
- **Verificação:** rodar testes pertinentes, `npm test` e `npm run build` quando possível; validar temas, responsividade e acessibilidade quando afetados.
- **Entrega:** informar mudanças, arquivos, testes e resultados reais, riscos e limitações.

## Auditoria inicial
Se a tarefa for conhecer o projeto, operar somente em leitura: não editar/criar/mover/apagar arquivos, não instalar dependências, não fazer commit/push/deploy. Entregar relatório com evidências e distinguir fatos, hipóteses e pontos não verificados.

## Comandos
Na pasta `permaneo-app`:
```bash
npm ci
npm run dev
npm test
npm run build
```
Node recomendado: 22 LTS ou superior; `package.json` declara `>=20.19.0`. No PowerShell, usar `npm.cmd` se necessário.

## Padrões de commit
Não crie commits nem faça push sem solicitação explícita. Quando autorizado, siga estritamente `https://github.com/iagosm-oliveira/padroes-de-commits` e `CONTRIBUTING.md`:

- **Formato obrigatório:** `:emoji: <tipo>: <Descrição com inicial maiúscula>`
  - Exemplos: `:sparkles: feat: Página de login`, `:bug: fix: Loop infinito na chamada`, `:books: docs: Atualização do README`, `:lipstick: feat: Estilização CSS do formulário`, `:recycle: refactor: Extração de componente`, `:test_tube: test: Validação de fluxo`, `:bricks: ci: Ajuste de workflow`, `:zap: perf: Otimização de carregamento`, `:broom: cleanup: Remoção de código morto`, `:wastebasket: remove: Exclusão de arquivo obsoleto`, `:wrench: chore: Configuração do hook`, `:package: build: Atualização de dependências`.
- **Regras:** usar **shortcode** (`:emoji:`) no início, nunca emoji Unicode literal nem mensagem sem emoji; começar a descrição com letra maiúscula; manter a primeira linha curta (idealmente até 4 palavras) e colocar detalhes no corpo quando necessário; jamais mencionar nomes de ferramentas/IAs no título ou corpo.
- **Tipos válidos:** `feat`, `fix`, `docs`, `test`, `build`, `perf`, `style`, `refactor`, `chore`, `ci`, `raw`, `cleanup`, `remove`, `revert`.
- **Validação automática:** este repositório versiona `.githooks/commit-msg` (`git config core.hooksPath .githooks`).

## Ao receber uma tarefa ambígua
Faça uma pergunta objetiva antes de alterar comportamento de negócio, dados, permissões, autenticação, privacidade, integrações ou publicação. Não faça perguntas sobre detalhes que podem ser descobertos lendo o repositório.
