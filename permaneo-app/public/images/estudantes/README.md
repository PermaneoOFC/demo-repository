# Retratos demonstrativos

Oito personagens fictícios gerados individualmente para a demonstração do Permaneo.
Nenhuma fotografia de estudante real foi utilizada como referência. Os retratos não
representam os estudantes reais que possam ter nomes iguais aos dados de exemplo.

Arquivos WebP locais, 512 × 512 px, qualidade 84, entre 11 e 22 KB por retrato.
O nome de cada arquivo corresponde ao ID estável em `src/data/students.js`.
Não há dependência de serviço externo, sorteio de imagens ou vínculo pela posição na lista.

Direção dos prompts: fotografia escolar individual de personagem brasileiro fictício
de 14 anos; cabeça e ombros; expressão natural; fundo cinza quente; iluminação difusa;
rosto centralizado, cabelo inteiro visível; roupas casuais sem marcas; sem texto.
Variações individuais: Lucas (cachos curtos, camiseta azul-marinho), Camila (tranças,
camiseta azul-petróleo), Isabela (cabelo ruivo ondulado, sardas), Eduardo (cabelo preto
com franja, óculos), Yasmin (cachos soltos, camiseta terracota), Livia (cabelo curto
escuro, camiseta azul), AnaBeatriz (cabelo afro, camiseta lavanda), Heitor (cabelo
castanho ondulado, camiseta verde).

`StudentPortrait` centraliza a exibição, texto alternativo, carregamento e fallback
ilustrado inline. Fotos enviadas para novos cadastros locais continuam preservadas.
O fallback é usado apenas em ausência ou falha de imagem, sem novas requisições.

Validação: `npm run test:portraits`.
