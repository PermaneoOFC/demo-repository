# Validação técnica — Permaneo Cinematic Launch

Revisão auditada: `a0bebcdb8d1c3216e80635c48d6a7066f67de387`.

| Verificação | Horizontal | Vertical |
| --- | --- | --- |
| Duração | 88,000 s | 88,000 s |
| Resolução | 1920 × 1080 | 1080 × 1920 |
| Quadros | 2640 | 2640 |
| Taxa de quadros | 30 fps constante | 30 fps constante |
| Vídeo / pixels | H.264 / yuv420p | H.264 / yuv420p |
| Áudio | AAC estéreo, 48 kHz, 256 kb/s | AAC estéreo, 48 kHz, 256 kb/s |
| Legendas | Visuais + mov_text em português | Visuais + mov_text em português |
| Decodificação integral FFmpeg | Sem erros ou avisos | Sem erros ou avisos |
| Segmentos pretos detectados | Nenhum | Nenhum |
| Quadros extraídos e inspecionados | 18 | 18 |

A detecção de preto usou `blackdetect=d=0.08:pix_th=0.04:pic_th=0.99`. Os fundos escuros intencionais mantêm identidade, texto ou movimento visível.

A mixagem PCM medida apresentou **−17,53 LUFS integrados**, **−1,50 dBTP** e **10,30 LU de faixa de loudness**. O ducking reduz a música com base no envelope da voz. Os stems foram verificados sem amostras clipadas. A voz é masculina sintética pt-BR-AntonioNeural; a trilha e os efeitos foram sintetizados originalmente para a peça.

Foram corrigidos um glifo de seta ausente no encerramento, o enquadramento da Sala Virtual e as proporções dos recortes de detalhe. Os efeitos de transição foram realinhados aos cortes finais antes da multiplexação. A versão vertical usa composição própria. O símbolo oficial preserva a proporção 40:31.

A captura Playwright não registrou erros de JavaScript. Foram exercitados o acesso demonstrativo, filtros do painel, abas do perfil, criação de observação, criação de acompanhamento, download CSV e navegação dos perfis de professor e estudante. As ações ocorreram em navegador isolado com dados fictícios. Não houve uso de conta real nem alteração do código da aplicação.

Os MP4s também foram abertos em Chromium por HTTP local. O player reconheceu dimensões e duração, iniciou a reprodução e avançou o tempo sem erro. Resultado em `deliverables/browser-playback.json`.

**Limitações:** o MP4 anterior citado no briefing não estava disponível. Esta é uma nova produção a partir do protótipo e dos assets da revisão auditada. A inspeção visual foi feita por amostragem; não equivale a uma avaliação humana integral de locução e mixagem em estúdio. As interfaces são capturas 1440 × 900 compostas na resolução final; a gravação nativa é convertida para 30 fps.

Tamanhos e SHA-256 estão em `deliverables/validation.json`. Folhas de contato: `deliverables/contato-horizontal.jpg` e `deliverables/contato-vertical.jpg`.
