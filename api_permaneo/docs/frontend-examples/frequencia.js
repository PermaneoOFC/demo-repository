// Execute no console de uma página na mesma origem da API.
async function consultarFrequencia(email, senha) {
  const login = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (!login.ok) throw new Error('Falha no login: ' + login.status);

  const { token } = await login.json();
  const frequencia = await fetch('/api/frequencia', {
    headers: { Authorization: 'Bearer ' + token },
  });

  if (!frequencia.ok) throw new Error('Falha na consulta: ' + frequencia.status);
  return frequencia.json();
}
