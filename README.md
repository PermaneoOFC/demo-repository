# Permaneo · Toda trajetória merece continuar

![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-246579)
![Demo Day PROA](https://img.shields.io/badge/Origem-Demo%20Day%20PROA-246579)

O **Permaneo** é um protótipo de acompanhamento escolar para apoiar a prevenção da evasão. A versão atual demonstra como frequência, desempenho e histórico de acompanhamento podem ajudar a equipe escolar a entender o contexto das faltas e agir mais cedo. O protótipo usa dados fictícios e roda no navegador.

## Diretrizes do projeto

- **Missão.** Ajudar as escolas a identificar sinais de afastamento e organizar o apoio à permanência dos estudantes.
- **Visão.** Tornar o acompanhamento escolar mais claro e acessível para coordenação, professores e estudantes.
- **Valores.** Acolhimento, acessibilidade, clareza e cuidado com os dados escolares.

## Organização

| Módulo | Conteúdo |
| --- | --- |
| [`permaneo-app`](permaneo-app/) | Plataforma React, JavaScript, Vite e CSS Modules |
| [`Documentacao`](Documentacao/) | Pesquisa, jornada, arquitetura, tecnologias e acessibilidade |
| [`AGENTS.md`](AGENTS.md) | Instruções rápidas, regras obrigatórias e padrão de commits para agentes de IA |
| [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) | Contexto mestre, arquitetura, limites e diretrizes do projeto Permaneo |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Fluxo de Git, regras de contribuição e ativação do hook de commit |
| [`.githooks/commit-msg`](.githooks/commit-msg) | Hook Git para validar mensagens de commit no padrão do repositório |

## Como rodar

Para abrir o protótipo visual, abra o repositório no VS Code e rode no terminal:

```powershell
cd permaneo-app
npm.cmd ci
npm.cmd run dev
```

Use a URL mostrada no terminal. Em macOS ou Linux, troque `npm.cmd` por `npm`.

## Perfis

| Perfil | O que explorar na demonstração |
| --- | --- |
| Coordenação | Painel, Carômetro, acompanhamento, alertas e relatórios |
| Professor | Minhas Turmas, Minha Sala, chamada, Carômetro e notificações |
| Estudante | Painel, frequência demonstrativa e espaço do estudante |

No login, escolha um perfil e selecione **Explorar sem preencher**. Os assentos, as observações e os demais registros locais da demonstração ficam no navegador usado para criá-los.

### Área demonstrativa do aluno

O login oferece o link **Acessar área do aluno (demonstração)**. O perfil Aluno também abre essa área, recuperada da versão **commit aluno** do repositório `gabrielrgg/Permaneo-OFC`.

O menu inclui Meu dia, Atividades, Calendário, Disciplinas, Avisos, Plano de estudos, Pedidos de apoio e Meu espaço. Entregas de atividades com respostas, avisos lidos, metas e pedidos demonstrativos ficam salvos no navegador, inclusive após recarregar; nada é enviado à escola. A navegação usa rotas como `#/student` e também aceita os links antigos como `#student`.

Execute `npm.cmd run test:student` em `permaneo-app` para validar os fluxos e as oito telas nos temas claro/escuro, em celular, tablet e computador. É necessário ter Google Chrome instalado.

### Recuperação completa da plataforma

Os três perfis usam a versão completa anterior à inclusão dos widgets, com perfis de estudantes, registros, cadastro local, filtros e configurações recuperados. UserWay e VLibras continuam ativos; o UserWay fica abaixo do VLibras na lateral direita. A fonte consultada, os recursos e as verificações estão em [Recuperação da plataforma](Documentacao/Restauracao.md).

## Contexto para IA e Padrões de Commit

Os arquivos [`AGENTS.md`](AGENTS.md), [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) e [`CONTRIBUTING.md`](CONTRIBUTING.md) reúnem as diretrizes do projeto, a arquitetura, as regras de negócio, o mapa de testes e os limites do protótipo para que qualquer pessoa ou agente de IA trabalhe no repositório com contexto consistente.

Para manter o histórico padronizado entre desenvolvedores e IAs, todos os commits devem seguir a convenção de [Padrões de Commits (`iagosm-oliveira/padroes-de-commits`)](https://github.com/iagosm-oliveira/padroes-de-commits):

- **Formato obrigatório:** `:emoji: <tipo>: <Descrição com inicial maiúscula>`
- Use o **shortcode** do emoji entre dois pontos (ex.: `:sparkles:`, `:bug:`, `:books:`), nunca emoji Unicode literal nem mensagem sem emoji.
- Mantenha o título curto (idealmente até 4 palavras) e detalhe contexto ou impacto no corpo do commit quando necessário.
- Para o primeiro commit de um projeto, também se aceita `:tada: Commit inicial`.

### Hook de validação automático

Para validar o padrão automaticamente antes de concluir cada commit, ative o hook [`.githooks/commit-msg`](.githooks/commit-msg) no seu clone local:

```bash
git config core.hooksPath .githooks
```

No macOS ou Linux, se necessário, garanta permissão de execução com `chmod +x .githooks/commit-msg`.

### Principais tipos e emojis

| Tipo | Emoji | Uso indicado |
| --- | --- | --- |
| `feat` | ✨ `:sparkles:` / 💄 `:lipstick:` | Novo recurso ou estilização de interface |
| `fix` | 🐛 `:bug:` / 💥 `:boom:` | Correção de bug ou reversão de mudança ineficiente |
| `docs` | 📚 `:books:` / 💡 `:bulb:` | Documentação e comentários |
| `refactor` | ♻️ `:recycle:` | Refatoração sem alterar funcionalidade |
| `test` | 🧪 `:test_tube:` / ✅ `:white_check_mark:` | Adição ou ajuste de testes |
| `style` | 👌 `:ok_hand:` | Formatação de código, lint ou revisão de estilo |
| `perf` | ⚡ `:zap:` | Melhorias de performance |
| `build` | 📦 `:package:` / ➕ `:heavy_plus_sign:` / ➖ `:heavy_minus_sign:` | Arquivos de build e dependências |
| `ci` | 🧱 `:bricks:` | Integração contínua e infraestrutura |
| `chore` | 🔧 `:wrench:` / 🚚 `:truck:` | Configurações rotineiras, mover ou renomear arquivos |
| `raw` | 🗃️ `:card_file_box:` | Dados, configurações e parâmetros |
| `cleanup` | 🧹 `:broom:` | Limpeza de código morto ou comentado |
| `remove` | 🗑️ `:wastebasket:` | Exclusão de arquivos ou funcionalidades obsoletas |
| `revert` | 💥 `:boom:` | Reversão de commit anterior |

### Exemplos

```bash
git commit -m ":sparkles: feat: Página de login"
git commit -m ":lipstick: feat: Estilização CSS do formulário"
git commit -m ":bug: fix: Loop infinito na chamada"
git commit -m ":books: docs: Atualização do README"
git commit -m ":recycle: refactor: Extração de componente compartilhado"
git commit -m ":test_tube: test: Validação do cálculo por aluno"
```

## Equipe

Projeto de Demo Day do Instituto PROA.

| Integrante | LinkedIn |
| --- | --- |
| Gabriel Rodrigues Gomes | [Perfil](https://br.linkedin.com/in/gabriel-rodrigues-rgg) |
| Caique | [Perfil](https://www.linkedin.com/in/caique-vinicius-5150b643b/) |
| Diego | [Perfil](https://www.linkedin.com/in/diego-armando-698142316/) |
| Iago Oliveira | [Perfil](https://www.linkedin.com/in/iagosm-oliveira/) |
| João Victor Torres Pereira | [Perfil](https://br.linkedin.com/in/jo%C3%A3o-victortorrespereira) |
