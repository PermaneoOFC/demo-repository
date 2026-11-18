import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Armchair,
  Bell,
  History,
  Info,
  RotateCcw,
  Save,
  SlidersHorizontal,
  UserRoundCheck,
} from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { turmasDemo } from '../../data/sala.js';
import styles from './SettingsView.module.css';

const defaultTeacherSettings = {
  staffAlerts: true,
  dailyDigest: true,
  coordinationReturn: true,
  attendanceReminder: true,
  roomView: 'mapa',
  roomCamera: 'isometrica',
  carometroMode: 'cards',
  highlightSignals: true,
  consecutiveAbsences: '3',
  attentionFrequency: '85',
  returnDays: '5',
};

const defaultDirectorSettings = {
  staffAlerts: true,
  dailyDigest: true,
  familyNotices: true,
  returnAlerts: true,
  defaultPeriod: 'Ano letivo (Fev–Set)',
  consecutiveAbsences: '3',
  minFrequency: '75',
  frequencyDrop: '8',
  gradeDrop: '0',
};

const defaultHistory = {
  director: [
    {
      id: 'init-dir-1',
      date: '07/10/2026',
      author: 'Marcos Silva · Direção',
      detail: 'Atualizou o status de acompanhamento de um estudante do 1º EM A.',
    },
  ],
  teacher: [
    {
      id: 'init-prof-1',
      date: '08/10/2026',
      author: 'Renata Oliveira · Professora',
      detail: 'Configurou lembretes de acompanhamento para as turmas 8º A e 9º A.',
    },
  ],
};

function todayLabel() {
  return new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

function SettingSwitch({ label, description, checked, onChange }) {
  return (
    <div className={styles.switchRow}>
      <div className={styles.switchText}>
        <strong>{label}</strong>
        <small>{description}</small>
      </div>
      <button
        type="button"
        role="switch"
        aria-label={label}
        aria-checked={Boolean(checked)}
        className={styles.switch}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}

export default function SettingsView({ role = 'director', localStudents = [], onNotify }) {
  const isTeacher = role === 'teacher';
  const defaults = isTeacher ? defaultTeacherSettings : defaultDirectorSettings;
  const [settings, setSettings] = useLocalStorage(`permaneo-demo-settings-${role}`, defaults);
  const [history, setHistory] = useLocalStorage(
    `permaneo-demo-settings-history-${role}`,
    defaultHistory[role] || defaultHistory.director
  );
  const [criteriaError, setCriteriaError] = useState('');
  const idPrefix = useId();

  const state = { ...defaults, ...settings };
  const actor = isTeacher ? 'Renata Oliveira · Professora' : 'Marcos Silva · Direção';

  const appendHistory = (detail) => {
    setHistory((previous) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        date: todayLabel(),
        author: actor,
        detail,
      },
      ...(Array.isArray(previous) ? previous : []),
    ].slice(0, 12));
  };

  const updateField = (key, value) => {
    setCriteriaError('');
    setSettings((previous) => ({ ...defaults, ...previous, [key]: value }));
  };

  const toggleSwitch = (key, label) => {
    const nextValue = !state[key];
    setSettings((previous) => ({ ...defaults, ...previous, [key]: nextValue }));
    appendHistory(`${nextValue ? 'Ativou' : 'Desativou'} "${label}".`);
    onNotify?.(`Preferência "${label}" ${nextValue ? 'ativada' : 'desativada'} nesta demonstração.`);
  };

  const savePreferences = (event) => {
    event.preventDefault();
    setSettings((previous) => ({ ...defaults, ...previous }));
    appendHistory(
      isTeacher
        ? 'Salvou preferências da Sala Virtual e do Carômetro.'
        : `Salvou preferências de comunicação e período padrão (${state.defaultPeriod}).`
    );
    onNotify?.('Preferências salvas nesta demonstração.');
  };

  const saveCriteria = (event) => {
    event.preventDefault();
    if (isTeacher) {
      const consecutive = Number(state.consecutiveAbsences);
      const freq = Number(state.attentionFrequency);
      const days = Number(state.returnDays);
      if (
        !Number.isInteger(consecutive) || consecutive < 1 || consecutive > 30 ||
        Number.isNaN(freq) || freq < 50 || freq > 100 ||
        !Number.isInteger(days) || days < 1 || days > 60
      ) {
        setCriteriaError('Informe valores válidos: faltas entre 1 e 30, frequência entre 50% e 100%, e retorno entre 1 e 60 dias.');
        return;
      }
      appendHistory(`Atualizou critérios da turma (${consecutive} faltas seguidas, atenção em ${freq}%, retorno em ${days} dias).`);
      onNotify?.('Critérios da turma salvos nesta demonstração.');
      return;
    }

    const consecutive = Number(state.consecutiveAbsences);
    const minFreq = Number(state.minFrequency);
    const drop = Number(state.frequencyDrop);
    const gradeDrop = Number(state.gradeDrop);
    if (
      !Number.isInteger(consecutive) || consecutive < 1 || consecutive > 30 ||
      Number.isNaN(minFreq) || minFreq < 50 || minFreq > 100 ||
      Number.isNaN(drop) || drop < 1 || drop > 50 ||
      Number.isNaN(gradeDrop) || gradeDrop < 0 || gradeDrop > 10
    ) {
      setCriteriaError('Confira os limites numéricos antes de salvar os critérios.');
      return;
    }
    appendHistory(`Atualizou critérios de atenção (${consecutive} faltas seguidas, meta ${minFreq}%, queda ${drop} pts).`);
    onNotify?.('Critérios salvos nesta demonstração.');
  };

  const restoreDefaults = () => {
    setCriteriaError('');
    setSettings(defaults);
    setHistory([
      {
        id: `reset-${Date.now()}`,
        date: todayLabel(),
        author: actor,
        detail: 'Restaurou as preferências padrão da demonstração.',
      },
      ...(defaultHistory[role] || []),
    ]);
    onNotify?.('Padrões demonstrativos restaurados neste navegador.');
  };

  const teacherClasses = turmasDemo.map((turma) => ({
    name: turma.nome,
    count: turma.estudantes.length + localStudents.filter((s) => s.className === turma.nome).length,
  }));

  return (
    <main className={styles.page} data-local-content>
      <header className={styles.intro}>
        <div>
          <p className={styles.context}>
            Escola Estadual Horizonte <span>· Demonstração {isTeacher ? 'docente' : 'da coordenação'}</span>
          </p>
          <h1>Configurações</h1>
          <p>
            {isTeacher
              ? 'Personalize os alertas das suas turmas, a abertura da Sala Virtual e os critérios de atenção.'
              : 'Ajuste os critérios de atenção, a comunicação da equipe e consulte o histórico de alterações.'}
          </p>
        </div>
        <button type="button" className={styles.secondaryAction} onClick={restoreDefaults}>
          <RotateCcw size={16} aria-hidden="true" />
          Restaurar padrões da demonstração
        </button>
      </header>

      <div className={styles.grid}>
        {isTeacher ? (
          <>
            <section className={styles.card} aria-labelledby="teacher-notif-title">
              <div className={styles.cardHeader}>
                <div>
                  <h2 id="teacher-notif-title">Notificações e alertas docentes</h2>
                  <p>Defina quais sinais aparecem com prioridade na sua rotina.</p>
                </div>
                <span className={styles.cardIcon}><Bell size={19} aria-hidden="true" /></span>
              </div>
              <div className={styles.switchList}>
                <SettingSwitch
                  label="Alertas para a equipe"
                  description="Destaca sinais de faltas seguidas em suas turmas."
                  checked={state.staffAlerts}
                  onChange={() => toggleSwitch('staffAlerts', 'Alertas para a equipe')}
                />
                <SettingSwitch
                  label="Resumo diário das minhas turmas"
                  description="Consolida presenças registradas e pendências do dia."
                  checked={state.dailyDigest}
                  onChange={() => toggleSwitch('dailyDigest', 'Resumo diário das minhas turmas')}
                />
                <SettingSwitch
                  label="Avisos de retorno da coordenação"
                  description="Exibe atualizações sobre conversas e encaminhamentos combinados."
                  checked={state.coordinationReturn}
                  onChange={() => toggleSwitch('coordinationReturn', 'Avisos de retorno da coordenação')}
                />
                <SettingSwitch
                  label="Lembrete de chamada pendente"
                  description="Sinaliza aulas do dia sem chamada salva nesta demonstração."
                  checked={state.attendanceReminder}
                  onChange={() => toggleSwitch('attendanceReminder', 'Lembrete de chamada pendente')}
                />
              </div>
              <p className={styles.cardFootnote}>Na demonstração, nenhum e-mail ou alerta externo é enviado de fato.</p>
            </section>

            <form className={styles.card} onSubmit={savePreferences} aria-labelledby="teacher-room-title">
              <div className={styles.cardHeader}>
                <div>
                  <h2 id="teacher-room-title">Preferências da Sala Virtual e Carômetro</h2>
                  <p>Escolha como prefere visualizar suas turmas na demonstração.</p>
                </div>
                <span className={styles.cardIcon}><Armchair size={19} aria-hidden="true" /></span>
              </div>
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor={`${idPrefix}-roomView`}><span>Visualização inicial da sala</span></label>
                  <select id={`${idPrefix}-roomView`} value={state.roomView} onChange={(e) => updateField('roomView', e.target.value)}>
                    <option value="mapa">Planta da sala</option>
                    <option value="carometro">Carômetro da turma</option>
                    <option value="lista">Lista de estudantes</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor={`${idPrefix}-roomCamera`}><span>Ângulo padrão da câmera</span></label>
                  <select id={`${idPrefix}-roomCamera`} value={state.roomCamera} onChange={(e) => updateField('roomCamera', e.target.value)}>
                    <option value="isometrica">Perspectiva isométrica</option>
                    <option value="professor">Visão do professor</option>
                    <option value="superior">Visão superior</option>
                  </select>
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor={`${idPrefix}-carometroMode`}><span>Modo padrão do Carômetro</span></label>
                  <select id={`${idPrefix}-carometroMode`} value={state.carometroMode} onChange={(e) => updateField('carometroMode', e.target.value)}>
                    <option value="cards">Cartões com foto</option>
                    <option value="compact">Compacto</option>
                    <option value="list">Lista detalhada</option>
                  </select>
                </div>
              </div>
              <SettingSwitch
                label="Destacar sinais de atenção nos cartões"
                description="Mantém o marcador visual de acompanhamento visível nas carteiras e cartões."
                checked={state.highlightSignals}
                onChange={() => toggleSwitch('highlightSignals', 'Destacar sinais de atenção nos cartões')}
              />
              <div className={styles.cardActions}>
                <button type="submit" className={styles.primaryAction}>
                  <Save size={16} aria-hidden="true" />
                  Salvar preferências
                </button>
                <Link className={styles.secondaryAction} to={`/teacherRoom?vista=${encodeURIComponent(state.roomView)}`}>
                  Abrir Sala Virtual
                </Link>
              </div>
            </form>

            <form className={styles.card} onSubmit={saveCriteria} aria-labelledby="teacher-criteria-title">
              <div className={styles.cardHeader}>
                <div>
                  <h2 id="teacher-criteria-title">Critérios de atenção nas minhas turmas</h2>
                  <p>Referências pedagógicas para apoiar o olhar em sala, sem rotular estudantes.</p>
                </div>
                <span className={styles.cardIcon}><SlidersHorizontal size={19} aria-hidden="true" /></span>
              </div>
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>Faltas consecutivas na disciplina</span>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={state.consecutiveAbsences}
                    onChange={(e) => updateField('consecutiveAbsences', e.target.value)}
                  />
                  <small>Padrão sugerido: 3 faltas seguidas</small>
                </label>
                <label className={styles.field}>
                  <span>Frequência de atenção (%)</span>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={state.attentionFrequency}
                    onChange={(e) => updateField('attentionFrequency', e.target.value)}
                  />
                  <small>Referência atual do Carômetro: abaixo de 85%</small>
                </label>
                <label className={`${styles.field} ${styles.fieldFull}`}>
                  <span>Prazo sugerido para retorno de acompanhamento (dias)</span>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={state.returnDays}
                    onChange={(e) => updateField('returnDays', e.target.value)}
                  />
                </label>
              </div>
              {criteriaError && <p className={styles.errorText} role="alert">{criteriaError}</p>}
              <div className={styles.cardActions}>
                <button type="submit" className={styles.primaryAction}>
                  <Save size={16} aria-hidden="true" />
                  Salvar critérios da turma
                </button>
                <Link className={styles.secondaryAction} to="/carometroTeacher">Abrir Carômetro</Link>
              </div>
            </form>

            <section className={styles.card} aria-labelledby="teacher-profile-title">
              <div className={styles.cardHeader}>
                <div>
                  <h2 id="teacher-profile-title">Resumo docente e turmas</h2>
                  <p>Identificação da conta demonstrativa em uso neste navegador.</p>
                </div>
                <span className={styles.cardIcon}><UserRoundCheck size={19} aria-hidden="true" /></span>
              </div>
              <div className={styles.profileSummary}>
                <div className={styles.profileIdentity}>
                  <span className={styles.avatar} aria-hidden="true">RO</span>
                  <div>
                    <strong>Renata Oliveira</strong>
                    <small>Professor(a) · Língua Portuguesa · Demonstração</small>
                  </div>
                </div>
                <div className={styles.classChips} aria-label="Turmas vinculadas">
                  {teacherClasses.map((turma) => (
                    <span className={styles.chip} key={turma.name}>
                      {turma.name} · {turma.count} estudantes
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.cardActions}>
                <Link className={styles.secondaryAction} to="/teacher">Ir para Minhas Turmas</Link>
                <Link className={styles.secondaryAction} to="/teacherFollowup">Abrir Acompanhamento</Link>
              </div>
            </section>
          </>
        ) : (
          <>
            <form className={styles.card} onSubmit={saveCriteria} aria-labelledby="dir-criteria-title">
              <div className={styles.cardHeader}>
                <div>
                  <h2 id="dir-criteria-title">Critérios dos indicadores de atenção</h2>
                  <p>Parâmetros utilizados pela equipe para priorizar conversas e apoio.</p>
                </div>
                <span className={styles.cardIcon}><SlidersHorizontal size={19} aria-hidden="true" /></span>
              </div>
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span>Faltas consecutivas para alerta</span>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={state.consecutiveAbsences}
                    onChange={(e) => updateField('consecutiveAbsences', e.target.value)}
                  />
                </label>
                <label className={styles.field}>
                  <span>Meta mínima de frequência (%)</span>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={state.minFrequency}
                    onChange={(e) => updateField('minFrequency', e.target.value)}
                  />
                </label>
                <label className={styles.field}>
                  <span>Queda de frequência (pontos)</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={state.frequencyDrop}
                    onChange={(e) => updateField('frequencyDrop', e.target.value)}
                  />
                </label>
                <label className={styles.field}>
                  <span>Queda de média entre bimestres</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={state.gradeDrop}
                    onChange={(e) => updateField('gradeDrop', e.target.value)}
                  />
                </label>
              </div>
              {criteriaError && <p className={styles.errorText} role="alert">{criteriaError}</p>}
              <div className={styles.cardActions}>
                <button type="submit" className={styles.primaryAction}>
                  <Save size={16} aria-hidden="true" />
                  Salvar critérios
                </button>
              </div>
            </form>

            <form className={styles.card} onSubmit={savePreferences} aria-labelledby="dir-notif-title">
              <div className={styles.cardHeader}>
                <div>
                  <h2 id="dir-notif-title">Notificações por e-mail e painéis</h2>
                  <p>Configure o recebimento demonstrativo de avisos da escola.</p>
                </div>
                <span className={styles.cardIcon}><Bell size={19} aria-hidden="true" /></span>
              </div>
              <div className={styles.switchList}>
                <SettingSwitch
                  label="Alertas para a equipe"
                  description="Prioriza estudantes com faltas consecutivas na caixa da coordenação."
                  checked={state.staffAlerts}
                  onChange={() => toggleSwitch('staffAlerts', 'Alertas para a equipe')}
                />
                <SettingSwitch
                  label="Resumo diário"
                  description="Consolida movimentações registradas durante o turno escolar."
                  checked={state.dailyDigest}
                  onChange={() => toggleSwitch('dailyDigest', 'Resumo diário')}
                />
                <SettingSwitch
                  label="Avisos às famílias"
                  description="Prepara registro de contato acolhedor para aprovação da equipe."
                  checked={state.familyNotices}
                  onChange={() => toggleSwitch('familyNotices', 'Avisos às famílias')}
                />
                <SettingSwitch
                  label="Alertas de pendência de retorno"
                  description="Lembra a coordenação quando uma conversa combinada vence."
                  checked={state.returnAlerts}
                  onChange={() => toggleSwitch('returnAlerts', 'Alertas de pendência de retorno')}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={`${idPrefix}-defaultPeriod`}><span>Período padrão dos relatórios</span></label>
                <select id={`${idPrefix}-defaultPeriod`} value={state.defaultPeriod} onChange={(e) => updateField('defaultPeriod', e.target.value)}>
                  <option>Ano letivo (Fev–Set)</option>
                  <option>3º Bimestre</option>
                  <option>Últimos 30 dias</option>
                </select>
              </div>
              <div className={styles.cardActions}>
                <button type="submit" className={styles.primaryAction}>
                  <Save size={16} aria-hidden="true" />
                  Salvar preferências
                </button>
              </div>
              <p className={styles.cardFootnote}>Na demonstração, nenhum e-mail é enviado de fato.</p>
            </form>
          </>
        )}

        <section className={`${styles.card} ${styles.cardWide}`} aria-labelledby="history-title">
          <div className={styles.cardHeader}>
            <div>
              <h2 id="history-title">Histórico de alterações</h2>
              <p>Registro local das últimas atualizações feitas nesta demonstração.</p>
            </div>
            <span className={styles.cardIcon}><History size={19} aria-hidden="true" /></span>
          </div>
          <ul className={styles.historyList}>
            {history.map((entry) => (
              <li key={entry.id} className={styles.historyItem}>
                <span className={styles.historyDate}>{entry.date}</span>
                <span className={styles.historyAuthor}>{entry.author}</span>
                <span className={styles.historyDetail}>{entry.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className={styles.notice}>
        <Info size={18} aria-hidden="true" />
        <span>
          Ambiente demonstrativo: as configurações ficam salvas apenas no armazenamento local deste navegador e não alteram sistemas externos nem autenticam contas reais.
        </span>
      </aside>
    </main>
  );
}
