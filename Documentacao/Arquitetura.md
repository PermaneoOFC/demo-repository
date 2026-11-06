# Arquitetura

O repositório reúne quatro módulos independentes. O navegador renderiza o app React. Na tela de frequência integrada, o app chama a API REST na mesma origem. Os controllers recebem os pedidos, os serviços aplicam as regras de acesso, e os repositórios Spring Data leem ou gravam no MySQL.

| Etapa | Fluxo integrado |
| --- | --- |
| Login | E-mail e senha → validação BCrypt → emissão de token JWT |
| Consulta | Token → perfil e identificação da conta → consulta filtrada → tabela |
| Registro | Token de coordenação ou professor → verificação de turma → atualização transacional → confirmação na tela |

O protótipo usa rotas por hash para abrir as telas em hospedagem estática. As telas existentes continuam divididas por tema e organizadas por domínio em `permaneo-app/src/pages`. A rota `#frequencia` só fica disponível com a integração ativada.

O banco trabalha com registros por componente e data. O cálculo de faltas consecutivas, o histórico de contato e as notificações automáticas permanecem como evolução de produto.
