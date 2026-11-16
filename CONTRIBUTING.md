# Contribuição e organização do Git — Permaneo

## Branch de trabalho

- A branch oficial compartilhada pela equipe é **`main`**.
- Antes de começar uma tarefa, atualize a cópia local da `main`.
- Não crie branches permanentes por pessoa, ferramenta ou tarefa.
- Preserve o histórico já publicado: não use `push --force` nem altere commits antigos que outros integrantes já receberam.
- Se uma alteração grande precisar de revisão, alinhe previamente com a equipe. A branch de trabalho temporária deverá ser removida depois da integração.

## Mensagens de commit

Use **Conventional Commits**, em português, com o formato:

```text
tipo(área): descrever a mudança de forma objetiva
```

Tipos aceitos:
- `feat`: adicionar funcionalidade
- `fix`: corrigir problema
- `refactor`: reorganizar código sem alterar o comportamento
- `style`: ajustar visual ou formatação
- `docs`: atualizar documentação
- `test`: adicionar ou corrigir testes
- `chore`: manutenção técnica
- `perf`: melhorar desempenho

Exemplos:

```text
feat(home): adicionar carrossel interativo da equipe
feat(professor): implementar navegação da sala virtual
fix(login): corrigir retorno à página inicial
style(mobile): ajustar cards para telas pequenas
docs(projeto): atualizar instruções de instalação
test(planos): validar cálculo por aluno
```

Regras:
1. Explique **o que mudou**, não qual ferramenta foi usada.
2. Evite mensagens vagas como `update`, `changes`, `ajustes` ou `versão final`.
3. Não use nomes de ferramentas ou agentes como título, escopo, assinatura automática ou sufixo do commit.
4. Separe mudanças de assuntos diferentes em commits distintos.
5. Não altere a autoria de outra pessoa ao corrigir um commit.

## Rotina compartilhada

Antes de editar:

```bash
git switch main
git pull --rebase origin main
```

Depois de testar a mudança:

```bash
git status
git add caminho/do/arquivo
git commit -m "feat(home): descrever a funcionalidade"
git push origin main
```

Se o push for rejeitado porque outro integrante atualizou a `main`, integre as mudanças remotamente com `git pull --rebase origin main`, resolva eventuais conflitos e tente novamente **sem forçar o push**.

## Revisão

Antes de enviar, verifique se a aplicação continua funcionando, se o código não contém credenciais e se a mensagem do commit descreve fielmente a alteração.
