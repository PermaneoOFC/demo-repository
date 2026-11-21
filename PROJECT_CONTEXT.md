# PERMANEO — CONTEXTO MESTRE DO PROJETO

**Versão do documento:** 1.0

**Data de preparação:** 18/11/2026

**Repositório analisado:** https://github.com/PermaneoOFC/demo-repository

**Demonstração publicada informada pela equipe:** https://permaneo-ofc.vercel.app/#/home

> Este documento é uma transferência de contexto para agentes de programação. Ele descreve o estado observado no repositório e separa fatos, limitações e hipóteses. O código atual é a fonte de verdade para implementação; esta documentação não substitui inspeção dos arquivos.

---

## 1. Identidade e propósito

**Permaneo — Toda trajetória merece continuar.**

O Permaneo é um protótipo de acompanhamento escolar orientado à prevenção da evasão. A proposta é ajudar escolas a identificar sinais de afastamento, reunir contexto sobre frequência e desempenho e organizar ações de acompanhamento com participação de coordenação, professores e estudantes.

### Problema que busca enfrentar
O acompanhamento de ausências pode ficar fragmentado entre registros de frequência, desempenho e contatos realizados. Uma ausência isolada não explica necessariamente o que está acontecendo: o estudante pode faltar a um componente curricular e continuar frequentando os demais. A equipe precisa de contexto para decidir como agir, sem transformar um indicador em julgamento sobre o estudante.

### Missão
Ajudar as escolas a identificar sinais de afastamento e organizar o apoio à permanência dos estudantes.

### Visão
Tornar o acompanhamento escolar mais claro e acessível para coordenação, professores e estudantes.

### Valores
Acolhimento, acessibilidade, clareza e cuidado com os dados escolares.

### Princípio de produto
O sistema deve apoiar conversas e intervenções pedagógicas, não rotular estudantes, automatizar decisões disciplinares ou substituir o julgamento humano.

---

## 2. Contexto de pesquisa

A documentação do repositório registra uma conversa realizada em **20/10/2026** com um representante da coordenação pedagógica do Senac. Segundo o registro:
- havia um protocolo de aviso após três faltas consecutivas;
- a equipe tentava contato por telefone ou e-mail;
- existia dificuldade para cruzar frequência, desempenho e histórico de acompanhamento;
- ausências podiam se concentrar em um componente curricular enquanto o estudante seguia participando de outros.

A proposta do Permaneo responde a isso contextualizando os registros por turma, componente curricular e data, para que a equipe investigue antes de agir.

**Cuidado:** esse relato é uma referência de pesquisa documentada, não deve ser tratado como regra universal de todas as escolas.

---

## 3. Públicos e perfis

| Perfil | Necessidade | Capacidades demonstradas/documentadas |
|---|---|---|
| Coordenação / direção | Enxergar sinais, investigar histórico e coordenar acompanhamento | Painel, Carômetro, acompanhamento, alertas e relatórios |
| Professor | Registrar frequência e compreender a turma | Minhas Turmas, Minha Sala, chamada, Carômetro e notificações |
| Estudante | Entender sua trajetória e saber quando pedir apoio | Painel, frequência demonstrativa e área do estudante |

O login permite selecionar um perfil e usar **“Explorar sem preencher”**. Essa seleção é um mecanismo de navegação da demonstração, **não é autenticação real nem controle de autorização**.

---

## 4. Estado funcional observado no repositório

O README da raiz descreve a versão atual como protótipo web com dados fictícios e armazenamento local no navegador.

### 4.1 Coordenação
A demonstração oferece:
- painel;
- Carômetro;
- acompanhamento;
- alertas;
- relatórios.

### 4.2 Professor
A demonstração oferece:
- Minhas Turmas;
- Minha Sala;
- chamada;
- Carômetro;
- notificações;
- planta da sala com zoom;
- alternância entre planta e lista;
- edição de assentos, movimentação de estudantes e carteiras livres;
- abertura do perfil de estudante e registro de observações.

### 4.3 Estudante
A área demonstrativa inclui:
- Meu dia;
- Atividades;
- Calendário;
- Disciplinas;
- Avisos;
- Plano de estudos;
- Pedidos de apoio;
- Meu espaço.

O README informa que entregas de atividades com respostas, avisos lidos, metas e pedidos demonstrativos ficam salvos no navegador, inclusive após recarregar. Esses registros **não são enviados à escola**.

### 4.4 Recursos transversais
- temas claro e escuro;
- navegação por hash;
- componentes compartilhados;
- dados fictícios;
- persistência local em algumas interações;
- UserWay e VLibras integrados;
- seção comercial/planos na homepage;
- testes automatizados de fluxos e telas.

### 4.5 Seção comercial e planos (preço atualizado em 21/11/2026)
A documentação registra dois planos com os mesmos recursos:
- Mensal: R$ 249 + R$ 6,90 por aluno/mês.
- Anual: equivalente mensal de R$ 210 + R$ 5,90 por aluno/mês, por 12 meses.
- Acima de 1.000 alunos: proposta sob medida, sem total fechado ou economia calculada.

A calculadora compartilha estado entre homepage e modal, calcula totais e comparação em centavos inteiros. O formulário prepara e baixa um resumo local; **não envia, não persiste dados e não confirma contratação**.

A documentação diz que a seção comercial é uma extensão demonstrativa e que publicação, cobrança, assinatura e envio de mensagens não foram realizados naquela entrega. Confirme os arquivos atuais antes de alterar preços, condições ou disponibilidade.

---

## 5. Limitações e fronteiras — não inventar capacidades

Esta seção é crítica. Não apresente protótipo como produto institucional de produção.

1. **Dados:** os dados demonstrativos são fictícios.
2. **Persistência:** registros locais ficam no navegador que os criou; não há sincronização institucional garantida.
3. **Perfis:** escolher Coordenação/Professor/Estudante no login não autentica contas reais.
4. **Mensagens:** não afirmar que e-mail, SMS, WhatsApp ou notificações externas são enviados sem encontrar integração funcional comprovada.
5. **Relatórios:** distinguir telas e relatórios demonstrativos de relatórios oficiais conectados a sistemas escolares.
6. **Câmeras e IA:** a visão futura descrita nos planos é conceitual. A documentação afirma que não há acesso a câmera, captura, identificação ou processamento de imagens.
7. **Alertas:** níveis automáticos de faltas de 5%, 8%, 10% e 15% aparecem como planejados na documentação comercial; não anunciá-los como automação operacional sem comprovar no código.
8. **Integração de frequência:** a documentação de restauração menciona integração com API disponível separadamente no login quando habilitada. Investigue o código e configuração antes de afirmar ambiente, endpoint, cobertura ou disponibilidade.
9. **Contato comercial:** a documentação diz que não havia endpoint/e-mail/WhatsApp comercial configurado; formulário apenas prepara download local.
10. **Privacidade:** UserWay/VLibras são serviços externos. Antes de dados reais de estudantes, revisar privacidade, consentimento, contratos, segurança e requisitos legais aplicáveis.

**Regra:** se algo não puder ser comprovado no código, testes ou documentação atual, marque como “não verificado” e pergunte antes de implementar ou prometer.

---

## 6. Arquitetura e tecnologias

### Stack identificada
- React 18;
- JavaScript (ES modules);
- Vite 6;
- CSS Modules e CSS;
- React Router DOM 7 listado nas dependências;
- GSAP;
- lucide-react;
- Playwright, happy-dom e testes Node.

O `package.json` exige Node `>=20.19.0`; o README da aplicação recomenda Node 22 LTS ou superior. Prefira Node 22 LTS compatível com o projeto.

### Estrutura observada em `permaneo-app/src`
- `App.jsx` e `main.jsx`: entrada e composição do aplicativo;
- `components/`: componentes compartilhados;
- `data/`: dados;
- `hooks/`: hooks;
- `images/`: imagens locais;
- `pages/`: páginas por área;
- `routes/`: rotas;
- `services/`: serviços;
- `styles/`: estilos;
- `global.css`: estilos globais.

A documentação descreve:
- Vite gerando arquivos estáticos;
- navegação por hash para hospedagem estática;
- telas organizadas por área em `src/pages`;
- dados fictícios no frontend e registros demonstrativos no armazenamento local.

**Não assuma que o README descreve cada detalhe técnico atual.** Inspecione `package.json`, `src/main.jsx`, `src/App.jsx`, `src/routes`, serviços e páginas antes de qualquer refatoração.

### Comandos (PowerShell/Windows)
Na raiz:
```powershell
cd permaneo-app
npm.cmd ci
npm.cmd run dev
```
Em macOS/Linux:
```bash
cd permaneo-app
npm ci
npm run dev
```
Use a URL local informado pelo Vite.

Build:
```bash
npm.cmd run build
```

---

## 7. Testes disponíveis

Scripts encontrados em `permaneo-app/package.json`:

| Comando | Objetivo indicado pelo nome/documentação |
|---|---|
| `npm test` | testes frontend gerais |
| `npm run test:browser` | smoke e fluxo de navegador |
| `npm run test:accessibility` | testes de acessibilidade |
| `npm run test:student` | fluxos da área do estudante |
| `npm run test:shell` | estrutura compartilhada |
| `npm run test:profile` | perfis |
| `npm run test:classroom` | sala de aula |
| `npm run test:widgets` | widgets de acessibilidade no navegador |
| `npm run test:pricing` | cálculos de preço |
| `npm run test:commercial` | fluxo comercial no navegador |
| `npm run test:portraits` | retratos/carômetro |

Alguns testes de navegador exigem Google Chrome instalado. Consulte cada script e documentação antes de interpretar resultados.

A documentação `Restauracao.md` lista também comandos históricos/validações e informa que certas baterias usam `BASE_URL`. Confirme o estado real antes de executar comandos que não estejam no `package.json`.

### Rotina mínima recomendada para toda alteração
1. Ler a página/componente e seus dependentes.
2. Identificar comportamento atual e testes relacionados.
3. Implementar a menor alteração coerente.
4. Executar teste específico.
5. Executar `npm test`.
6. Executar `npm run build`.
7. Se a alteração afetar navegador, responsividade, temas ou acessibilidade, executar testes de navegador pertinentes.
8. Revisar `git diff` e `git status`.
9. Relatar arquivos alterados, testes executados e limitações.

---

## 8. Acessibilidade e identidade visual

A documentação registra:
- temas claro e escuro;
- foco visível;
- seleção de perfil por teclado;
- mensagens de erro anunciadas a leitores de tela;
- sala virtual operável por teclado e com visualização alternativa em lista;
- VLibras e UserWay carregados uma vez, fora da árvore React;
- UserWay à direita, 12 px abaixo do VLibras;
- revisão humana necessária para qualidade de tradução automática.

**Preservar:**
- semântica HTML;
- rótulos acessíveis;
- navegação por teclado;
- foco visível;
- contraste;
- suporte a movimento reduzido;
- layouts responsivos;
- estilos CSS Modules.

A documentação alerta que classes e tokens existentes não devem ser removidos por parecerem redundantes: parte do estilo depende de CSS Modules e classes exportadas do Figma, não compiladas por Tailwind. Um reset global excessivo pode quebrar a interface e controles externos.

Antes de mexer em UserWay/VLibras, leia `Documentacao/Acessibilidade.md`, `src/main.jsx` e `src/styles/accessibility.css` (se ainda existirem).

---

## 9. Diretrizes de produto e UX

- Use linguagem acolhedora, clara e não estigmatizante.
- Evite chamar estudantes de “problemáticos”, “desinteressados” ou equivalentes.
- Indicadores são sinais para investigação, não diagnósticos.
- Mostre contexto (data, turma, componente curricular) sempre que possível.
- Não crie rankings públicos de estudantes nem exponha dados pessoais sem necessidade.
- Não introduza dados reais de estudantes em fixtures, logs, screenshots ou commits.
- Preserve consistência entre os três perfis e entre os temas.
- Prefira mudanças incrementais e testáveis.
- Não refaça telas inteiras quando uma alteração localizada resolve o problema.
- Não adicione dependências sem justificar o benefício e avaliar impacto.

---

## 10. Segurança, privacidade e dados

O domínio envolve informações educacionais potencialmente sensíveis. Mesmo em protótipo:
- use somente dados fictícios;
- não coloque credenciais, tokens, chaves privadas ou dados pessoais em código;
- não registre respostas de estudantes em logs;
- não envie dados a serviços externos sem autorização explícita e análise de privacidade;
- não transforme `localStorage` em falsa promessa de armazenamento seguro;
- não implemente autenticação fictícia como se fosse controle de acesso;
- valide entradas e trate erros;
- documente claramente o que é local, remoto, persistido ou apenas simulado.

Nunca exponha valores de `.env` ou arquivos de segredo. O `.env.example` pode ser lido para conhecer nomes de variáveis, mas não deve conter segredos.

---

## 11. Equipe e origem

O README identifica o projeto como iniciativa de Demo Day do Instituto PROA.

Integrantes listados no README:
- Gabriel Rodrigues Gomes
- Caique
- Diego
- Iago Oliveira
- João Victor Torres Pereira

Não atribua responsabilidades individuais sem fonte atual que confirme.

---

## 12. Mapa de documentação do repositório

Leia estes arquivos antes de tarefas relevantes:
- `AGENTS.md` — instruções rápidas, regras obrigatórias e padrão de commits para agentes de IA;
- `PROJECT_CONTEXT.md` — contexto mestre do projeto Permaneo;
- `README.md` — visão geral, execução e perfis;
- `Documentacao/README.md` — pesquisa e jornada;
- `Documentacao/Arquitetura.md` — fluxo e arquitetura;
- `Documentacao/tecnologias.md` — stack;
- `Documentacao/Acessibilidade.md` — acessibilidade e widgets;
- `Documentacao/Restauracao.md` — recursos recuperados e verificações;
- `Documentacao/planos-permaneo.md` — seção comercial, preços e limites;
- `permaneo-app/README.md` — execução e estrutura da aplicação;
- `permaneo-app/package.json` — scripts e dependências.

---

## 13. Backlog de investigação — não presumir prioridade

Antes de propor evolução, faça uma auditoria técnica e de produto. Pontos que merecem investigação:
1. Quais fluxos estão realmente completos e quais são somente demonstrativos?
2. Quais dados são mock, `localStorage` ou provenientes de API?
3. Qual é o estado atual da integração de frequência mencionada na documentação?
4. Existe autenticação e autorização reais? A documentação sugere que a escolha de perfil atual é apenas demonstrativa.
5. Como separar dados por instituição, turma, professor e estudante numa futura versão multi-instituição?
6. Quais requisitos de privacidade, segurança, retenção e auditoria serão necessários antes de dados reais?
7. Quais alertas são efetivamente implementados e quais são apenas planejados?
8. Como a coordenação registra, acompanha e encerra uma intervenção?
9. Como garantir que o estudante tenha acesso adequado aos próprios dados e possa solicitar apoio?
10. Como testar acessibilidade com leitores de tela e usuários reais, além dos testes automatizados?

Não converta esta lista em funcionalidades implementadas sem aprovação e especificação.

---

## 14. Como um agente deve trabalhar neste repositório

1. Comece lendo este arquivo e `AGENTS.md`.
2. Leia o README e a documentação relacionada à tarefa.
3. Inspecione o código real; não confie apenas em descrições.
4. Diga o que entendeu e quais arquivos pretende alterar quando a tarefa for ampla.
5. Preserve funcionalidades existentes, rotas, dados demonstrativos, temas e acessibilidade.
6. Não faça migração de stack, reestruturação global ou troca de biblioteca sem pedido/justificativa.
7. Não apague código ou arquivos que pareçam não usados sem rastrear referências.
8. Não altere preços, conteúdo institucional, identidade, textos de pitch ou regras de negócio por iniciativa própria.
9. Não publique, faça deploy, envie mensagens, altere serviços externos ou use dados reais sem autorização explícita.
10. Ao concluir, entregue resumo objetivo: o que mudou, arquivos, testes, resultado do build, riscos e próximos passos.
11. Ao criar commits, siga o padrão de commits semânticos e emojis definido em https://github.com/iagosm-oliveira/padroes-de-commits (detalhado em AGENTS.md e no README.md).

---

## 15. Fontes e grau de confiança

**Fonte primária:** arquivos atuais do repositório `PermaneoOFC/demo-repository`, branch `main`, consultados em 18/11/2026.

**Fontes consultadas nesta preparação:**
- `README.md`;
- `Documentacao/README.md`;
- `Documentacao/Arquitetura.md`;
- `Documentacao/Restauracao.md`;
- `Documentacao/planos-permaneo.md`;
- `Documentacao/tecnologias.md`;
- `Documentacao/Acessibilidade.md`;
- `permaneo-app/README.md`;
- `permaneo-app/package.json`;
- listagem de `permaneo-app/src`.

**Limitação da preparação:** foi feita leitura documental e inspeção da estrutura e scripts. Não foi executado o projeto localmente nem realizada auditoria linha a linha de todos os componentes. O conteúdo de cada tela e o comportamento atual devem ser verificados no código e no navegador antes de alterações.

**Notion:** a busca por “Permaneo” no workspace consultado não retornou páginas. Portanto, este pacote se baseia no repositório e no contexto compartilhado nesta conversa; não inventa decisões ausentes.
