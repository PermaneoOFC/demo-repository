# Permaneo · Aplicação web

Front-end React em JavaScript, com Vite, CSS Modules, temas claro e escuro e navegação por hash. Requer Node.js 22 LTS ou superior.

## Como rodar localmente

A partir da pasta `permaneo-app`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Em macOS ou Linux, use `npm`. Abra a URL exibida pelo Vite. No Windows, o sufixo `.cmd` permite executar o npm no PowerShell sem depender da política de execução de scripts.

## Organização

- `src/components/` reúne componentes compartilhados e o controlador da navegação do protótipo.
- `src/pages/` agrupa landing, login e painéis por perfil.
- `src/images/` contém os recursos visuais locais.
- `tests/` contém a verificação das rotas, dos temas e de interações do protótipo.

## Validação

```bash
npm test
npm run build
npm run preview
```

A opção **Explorar sem preencher** abre as telas com dados fictícios. As alterações feitas na demonstração ficam no navegador.
