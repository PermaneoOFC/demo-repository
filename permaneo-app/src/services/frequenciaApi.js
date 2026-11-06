export const frequenciaIntegrada = import.meta.env.VITE_FREQUENCIA_INTEGRADA === 'true';

async function requisitar(caminho, { metodo = 'GET', dados, token, signal } = {}) {
  let resposta;
  try {
    resposta = await fetch('/api' + caminho, {
      method: metodo,
      headers: {
        Accept: 'application/json',
        ...(dados && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: 'Bearer ' + token }),
      },
      body: dados && JSON.stringify(dados),
      signal,
    });
  } catch (erro) {
    if (erro.name === 'AbortError') throw erro;
    throw new Error('Não foi possível conectar ao servidor do Permaneo.');
  }

  if (!resposta.ok || !resposta.headers.get('content-type')?.includes('application/json')) {
    const erro = new Error(
      resposta.status === 401
        ? (token ? 'Sua sessão terminou. Entre novamente.' : 'E-mail ou senha inválidos.')
        : 'Não foi possível concluir a solicitação. Tente novamente.',
    );
    erro.status = resposta.status;
    throw erro;
  }
  return resposta.json();
}

export function entrar(email, senha) {
  return requisitar('/auth/login', { metodo: 'POST', dados: { email, senha } });
}

export function listarFrequencia(token, signal) {
  return requisitar('/frequencia', { token, signal });
}

export function salvarFrequencia(token, id, situacao) {
  return requisitar('/frequencia/' + id, { metodo: 'PUT', dados: { situacao }, token });
}
