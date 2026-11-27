# PERMANEO — CONTEXTO MESTRE DO PROJETO

**Versão:** 2.0

**Atualizado:** 27/11/2026

**Fonte:** `PermaneoOFC/demo-repository`, branch `main`; último commit observado em 26/11/2026: `c9006a244755f91e6653fc120e1d89d901d0eccb`.

**Demonstração informada:** https://permaneo-ofc.vercel.app/#/home

> Documento de transferência para agentes de programação. O código atual é a fonte de verdade. Diferencie funcionalidades demonstrativas de integrações de produção.

## 1. Identidade e propósito

**Permaneo — Toda trajetória merece continuar.**

Protótipo web de acompanhamento escolar que busca apoiar a prevenção da evasão. A proposta é reunir contexto de frequência, desempenho e histórico de acompanhamento para ajudar coordenação, professores e estudantes a compreender situações e organizar apoio.

- **Missão:** ajudar escolas a identificar sinais de afastamento e organizar o apoio à permanência.
- **Visão:** tornar o acompanhamento escolar mais claro e acessível.
- **Valores:** acolhimento, acessibilidade, clareza e cuidado com dados escolares.
- **Princípio:** apoiar conversas e intervenções pedagógicas; não rotular estudantes nem substituir julgamento humano.

## 2. Pesquisa documentada

A documentação registra conversa em 20/10/2026 com representante da coordenação pedagógica do Senac. O relato menciona protocolo de aviso após três faltas consecutivas, contato por telefone/e-mail e dificuldade de cruzar frequência, desempenho e histórico. Também relata faltas concentradas em um componente curricular enquanto o estudante frequenta outros.

Esse relato é uma referência de pesquisa, não regra universal nem prova de integração do Permaneo com essa instituição.

## 3. Perfis e fluxos descritos

| Perfil | Percursos |
| --- | --- |
| Coordenação/direção | Visão geral da escola, Carômetro, acompanhamento, notificações/alertas, relatórios e configurações |
| Professor | Minhas Turmas, Minha Sala, chamada, Carômetro, notificações e perfis de estudantes |
| Estudante | Meu dia, Atividades, Calendário, Disciplinas, Avisos, Plano de estudos, Pedidos de apoio e Meu espaço |

A sala do professor é descrita com planta, zoom, visualização em lista, edição/movimentação de assentos, carteiras livres, perfis e observações. Testes de sala/redesign cobrem mouse, toque, teclado, persistência local e operações de desfazer/refazer/cancelar.

O portal do estudante mantém entregas, avisos lidos, metas e pedidos demonstrativos no navegador. Isso não significa envio à escola.

**Login:** “Explorar sem preencher” e escolha de perfil são apenas navegação da demonstração. Não são autenticação nem autorização reais.

## 4. Estado do produto: protótipo

O README define a versão atual como protótipo web com dados fictícios e registros locais no navegador.

| Área | Afirmação permitida | Não prometer |
| --- | --- | --- |
| Dados | Dados fictícios | Dados reais sincronizados |
| Persistência | Algumas interações em armazenamento local | Banco institucional ou sincronização multiusuário |
| Login | Exploração de três perfis | Autenticação/controle de acesso de produção |
| Chamada | Fluxo demonstrativo | Sincronização com diário/sistema acadêmico |
| Acompanhamento | Telas e registros locais | Fluxo institucional compartilhado/auditável |
| Alertas | Telas e indicadores demonstrativos | SMS, e-mail ou alertas automáticos ativos |
| Relatórios | Exemplos demonstrativos | Relatórios oficiais com dados reais |
| Calendário | Navegação e atividades demonstrativas | Sincronização externa/institucional |
| Apoio | Pedido demonstrativo | Encaminhamento real à equipe escolar |
| Câmeras/IA | Visão futura conceitual | Captura, identificação ou processamento de imagens |
| Comercial | Planos, calculadora e formulário demonstrativos | Cobrança, assinatura ou contratação |

`Documentacao/Restauracao.md` menciona integração de frequência com API separada, disponível no login quando habilitada. Verifique serviços, configuração e ambiente antes de afirmar endpoint, cobertura ou disponibilidade.

## 5. Planos e preços — atualização de 21/11/2026

`Documentacao/planos-permaneo.md` e `permaneo-app/src/pages/Landing/commercial/pricing.js` informam:

- Mensal: **R$ 249,00 + R$ 6,90 por aluno/mês**.
- Anual: **equivalente mensal de R$ 210,00 + R$ 5,90 por aluno/mês**, por contrato de 12 meses.
- Acima de 1.000 alunos: proposta sob medida, sem preço fechado nem cálculo de economia.

Exemplo documentado para 100 alunos: mensal R$ 939/mês (R$ 11.268/ano); anual equivalente R$ 800/mês (R$ 9.600/ano); economia comparativa R$ 1.668/ano. Cálculos usam centavos inteiros. Não alterar valores/condições sem solicitação explícita.

O formulário comercial apenas valida e baixa um resumo local; não envia dados, não confirma contratação e não representa assinatura. A documentação diz que não há endpoint, e-mail ou WhatsApp comercial configurado.

## 6. Estágio de recursos comerciais

`permaneo-app/src/pages/Landing/commercial/features.js` declara os estágios e avisa que o status descreve este checkout, não uma promessa de produção:

- Indicadores escolares: em demonstração, com dados fictícios.
- Alertas: automação planejada; níveis 5%, 8%, 10% e 15% previstos, mas disparos, SMS e e-mail não integrados.
- Carômetro/histórico: demonstração local.
- Acompanhamento/pedidos de apoio: demonstração local.
- Chamada: demonstração local.
- Relatórios: em demonstração.
- Calendário: demonstração local.
- Três perfis: em demonstração; troca não autentica.

## 7. Arquitetura e tecnologias

Stack documentada: React 18, JavaScript ES modules, Vite 6, CSS Modules/CSS, React Router DOM 7 listado, GSAP, lucide-react, Playwright, happy-dom e testes Node. `package.json` declara Node `>=20.19.0`; README recomenda Node 22 LTS ou superior.

Estrutura `permaneo-app/src`: `App.jsx`, `main.jsx`, `components/`, `data/`, `hooks/`, `images/`, `pages/`, `routes/`, `services/`, `styles/` e `global.css`. Vite gera arquivos estáticos e a navegação por hash permite hospedagem estática. Inspecione o código antes de concluir detalhes de roteamento/estado/serviços.

### Scripts em `permaneo-app/package.json`

- `npm run dev`, `npm run build`, `npm run preview`
- `npm test`
- `npm run test:browser`
- `npm run test:accessibility`
- `npm run test:student`
- `npm run test:shell`
- `npm run test:profile`
- `npm run test:classroom`
- `npm run test:widgets`
- `npm run test:pricing`
- `npm run test:commercial`
- `npm run test:portraits`
- `npm run test:redesign`

Testes de navegador usam Google Chrome instalado. Consulte os scripts antes de presumir cobertura. Não afirme que passaram sem executar.

### Execução

Windows PowerShell:
```powershell
cd permaneo-app
npm.cmd ci
npm.cmd run dev
```

macOS/Linux:
```bash
cd permaneo-app
npm ci
npm run dev
```

Build: `npm run build`.

## 8. Acessibilidade e identidade

A documentação registra temas claro/escuro, foco visível, seleção por teclado, erros anunciados a leitores de tela, sala operável por teclado com alternativa em lista, movimento reduzido e UserWay/VLibras.

Os widgets são carregados uma vez por abertura do site, fora da árvore React. UserWay fica à direita, 12 px abaixo do VLibras. `Documentacao/Acessibilidade.md` informa identificador público padrão UserWay `csVkjYy3VL` e variável `VITE_USERWAY_ACCOUNT_ID`.

Preservar semântica HTML, rótulos, teclado, foco, contraste, movimento reduzido, responsividade e CSS Modules. A documentação alerta que classes/tokens existentes podem depender de CSS Modules e classes exportadas do Figma; resets globais podem quebrar telas e controles externos. Widgets não substituem acessibilidade nativa nem revisão humana.

## 9. Privacidade e segurança

- Usar apenas dados fictícios; não inserir dados reais em fixtures, screenshots, logs ou commits.
- Não adicionar segredos, tokens ou credenciais.
- Não enviar dados a terceiros sem autorização e análise de privacidade.
- Não tratar `localStorage` como armazenamento seguro.
- Não apresentar seleção de perfil como controle de acesso.
- Não criar rankings públicos ou linguagem estigmatizante.
- Não transformar indicadores em diagnóstico ou decisão automática.
- Antes de dados reais, definir autenticação, autorização, isolamento entre instituições, segurança, retenção, auditoria, consentimento, contratos e requisitos legais.

## 10. Questões abertas para investigação

Não assumir prioridade nem implementar automaticamente:
1. Quais fluxos estão completos e quais são demonstrativos?
2. Quais dados vêm de fixtures, `localStorage` ou API?
3. Qual é o estado real da integração de frequência?
4. Como serão implementadas autenticação e autorização?
5. Como separar dados por instituição, turma, professor e estudante?
6. Como coordenadores registram, acompanham e encerram intervenções?
7. Quais alertas existem de fato?
8. Como estudantes acessam dados e pedem apoio com privacidade?
9. Como validar acessibilidade com usuários reais?
10. Que evidência demonstra impacto no acompanhamento e na permanência?

## 11. Histórico recente observado

| Data | Commit | Mensagem resumida |
| --- | --- | --- |
| 26/11/2026 | `c9006a2` | Logo como favicon |
| 25/11/2026 | `03f06f2` | Capturas reais dos três perfis atualizadas |
| 25/11/2026 | `55c06c5` | Navegação, login e portal do estudante refinados |
| 25/11/2026 | `142197c` | Evolução da experiência de interface |
| 21/11/2026 | `9995760` | Preço por aluno atualizado para R$ 6,90 |
| 18/11/2026 | `4e83ac1` | Arquivos de contexto para IA e padrão de commits |

Os hashes são marcos da consulta, não substituem leitura de diffs. Confira o HEAD novamente.

## 12. Documentos a ler

- Raiz: `AGENTS.md`, `PROJECT_CONTEXT.md`, `CONTRIBUTING.md`, `README.md` e `.githooks/commit-msg`.
- `Documentacao/`: `README.md`, `Arquitetura.md`, `tecnologias.md`, `Acessibilidade.md`, `Restauracao.md`, `planos-permaneo.md`.
- App: `permaneo-app/README.md`, `permaneo-app/package.json` e código/testes da tarefa.

## 13. Como o agente deve trabalhar

1. Ler este contexto, `AGENTS.md`, `CONTRIBUTING.md` e documentação relevante.
2. Conferir branch, `HEAD` e `git status`.
3. Inspecionar código real; não confiar apenas em documentação/commits.
4. Em tarefas amplas, apresentar diagnóstico, plano, arquivos e riscos antes de implementar.
5. Preservar três perfis, rotas, temas, responsividade e acessibilidade.
6. Fazer mudanças pequenas, reversíveis e testáveis.
7. Não alterar preço, planos, marca, conteúdo institucional ou regras sem solicitação.
8. Não fazer deploy, publicação, cobrança, contratação ou integração externa sem autorização.
9. Não adicionar dados reais, segredos ou credenciais.
10. Não apagar código sem rastrear referências.
11. Executar testes pertinentes, `npm test` e `npm run build` quando possível; relatar resultados reais.
12. Ao criar commits (somente com solicitação explícita), seguir estritamente `:emoji: <tipo>: <Descrição com inicial maiúscula>` conforme `https://github.com/iagosm-oliveira/padroes-de-commits`, `CONTRIBUTING.md` e `.githooks/commit-msg`.
13. Entregar arquivos alterados, comportamento, testes, riscos e limitações.

### Primeiro contato

Se a tarefa inicial for conhecer o projeto, operar somente em leitura: não editar/criar/mover/apagar arquivos, não instalar dependências, não fazer commit/push/deploy. Entregar diagnóstico com caminhos concretos, fatos, hipóteses e pontos não verificados.

## 14. Fontes e limites desta atualização

Consultados em 27/11/2026: repositório `PermaneoOFC/demo-repository`/`main`, commits recentes, `README.md`, `AGENTS.md`, `PROJECT_CONTEXT.md`, `CONTRIBUTING.md`, documentação listada acima, `permaneo-app/README.md`, `package.json`, `pricing.js`, `features.js` e README das capturas.

**Limites:** leitura documental e de arquivos selecionados; os detalhes de implementação de cada tela devem ser sempre verificados diretamente no código antes de alterações.
