# Permaneo · Toda trajetória merece continuar

![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-246579)
![Demo Day PROA](https://img.shields.io/badge/Origem-Demo%20Day%20PROA-246579)

O **Permaneo** é uma plataforma de acompanhamento escolar para apoiar a prevenção da evasão. A proposta é reunir frequência, desempenho e histórico de acompanhamento para que a equipe escolar possa entender o contexto das faltas e agir mais cedo.

## Diretrizes do projeto

- **Missão.** Ajudar as escolas a identificar sinais de afastamento e organizar o apoio à permanência dos estudantes.
- **Visão.** Tornar o acompanhamento escolar mais claro e acessível para coordenação, professores e estudantes.
- **Valores.** Acolhimento, acessibilidade, clareza e cuidado com os dados escolares.

## Organização

| Módulo | Conteúdo |
| --- | --- |
| [`permaneo-app`](permaneo-app/) | Plataforma React, JavaScript, Vite e CSS Modules |
| [`api_permaneo`](api_permaneo/docs/) | API Java 21 com Spring Boot, autenticação JWT e frequência |
| [`database`](database/) | Esquema MySQL 8.4, dados fictícios e configuração local |
| [`Documentacao`](Documentacao/) | Pesquisa, jornada, arquitetura, tecnologias e acessibilidade |

A estrutura segue a divisão entre app, API, banco e documentação da [Equipe Aroê](https://github.com/Equipe-Aroe), reunida aqui em um único repositório.

## Como rodar

Para abrir o protótipo visual, abra o repositório no VS Code e rode no terminal:

```powershell
cd permaneo-app
npm.cmd ci
npm.cmd run dev
```

Use a URL mostrada no terminal. Em macOS ou Linux, troque `npm.cmd` por `npm`.

Para testar login e frequência com persistência, siga primeiro a [configuração do banco](database/README.md), depois a [configuração da API](api_permaneo/docs/README.md) e ative a [frequência integrada no app](permaneo-app/README.md#frequência-integrada).

## Perfis

| Perfil | Protótipo | Frequência integrada |
| --- | --- | --- |
| Coordenação | Painel, carômetro, acompanhamento, alertas e relatórios | Consulta e alteração de todos os registros da base de demonstração |
| Professor | Turmas, chamada, carômetro e notificações | Consulta e alteração dos registros das turmas atribuídas |
| Estudante | Painel, frequência demonstrativa e espaço do estudante | Consulta dos próprios registros |

A integração com MySQL cobre login e frequência. Carômetro, alertas, notificações, relatórios e os demais painéis continuam como demonstração visual ou local. O modelo de negócio em avaliação é licença de software para escolas.

## Equipe

Projeto de Demo Day do Instituto PROA.

| Integrante | LinkedIn |
| --- | --- |
| Gabriel Rodrigues Gomes | [Perfil](https://br.linkedin.com/in/gabriel-rodrigues-rgg) |
| Kerolaine de Almeida | [Perfil](https://br.linkedin.com/in/kerolainedealmeida) |
| Caique | — |
| Diego | — |
| Iago Oliveira | — |
| João Victor Torres Pereira | [Perfil](https://br.linkedin.com/in/jo%C3%A3o-victortorrespereira) |
