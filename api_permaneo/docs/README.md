# API Permaneo

API REST com Java 21, Spring Boot, Spring Data JPA e MySQL. O pacote `br.com.permaneo.api` separa controllers, DTOs, entidades, enums, repositórios, segurança e serviços. As senhas ficam como hashes BCrypt e os endpoints de frequência recebem um token JWT com validade de uma hora.

## Como rodar

Requer o **JDK 21** e o [MySQL configurado](../../database/README.md). Abra o terminal na pasta `api_permaneo`. Defina as variáveis antes de iniciar. No PowerShell:

```powershell
$env:DB_URL = 'jdbc:mysql://localhost:3306/permaneo'
$env:DB_USER = 'permaneo'
$env:DB_PASSWORD = 'COLE_A_SENHA_LOCAL_DO_BANCO'
$env:JWT_SECRET = [Guid]::NewGuid().ToString('N') + [Guid]::NewGuid().ToString('N')
.\mvnw.cmd spring-boot:run
```

Em macOS ou Linux:

```bash
export DB_URL='jdbc:mysql://localhost:3306/permaneo'
export DB_USER='permaneo'
export DB_PASSWORD='COLE_A_SENHA_LOCAL_DO_BANCO'
export JWT_SECRET="$(openssl rand -hex 32)"
./mvnw spring-boot:run
```

Use os valores de banco definidos na sua instalação. As variáveis correspondem ao [exemplo](../.env.example). O Spring lê as variáveis do terminal. A URL padrão do Swagger é [http://127.0.0.1:8080/swagger-ui.html](http://127.0.0.1:8080/swagger-ui.html).

## Endpoints

| Método | Rota | Acesso |
| --- | --- | --- |
| GET | `/api/saude` | Verifica se a API e o banco respondem |
| POST | `/api/auth/login` | Recebe `email` e `senha`, retorna `token`, `nome` e `perfil` |
| GET | `/api/frequencia` | Token obrigatório. Os registros são filtrados pelo perfil da conta |
| PUT | `/api/frequencia/{id}` | Coordenação ou professor da turma. Recebe `situacao` |

O campo `situacao` aceita `PRESENTE`, `AUSENTE`, `JUSTIFICADA` ou `NAO_REGISTRADA`. Veja o [exemplo JavaScript](frontend-examples/frequencia.js). A API assume uma escola de demonstração e registros de aula já cadastrados no banco.

Para compilar, rode `./mvnw package` no macOS/Linux ou `.\mvnw.cmd package` no Windows.
