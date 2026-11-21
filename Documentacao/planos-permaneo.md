# Planos Permaneo e visão futura

Entrega inicial de 14/11/2026, com preço mensal atualizado em 21/11/2026, na homepage existente (`#/home`). Nenhuma publicação,
cobrança, assinatura ou envio de mensagem foi realizado.

## O que mudou

- Dois planos por instituição, com os mesmos recursos: mensal de R$ 249 + R$ 6,90
  por aluno; anual equivalente a R$ 210 + R$ 5,90 por aluno/mês, por 12 meses.
- Cards responsivos, entrada com GSAP, estados de interação e detalhes em modal.
- Calculadora compartilhada entre homepage e modal: total mensal, projeção de
  12 meses, comparação e economia, com cálculos em centavos inteiros.
- Acima de 1.000 alunos, apenas proposta sob medida, sem total fechado ou economia
  calculada. Valores vazios, negativos, fracionários e fora do intervalo seguro
  de inteiros são rejeitados.
- Oito recursos com detalhes e seu estágio atual. Painel, carômetro e calendário
  exibem capturas reais da demonstração, com dados fictícios.
- Visão futura separada dos planos: painel expansível sobre câmeras e IA,
  animação decorativa limitada a dois ciclos, validação humana e salvaguardas.
- Formulário comercial validado que prepara e baixa um resumo local. Não envia,
  não persiste dados e não confirma contratação.
- Navegação `Planos` e atualização do link `Simulador · Em breve` no tema escuro.
  A navegação usa rolagem dentro da homepage sem alterar o hash do roteador.

Não havia preços antigos de R$ 150/R$ 5,50 no código local da homepage. Esses
valores apareciam no pitch de referência e não foram reproduzidos. As demais
seções e telas foram preservadas.

## Arquivos

| Arquivo relativo ao repositório | Responsabilidade |
| --- | --- |
| `permaneo-app/src/pages/Landing/HomeLight.jsx` | Integração e acesso aos planos no tema claro |
| `permaneo-app/src/pages/Landing/HomeDark.jsx` | Integração, acesso aos planos e link do simulador no tema escuro |
| `permaneo-app/src/pages/Landing/commercial/CommercialSection.jsx` | Planos, funcionalidades, visão futura e contato |
| `permaneo-app/src/pages/Landing/commercial/CommercialSection.module.css` | Identidade, temas, responsividade, estados e movimento reduzido |
| `permaneo-app/src/pages/Landing/commercial/CommercialDialog.jsx` | Dialog nativo, isolamento de foco, Escape, fechamento e retorno do foco |
| `permaneo-app/src/pages/Landing/commercial/InvestmentCalculator.jsx` | Quantidade, alternância de modalidade e comparação |
| `permaneo-app/src/pages/Landing/commercial/ProposalForm.jsx` | Validação e download do resumo sem envio |
| `permaneo-app/src/pages/Landing/commercial/pricing.js` | Valores e funções puras de cálculo/formatação |
| `permaneo-app/src/pages/Landing/commercial/features.js` | Descrições, estágios e rotas demonstrativas |
| `permaneo-app/public/previews/*.webp` | Três capturas reais do aplicativo |
| `permaneo-app/public/previews/README.md` | Proveniência e instruções de atualização das capturas |
| `permaneo-app/tests/pricing.test.mjs` | Testes automatizados dos cálculos e limites |
| `permaneo-app/tests/commercial-browser.mjs` | Fluxo comercial, teclado, responsividade e capturas |
| `permaneo-app/tests/capture-commercial-previews.mjs` | Atualização reproduzível das prévias |
| `permaneo-app/package.json` e `package-lock.json` | GSAP e comandos de teste |

## Verificação executada

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run build` | Aprovado após os ajustes finais |
| `node --test tests/pricing.test.mjs` | 7 testes aprovados; valida todas as quantidades de 1 a 1.000 |
| `npm.cmd test` | 70 combinações de rota/tema; login, busca, registros, persistência e responsividade aprovados |
| `npm.cmd run test:commercial` | Aprovado em 1440 e 390 px, claro e escuro, mais caminho com movimento normal |
| Conferência visual | Planos, calculadora, recursos, visão futura, modais e formulário nos dois temas/tamanhos |
| `git diff --check` | Sem erros de whitespace nos arquivos rastreados |

O teste comercial cobre campos inválidos, limite de 1.000 alunos, ausência de preço
acima do limite, alternância de plano no modal, estado compartilhado, ciclo de Tab,
Escape, devolução de foco, validação do formulário, download do resumo, abertura
dos oito recursos, carregamento das prévias, expansão/recolhimento, navegação,
overflow do documento e do conteúdo de cada seção e ausência de erros JavaScript.

Exemplo conferido para 100 alunos:

| Modalidade | Mensal/equivalente | Em 12 meses |
| --- | ---: | ---: |
| Mensal | R$ 939,00 | R$ 11.268,00 |
| Anual | R$ 800,00 | R$ 9.600,00 |

Economia anual: **R$ 1.668,00**.

Para repetir a verificação, inicie o Vite e execute na pasta `permaneo-app`:

```powershell
npm.cmd run test:pricing
$env:BASE_URL='http://localhost:5173'
npm.cmd run test:commercial
```

É necessário Google Chrome para os testes de navegador. As capturas ficam em
`.impeccable/review/`, na raiz do repositório. Os testes comerciais bloqueiam os
widgets externos UserWay/VLibras para isolar o fluxo; esses serviços não foram
alterados. Capturas de seções ocultam apenas o skip-link sem foco e o toast
transitório para evitar artefatos de captura; o teste de teclado usa a UI real.

## Limitações e decisões

- **Contato comercial:** não há e-mail, WhatsApp ou endpoint comercial configurado
  nesta base. O formulário informa isso antes de coletar dados e oferece somente
  preparação/download local. Conectar o envio requer um destino comercial real.
- **Estágio dos recursos:** o conteúdo reflete esta cópia local, que é demonstrativa.
  Registros, chamada, calendário e pedidos locais não são apresentados como
  integrações institucionais de produção. Os níveis automáticos de faltas de 5%,
  8%, 10% e 15% são identificados como planejados; SMS/e-mail não são prometidos
  como disponíveis.
- **Câmeras e IA:** conteúdo conceitual, sem acesso a câmera, captura, identificação
  ou processamento de imagens. Sem preço, data de lançamento ou contratação.
- **Contrato anual:** o valor mensal é um equivalente de 12 meses; não foi inventada
  uma condição de parcelamento. A proposta deverá especificar forma de pagamento
  e confirmar disponibilidade dos recursos.
- **Design:** extensão da identidade existente com as fontes solicitadas, já
  disponíveis localmente. O motor CLI do Impeccable não estava instalado; a
  verificação visual e de código foi feita diretamente, sem detector automático.
- **Publicação:** alterações somente no checkout local; produção Vercel não alterada.

Uma falha inicial do teste geral ocorreu por conflito de porta, resolvida antes
da execução aprovada. Falhas iniciais de captura por carregamento assíncrono foram
corrigidas aguardando a tela e o tema certos; a prévia final do carômetro foi
conferida visualmente.

## Coerência visual e revisão

A comparação com `HomeLight.module.css`, `HomeDark.module.css` e a captura
`before.png` confirmou a continuidade da paleta Permaneo, das superfícies tonais,
dos cards arredondados e dos botões de 10 px. A seção comercial conserva
#246579, #A8E0ED, #F7F9F8, #203C46 e #227457 e adapta suas superfícies ao tema
escuro existente. Bricolage Grotesque e Public Sans usam arquivos locais e ficam
restritas à seção solicitada; a tipografia das demais seções foi preservada.

Na documentação final foram examinados o pedido, `PRODUCT.md`, a integração nos
dois componentes Home, o CSS comercial, a proveniência das três prévias e as
capturas `before.png`, `desktop.png` e `mobile-dark.png`. A revisão independente
de acabamento examinou as 24 capturas finais e retornou **ship**, sem problema
material; os testes e a limitação do detector estão registrados acima.

Esta é uma extensão da homepage e não requer novos tokens globais. `PRODUCT.md`
foi preservado; não foi criado `DESIGN.md` nem um sistema global a partir de
decisões locais desta seção.
