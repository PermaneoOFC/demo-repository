# Retratos demonstrativos do Permaneo 2.0

Os oito retratos representam personagens fictícios. A geração integrada do ImageGen não recebeu fotografias nem dados pessoais de estudantes como referência. As duas folhas de quatro retratos foram recortadas em WebP local, 512 × 512 px, qualidade 81, com cerca de 15 a 31 KB por estudante.

O nome de cada arquivo corresponde ao ID estável em src/data/students.js. O componente StudentPortrait resolve esse ID ao exibir o retrato em cada ambiente e usa uma ilustração estável se a foto estiver ausente ou falhar. Cadastros locais continuam usando a foto já carregada pelo usuário.

## Instruções de geração

Cada folha contém uma grade exata 2 × 2, sem margens ou texto. Os personagens são adolescentes brasileiros fictícios de 14 a 16 anos. Retratos escolares de cabeça e ombros, cabelo visível, luz natural suave, pele sem retoque, expressão espontânea e roupas casuais sem marca. Cada retrato recebe um ambiente escolar desfocado e um enquadramento ligeiramente diferente.

| Folha e posição | Personagem | Direção do retrato |
| --- | --- | --- |
| 1, superior esquerda | Lucas | Pele morena, cachos curtos, camiseta azul-marinho, sorriso tímido, parede de sala azul-petróleo clara |
| 1, superior direita | Camila | Pele negra, tranças longas, camiseta azul-petróleo, sorriso relaxado, corredor claro |
| 1, inferior esquerda | Isabela | Pele clara com sardas, cabelo ruivo ondulado, camiseta cinza-azulada, sorriso discreto, pátio esverdeado |
| 1, inferior direita | Eduardo | Pele oliva clara, franja preta, óculos retangulares, camiseta cinza, biblioteca |
| 2, superior esquerda | Yasmin | Pele morena, cachos escuros soltos, camiseta terracota, meio sorriso, corredor azul-claro |
| 2, superior direita | Lívia | Pele morena clara, cabelo curto escuro, camiseta azul, cabeça inclinada, janela da escola |
| 2, inferior esquerda | Ana Beatriz | Pele negra, cabelo afro arredondado, camiseta lavanda, sorriso aberto, parede verde de pátio |
| 2, inferior direita | Heitor | Pele clara, cabelo castanho ondulado, camiseta verde-musgo, sorriso discreto, corredor de tijolos |

Validação com npm run test:portraits.
