# Arquitetura

O Permaneo é um protótipo web em React. O Vite gera os arquivos estáticos do app. A navegação por hash permite abrir as telas em hospedagem estática.

| Etapa | Fluxo na demonstração |
| --- | --- |
| Entrada | A pessoa escolhe Coordenação, Professor ou Estudante para explorar as respectivas telas |
| Consulta | O frontend usa os dados fictícios do projeto e os registros salvos no navegador |
| Registro | Assentos, observações e outras alterações demonstrativas são salvos no armazenamento local do navegador |

Cada navegador tem seus próprios registros. A seleção de perfil serve para navegar pela demonstração e não autentica contas reais. As telas ficam organizadas por área em `permaneo-app/src/pages`.
