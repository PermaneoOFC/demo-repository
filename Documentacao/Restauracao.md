# Recuperação da versão anterior aos widgets

## Fonte conferida

A versão funcional mais completa encontrada nas referências acessíveis de `gabrielrgg/Permaneo-OFC` é de 31/10/2026. A `main` e a branch `refactor/area-aluno-20261031` têm o mesmo conteúdo: o trabalho descrito em **commit aluno**, incorporado por **Merge pull request #1 from gabrielrgg/refactor/area-aluno**. A inclusão de UserWay/VLibras no repositório da empresa ocorreu depois, mas a importação anterior não trouxe todo esse frontend.

Nesta recuperação foi comparado o conjunto completo de componentes, páginas, dados, estilos e rotas, em vez de recuperar somente a área do aluno. Os caminhos foram adaptados à estrutura atual de `permaneo-app`.

## Recursos recuperados

- Menu e cabeçalho compartilhados nos três perfis, com navegação por hash e troca de tema.
- Perfis de estudantes com abas de frequência/faltas, notas, histórico, observações, contatos e alertas.
- Registros demonstrativos de acompanhamento e observações persistidos no navegador.
- Cadastro local de estudantes, abertura de seus perfis, busca e filtros.
- Formulários, campos e controles de configuração da versão anterior.
- Área completa do aluno com atividades, calendário, disciplinas, avisos, metas e apoio.
- Fontes locais e mídia original da home.

A integração existente de frequência com a API foi mantida separadamente e continua disponível no login quando habilitada. Os recursos locais recuperados usam dados fictícios e não enviam registros nem mensagens à escola.

## Acessibilidade integrada depois da recuperação

UserWay e VLibras continuam carregados uma única vez, fora da árvore React. O reset visual dos botões fica limitado ao aplicativo. O UserWay usa a posição lateral direita e seu lançador é colocado 12 px abaixo do VLibras. O ajuste fica em `src/styles/accessibility.css` e não muda os estilos dos painéis dos widgets.

## Verificação

Em `permaneo-app`, com Google Chrome instalado:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run test:profile
npm.cmd run test:shell
npm.cmd run test:student
npm.cmd run test:accessibility
npm.cmd run build
```

Com `npm.cmd run dev -- --host 127.0.0.1` aberto, execute também `npm.cmd run test:widgets` e `npm.cmd run test:browser`. As verificações exercitam funcionalidades e persistência, além de renderização, imagens, temas e responsividade. O teste de widgets mede as caixas reais dos ícones em computador e celular e verifica abertura do menu e navegação.
