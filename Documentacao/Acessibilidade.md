# Acessibilidade

O app inclui temas claro e escuro, foco visível, seleção de perfil por teclado e mensagens de erro anunciadas por leitores de tela. A tela de frequência integrada usa rótulos de formulário, tabela com cabeçalhos semânticos e situação expressa em texto. Em telas estreitas, a tabela pode ser rolada horizontalmente.

Os alertas do protótipo devem apoiar conversas e intervenções pedagógicas. A interface usa linguagem de acompanhamento, com atenção ao contexto de cada estudante.

## Recursos globais

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
