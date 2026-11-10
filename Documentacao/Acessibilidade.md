# Acessibilidade

O app inclui temas claro e escuro, foco visível, seleção de perfil por teclado e mensagens de erro anunciadas por leitores de tela. A tela de frequência integrada usa rótulos de formulário, tabela com cabeçalhos semânticos e situação expressa em texto. Em telas estreitas, a tabela pode ser rolada horizontalmente.

Os alertas do protótipo devem apoiar conversas e intervenções pedagógicas. A interface usa linguagem de acompanhamento, com atenção ao contexto de cada estudante.

## Recursos globais

### Preservação da interface

As regras de tokens e responsividade recuperadas do repositório anterior ficam nos CSS Modules das telas e no `Layout.module.css`. Elas são necessárias porque as classes exportadas do Figma não são compiladas por Tailwind neste projeto. Removê-las pode manter o build funcionando e, mesmo assim, quebrar a interface.

O reset dos botões é limitado a `:where(#root) button`: a baixa especificidade permite que os CSS Modules definam a aparência e evita modificar os controles externos do UserWay. Os componentes de botão usados fora de outros botões usam elementos nativos, preservando a navegação por teclado. Os widgets são iniciados após a montagem inicial do React e ficam fora da árvore do aplicativo.

### Testes de regressão

Na pasta `permaneo-app`, execute:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run test:accessibility
npm.cmd run dev -- --host 127.0.0.1
```

Com o servidor aberto, em outro terminal na mesma pasta:

```powershell
npm.cmd run test:browser
npm.cmd run build
```

Os testes de navegador usam Google Chrome instalado. `BASE_URL` permite testar outra URL. A bateria percorre 35 rotas nos temas claro/escuro e larguras de 390, 900 e 1440 px, verificando erros de renderização, imagens e transbordamento horizontal. Também testa entrada demonstrativa nos três perfis, abertura dos widgets, fechamento do VLibras e navegação com os scripts externos indisponíveis. A área completa do aluno tem uma bateria adicional (`npm.cmd run test:student`) para entregas, filtros, persistência, calendário, metas, avisos e apoio. Capturas locais ficam em `test-results/`, ignorado pelo Git.

Os testes demonstrativos não comprovam conexão com a API/MySQL nem validam a qualidade da tradução automática. Essas verificações precisam do ambiente de backend e de revisão humana.

A home usa a mídia original de `gabrielrgg/Permaneo-OFC/src/imagens/hero-school.png`, copiada sem alterar o conteúdo para `src/images/hero-school.gif`. Apesar da extensão `.png` no repositório antigo, a assinatura do arquivo é `GIF89a`: trata-se de um GIF animado. As duas versões de tema usam esse mesmo arquivo local. A análise anterior de que o histórico só continha uma imagem estática foi corrigida após conferir o formato real do arquivo.

O ponto de entrada `permaneo-app/src/main.jsx` carrega os widgets uma vez por abertura do site, fora do ciclo de renderização do React. Assim, permanecem disponíveis na landing page, login e telas de direção, professor e estudante, nos dois temas.

- **VLibras:** tradução automática de português para Libras, pelo script oficial. O botão fica à direita.
- **UserWay:** menu de acessibilidade em português, com botão na cor do Permaneo no canto inferior esquerdo, separado do VLibras. As funções disponíveis dependem da configuração e do plano da conta UserWay.

### Configuração do UserWay

O identificador público `csVkjYy3VL`, fornecido pelo responsável do Permaneo, já está configurado como padrão em `main.jsx`. Não é necessário criar uma variável de ambiente para ativá-lo.

1. No painel UserWay do projeto, confira se o domínio publicado está cadastrado na conta.
2. Para usar outra conta, defina `VITE_USERWAY_ACCOUNT_ID` no arquivo local `permaneo-app/.env` ou no serviço de hospedagem. Use somente o valor público de `data-account`, nunca senha ou chave privada.
3. Uma variável explicitamente vazia desativa o UserWay. Após alterar a variável, reinicie o Vite ou faça um novo build em produção.

O VLibras funciona de forma independente do UserWay. Os scripts são assíncronos e uma falha de rede no widget não impede o carregamento do aplicativo. Uma nova abertura da página tenta carregar novamente.

### Verificação no site publicado

- Abra os dois widgets na landing page, no login e em cada perfil; navegue sem recarregar e confirme que os botões não duplicam.
- Teste desktop, celular e temas claro/escuro. Confira se os painéis não encobrem ações necessárias.
- Com a conta UserWay real, confira os ajustes disponíveis e sua aplicação após trocar de tela.
- Teste teclado, foco e tradução com conteúdo demonstrativo. Tradução automática e widgets complementam a acessibilidade; não substituem rótulos, semântica, contraste e revisão das telas.
- Os recursos dependem dos serviços externos UserWay e VLibras; revise a privacidade antes de usar dados reais de estudantes.

Referências: [UserWay — atributos do script](https://help.userway.org/en/articles/15073139-userway-widget-advanced-script-attributes-guide) e [VLibras — integração web](https://www.vlibras.gov.br/doc/widget/installation/webpageintegration.html).
