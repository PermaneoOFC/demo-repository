# Permaneo · Aplicação web

Front-end React em JavaScript, com Vite, CSS Modules, temas claro e escuro e navegação por hash. Requer Node.js 22 LTS ou superior.

## Como rodar localmente

A partir da pasta `permaneo-app`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Em macOS ou Linux, use `npm`. Abra a URL exibida pelo Vite. No Windows, o sufixo `.cmd` permite executar o npm no PowerShell sem depender da política de execução de scripts.

## Frequência integrada

1. Inicie o [banco MySQL](../database/README.md) e a [API](../api_permaneo/docs/README.md).
2. Copie `.env.example` para `.env.local` nesta pasta e confirme `VITE_FREQUENCIA_INTEGRADA=true`.
3. Inicie ou reinicie o Vite. Na tela de login, selecione **Acessar frequência integrada**.
4. Use uma das [contas fictícias](../database/README.md#contas-de-demonstração).

O Vite encaminha `/api` para `http://127.0.0.1:8080`. Para outra porta, defina `PERMANEO_API_PROXY` no terminal antes de iniciar o Vite. Para hospedar a versão integrada, sirva o front-end e encaminhe `/api/*` à API na mesma origem. A sessão da tela integrada fica em memória e termina ao sair da tela ou recarregar a página.

## Organização

- `src/components/` reúne componentes compartilhados e o controlador da navegação do protótipo.
- `src/pages/` agrupa landing, login e painéis por perfil.
- `src/services/` contém o cliente HTTP do fluxo integrado.
- `src/images/` contém os recursos visuais locais.
- `tests/` contém a verificação das rotas, dos temas e de interações do protótipo.

## Validação

```bash
npm test
npm run build
npm run preview
```

O protótipo pode ser usado sem a API. A opção **Explorar sem preencher** abre as telas com dados fictícios e os controles demonstrativos usam o armazenamento do navegador. A frequência integrada consulta e atualiza a base MySQL separadamente.
