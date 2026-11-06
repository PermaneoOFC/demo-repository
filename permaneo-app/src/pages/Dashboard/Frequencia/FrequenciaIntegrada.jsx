import { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import TextField from '../../../components/ui/TextField.jsx';
import { entrar, listarFrequencia, salvarFrequencia } from '../../../services/frequenciaApi.js';
import styles from './FrequenciaIntegrada.module.css';

const situacoes = {
  PRESENTE: 'Presente',
  AUSENTE: 'Ausente',
  JUSTIFICADA: 'Justificada',
  NAO_REGISTRADA: 'Não registrada',
};

const perfis = {
  DIRECAO: 'Coordenação',
  PROFESSOR: 'Professor',
  ESTUDANTE: 'Estudante',
};

const formatoData = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

export default function FrequenciaIntegrada({ onVoltar, dark, onToggleTheme }) {
  const [sessao, setSessao] = useState(null);
  const [registros, setRegistros] = useState(null);
  const [carregandoLogin, setCarregandoLogin] = useState(false);
  const [salvandoId, setSalvandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [tentativa, setTentativa] = useState(0);

  function sair() {
    setSessao(null);
    setRegistros(null);
    setErro('');
    setAviso('');
  }

  function tratarErro(erro, token) {
    if (erro.status === 401 && token) sair();
    setErro(erro.message);
  }

  useEffect(() => {
    if (!sessao) return;
    const requisicao = new AbortController();
    listarFrequencia(sessao.token, requisicao.signal)
      .then(setRegistros)
      .catch((erro) => {
        if (!requisicao.signal.aborted) tratarErro(erro, sessao.token);
      });
    return () => requisicao.abort();
  }, [sessao, tentativa]);

  async function iniciarSessao(evento) {
    evento.preventDefault();
    const campos = new FormData(evento.currentTarget);
    setCarregandoLogin(true);
    setErro('');
    try {
      const dados = await entrar(campos.get('email').trim(), campos.get('senha'));
      setSessao(dados);
    } catch (erro) {
      tratarErro(erro);
    } finally {
      setCarregandoLogin(false);
    }
  }

  async function registrar(id, situacao) {
    setSalvandoId(id);
    setErro('');
    setAviso('');
    try {
      const atualizado = await salvarFrequencia(sessao.token, id, situacao);
      setRegistros((atuais) => atuais?.map((registro) => registro.id === id ? atualizado : registro));
      setAviso('Frequência salva.');
    } catch (erro) {
      tratarErro(erro, sessao.token);
    } finally {
      setSalvandoId(null);
    }
  }

  return (
    <section className={styles.pagina} onClick={(evento) => evento.stopPropagation()}>
      <header className={styles.cabecalho}>
        <Button variant="secondary" onClick={onVoltar}>Voltar ao login da demonstração</Button>
        <Button variant="secondary" onClick={onToggleTheme}>{dark ? 'Tema claro' : 'Tema escuro'}</Button>
      </header>
      <div className={styles.painel}>
        <p className={styles.legenda}>PERMANEO</p>
        <h1>Frequência integrada</h1>
        {!sessao ? (
          <form className={styles.formulario} onSubmit={iniciarSessao}>
            <p>Use uma conta de teste do projeto para consultar o banco de demonstração.</p>
            <TextField label="E-mail" name="email" type="email" autoComplete="username" maxLength={254} required />
            <TextField label="Senha" name="senha" type="password" autoComplete="current-password" maxLength={72} required />
            {erro && <p className={styles.erro} role="alert">{erro}</p>}
            <Button type="submit" disabled={carregandoLogin}>{carregandoLogin ? 'Entrando…' : 'Entrar'}</Button>
          </form>
        ) : (
          <>
            <div className={styles.sessao}>
              <p>{sessao.nome} · {perfis[sessao.perfil]}</p>
              <Button variant="secondary" onClick={sair} disabled={salvandoId !== null}>Sair</Button>
            </div>
            {erro && <p className={styles.erro} role="alert">{erro}</p>}
            {aviso && <p role="status">{aviso}</p>}
            {!registros && !erro && <p role="status">Carregando frequência…</p>}
            {!registros && erro && (
              <Button variant="secondary" onClick={() => { setErro(''); setTentativa(tentativa + 1); }}>
                Tentar novamente
              </Button>
            )}
            {registros?.length === 0 && <p>Nenhum registro de frequência disponível.</p>}
            {registros?.length > 0 && (
              <div className={styles.tabela}>
                <table>
                  <caption>Registros de frequência</caption>
                  <thead><tr><th scope="col">Data</th><th scope="col">Componente</th><th scope="col">Turma</th><th scope="col">Estudante</th><th scope="col">Situação</th></tr></thead>
                  <tbody>
                    {registros.map((registro) => {
                      const data = formatoData.format(new Date(registro.dataAula));
                      return (
                        <tr key={registro.id}>
                          <td>{data}</td>
                          <td>{registro.componente}</td>
                          <td>{registro.turma}</td>
                          <td>{registro.estudante}</td>
                          <td>
                            {sessao.perfil === 'ESTUDANTE' ? situacoes[registro.situacao] : (
                              <select
                                aria-label={`Situação de ${registro.estudante} em ${registro.componente}, ${data}`}
                                value={registro.situacao}
                                disabled={salvandoId !== null}
                                onChange={(evento) => registrar(registro.id, evento.target.value)}
                              >
                                {Object.entries(situacoes).map(([valor, rotulo]) => <option key={valor} value={valor}>{rotulo}</option>)}
                              </select>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
