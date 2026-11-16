# Prévias reais da demonstração

Capturas do próprio frontend Permaneo, em 14/11/2026, no Chrome com viewport
de 1440 × 1000, tema claro e movimento reduzido. São imagens da interface,
não mockups gerados. Todos os nomes, indicadores e registros são fictícios.

| Arquivo | Origem no aplicativo |
| --- | --- |
| `director.webp` | `#/director` — painel da coordenação |
| `carometroManagement.webp` | `#/carometroManagement` — carômetro |
| `studentCalendar.webp` | `#/studentCalendar` — calendário do estudante |

Para atualizar, inicie o frontend e execute em `permaneo-app`:

```powershell
$env:BASE_URL='http://localhost:5173'
node tests/capture-commercial-previews.mjs
```

Não capturar contas reais ou dados de estudantes para essas imagens públicas.
