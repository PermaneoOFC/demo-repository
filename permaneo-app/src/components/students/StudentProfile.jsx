import { useRef, useState } from 'react';
import {
  ArrowLeft,
  Plus,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  History,
  MessageSquareText,
  Bell,
  Users,
  Check,
  Clock,
  Phone,
  Mail,
  Info,
} from 'lucide-react';
import { getStudentProfile } from '../../data/studentProfiles.js';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import styles from './StudentProfile.module.css';

const tabs = [
  ['attendance', 'Frequência e faltas', CalendarDays],
  ['grades', 'Notas', GraduationCap],
  ['history', 'Histórico', History],
  ['observations', 'Observações', MessageSquareText],
  ['alerts', 'Alertas', Bell],
  ['contacts', 'Contatos', Users],
];
const decimal = (value) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const average = (scores) => scores.reduce((sum, score) => sum + score, 0) / scores.length;
const displayDate = (value) =>
  value
    ? new Date(value.length === 10 ? value + 'T12:00:00' : value).toLocaleDateString('pt-BR')
    : 'Sem data definida';

export default function StudentProfile({ studentKey, records, onBack, onRecord }) {
  const student = getStudentProfile(studentKey);
  const [tab, setTab] = useState('attendance');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [notes, setNotes] = useLocalStorage('permaneo-profile-notes-' + studentKey, []);
  const tabRefs = useRef([]);
  const initials = student.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');
  const gradeAverage = average(student.grades.map((row) => average(row.scores)));
  const visibleAttendance = student.recentAttendance.filter(
    (row) => attendanceFilter === 'all' || row.absent
  );
  function selectTab(next) {
    setTab(next);
    setSaved(false);
  }
  function handleTabKey(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    selectTab(tabs[next][0]);
    tabRefs.current[next]?.focus();
  }
  return (
    <article className={styles.profile} data-local-content>
      <div className={styles.topline}>
        <button type="button" className={styles.back} data-name="← Carômetro" onClick={onBack}>
          <ArrowLeft size={16} />
          Carômetro
        </button>
        <span className={styles.eyebrow}>Perfil do estudante · Ano letivo 2026</span>
      </div>
      <header className={styles.identity}>
        <div className={styles.student}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <h1>{student.name}</h1>
            <p>
              {student.className} <span aria-hidden="true">·</span> Matrícula {student.registration}
            </p>
            <span className={styles.status}>
              <Check size={13} />
              Matrícula ativa
            </span>
          </div>
        </div>
        <button type="button" className={styles.primary} onClick={onRecord}>
          <Plus size={17} />
          Registrar acompanhamento
        </button>
      </header>
      <p className={styles.demo}>
        <Info size={16} aria-hidden="true" />
        Perfil demonstrativo. Dados acadêmicos e contatos fictícios; registros novos ficam salvos
        neste navegador.
      </p>
      <div className={styles.metrics}>
        <button type="button" onClick={() => selectTab('attendance')}>
          <CalendarDays size={19} />
          <span>
            Frequência no período<strong>{student.attendance}%</strong>
            <small>{student.attendance} presenças em 100 aulas</small>
          </span>
        </button>
        <button type="button" onClick={() => selectTab('attendance')}>
          <ClipboardList size={19} />
          <span>
            Faltas acumuladas<strong>{student.absences}</strong>
            <small>Nas 100 aulas registradas</small>
          </span>
        </button>
        <button type="button" onClick={() => selectTab('grades')}>
          <GraduationCap size={19} />
          <span>
            Média parcial<strong>{decimal(gradeAverage)}</strong>
            <small>5 disciplinas · 3 bimestres</small>
          </span>
        </button>
        <button type="button" onClick={() => selectTab('alerts')}>
          <Bell size={19} />
          <span>
            Alertas e lembretes<strong>{student.alerts.length}</strong>
            <small>Ver próximos passos</small>
          </span>
        </button>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Informações do estudante">
        {tabs.map(([id, label, Icon], index) => (
          <button
            key={id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={'tab-' + id}
            aria-controls={'panel-' + id}
            aria-selected={tab === id}
            tabIndex={tab === id ? 0 : -1}
            onKeyDown={(event) => handleTabKey(event, index)}
            onClick={() => selectTab(id)}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
            {id === 'alerts' && <span>{student.alerts.length}</span>}
          </button>
        ))}
      </div>
      <section
        className={styles.panel}
        role="tabpanel"
        id={'panel-' + tab}
        aria-labelledby={'tab-' + tab}
        tabIndex={0}
      >
        {tab === 'attendance' && (
          <>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Frequência e faltas</h2>
                <p>Presenças por aula · Agosto a outubro de 2026</p>
              </div>
              <span className={student.attendance < 85 ? styles.warning : styles.status}>
                {student.attendance < 85 ? 'Em acompanhamento' : 'Frequência regular'}
              </span>
            </div>
            <div className={styles.columns}>
              <section className={styles.card}>
                <h3>Presença por mês</h3>
                <p className={styles.muted}>Percentual de aulas com presença registrada.</p>
                <div className={styles.months}>
                  {student.months.map((month) => {
                    const rate = Math.round((month.present / month.total) * 100);
                    return (
                      <div key={month.month}>
                        <div className={styles.row}>
                          <strong>{month.month}</strong>
                          <span>{rate}%</span>
                        </div>
                        <progress
                          value={month.present}
                          max={month.total}
                          aria-label={'Presença em ' + month.month}
                        />
                        <p>
                          {month.present} presenças · {month.total - month.present} faltas ·{' '}
                          {month.total} aulas
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.callout}>
                  <Info size={17} />
                  <p>
                    Antes de definir uma ação, confira as justificativas e converse com o estudante.
                  </p>
                </div>
              </section>
              <section className={styles.card}>
                <div className={styles.sectionHeading}>
                  <div>
                    <h3>Últimos 10 registros</h3>
                    <p>Um registro por aula</p>
                  </div>
                  <div className={styles.filter}>
                    <label htmlFor="attendance-filter">Exibir</label>
                    <select
                      id="attendance-filter"
                      value={attendanceFilter}
                      onChange={(event) => setAttendanceFilter(event.target.value)}
                    >
                      <option value="all">Todos</option>
                      <option value="absent">Somente faltas</option>
                    </select>
                  </div>
                </div>
                <div className={styles.tableWrap}>
                  <table>
                    <caption className={styles.srOnly}>Registros recentes de frequência</caption>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Situação</th>
                        <th>Justificativa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleAttendance.map((row) => (
                        <tr key={row.date}>
                          <td>{row.date}</td>
                          <td>
                            <span className={row.absent ? styles.warning : styles.status}>
                              {row.absent ? 'Falta' : 'Presença'}
                            </span>
                          </td>
                          <td>{row.absent ? row.detail : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!visibleAttendance.length && (
                  <p className={styles.empty}>Nenhuma falta nos últimos 10 registros.</p>
                )}
              </section>
            </div>
          </>
        )}
        {tab === 'grades' && (
          <section className={styles.card}>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Notas por disciplina</h2>
                <p>Escala de 0 a 10 · Médias bimestrais fictícias</p>
              </div>
              <span className={styles.chip}>Média parcial {decimal(gradeAverage)}</span>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <caption className={styles.srOnly}>Notas e médias parciais do aluno</caption>
                <thead>
                  <tr>
                    <th>Disciplina / professor</th>
                    <th>1º bim.</th>
                    <th>2º bim.</th>
                    <th>3º bim.</th>
                    <th>4º bim.</th>
                    <th>Média parcial</th>
                  </tr>
                </thead>
                <tbody>
                  {student.grades.map((row) => (
                    <tr key={row.subject}>
                      <th scope="row">
                        {row.subject}
                        <small>{row.teacher}</small>
                      </th>
                      {row.scores.map((score, index) => (
                        <td key={index}>{decimal(score)}</td>
                      ))}
                      <td>
                        <span className={styles.muted}>Pendente</span>
                      </td>
                      <td>
                        <strong>{decimal(average(row.scores))}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.footnote}>
              O 4º bimestre ainda não foi lançado. A média parcial considera apenas os três
              bimestres disponíveis.
            </p>
          </section>
        )}
        {tab === 'history' && (
          <section className={styles.card}>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Histórico de acompanhamento</h2>
                <p>Conversas, ações combinadas e próximos retornos.</p>
              </div>
              <button type="button" className={styles.secondary} onClick={onRecord}>
                <Plus size={16} />
                Novo registro
              </button>
            </div>
            <ol className={styles.timeline}>
              {[...records].reverse().map((record, index) => (
                <li key={'local-' + index}>
                  <span className={styles.dot} />
                  <div className={styles.row}>
                    <strong>Registro de acompanhamento</strong>
                    <span className={styles.chip}>{record.status}</span>
                  </div>
                  <p>{record.text}</p>
                  <small>
                    Salvo em {displayDate(record.createdAt)} · Retorno: {displayDate(record.date)} ·
                    Registro local
                  </small>
                </li>
              ))}
              {student.history.map((entry) => (
                <li key={entry.date}>
                  <span className={styles.dot} />
                  <div className={styles.row}>
                    <strong>{entry.title}</strong>
                    <span className={entry.status === 'Agendado' ? styles.warning : styles.status}>
                      {entry.status}
                    </span>
                  </div>
                  <p>{entry.text}</p>
                  <small>
                    {entry.date} · {entry.author}
                  </small>
                </li>
              ))}
            </ol>
          </section>
        )}
        {tab === 'observations' && (
          <div className={styles.columns}>
            <section className={styles.card}>
              <h2>Observações dos professores</h2>
              <p className={styles.muted}>Registros sobre participação e aprendizagem.</p>
              <div className={styles.notes}>
                {[...notes]
                  .reverse()
                  .concat(student.observations)
                  .map((entry) => (
                    <article key={entry.id}>
                      <div className={styles.row}>
                        <strong>{entry.author}</strong>
                        <time>{entry.date}</time>
                      </div>
                      <small>{entry.subject}</small>
                      <p>{entry.text}</p>
                    </article>
                  ))}
              </div>
            </section>
            <form
              className={styles.card}
              onSubmit={(event) => {
                event.preventDefault();
                if (!note.trim()) return;
                setNotes((items) => [
                  ...items,
                  {
                    id: crypto.randomUUID(),
                    date: new Date().toLocaleDateString('pt-BR'),
                    author: 'Equipe escolar · Registro local',
                    subject: 'Observação de acompanhamento',
                    text: note.trim(),
                  },
                ]);
                setNote('');
                setSaved(true);
              }}
            >
              <h3>Adicionar observação</h3>
              <p className={styles.muted}>Descreva o que foi observado e um próximo passo.</p>
              <label className={styles.noteLabel} htmlFor="student-observation">
                Observação
                <textarea
                  id="student-observation"
                  required
                  maxLength={2000}
                  rows={6}
                  value={note}
                  onChange={(event) => {
                    setNote(event.target.value);
                    setSaved(false);
                  }}
                  placeholder="Ex.: participou da atividade e combinou uma revisão para a próxima aula."
                />
              </label>
              <p className={styles.footnote}>
                {note.length}/2000 caracteres · Salvo somente neste navegador.
              </p>
              <button className={styles.primary} type="submit">
                Salvar observação
              </button>
              {saved && (
                <p className={styles.success} role="status">
                  <Check size={16} />
                  Observação salva neste navegador.
                </p>
              )}
            </form>
          </div>
        )}
        {tab === 'alerts' && (
          <>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Alertas e próximos passos</h2>
                <p>Lembretes para orientar o acompanhamento do estudante.</p>
              </div>
              <span className={styles.chip}>{student.alerts.length} registros</span>
            </div>
            <div className={styles.alerts}>
              {student.alerts.map((alert) => (
                <article key={alert.id} className={styles.card}>
                  <div className={styles.alertTitle}>
                    <span className={styles.alertIcon}>
                      <Bell size={20} />
                    </span>
                    <div>
                      <h3>{alert.title}</h3>
                      <span className={styles.warning}>{alert.status}</span>
                    </div>
                  </div>
                  <p>{alert.text}</p>
                  <button
                    type="button"
                    className={styles.secondary}
                    onClick={() => selectTab(alert.target)}
                  >
                    {alert.target === 'attendance'
                      ? 'Conferir frequência e faltas'
                      : 'Ver histórico de acompanhamento'}
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
        {tab === 'contacts' && (
          <>
            <div className={styles.sectionHeading}>
              <div>
                <h2>Contatos dos responsáveis</h2>
                <p>Contatos fictícios para demonstrar o acesso às informações.</p>
              </div>
              <span className={styles.chip}>2 responsáveis</span>
            </div>
            <div className={styles.columns}>
              {student.guardians.map((guardian) => (
                <article className={styles.card} key={guardian.email}>
                  <div className={styles.contactTitle}>
                    <span className={styles.contactAvatar}>
                      <Users size={22} />
                    </span>
                    <div>
                      <h3>{guardian.name}</h3>
                      <p className={styles.muted}>{guardian.relation}</p>
                    </div>
                  </div>
                  <dl className={styles.contactDetails}>
                    <div>
                      <dt>
                        <Phone size={16} />
                        Telefone demonstrativo
                      </dt>
                      <dd>{guardian.phone}</dd>
                    </div>
                    <div>
                      <dt>
                        <Mail size={16} />
                        E-mail demonstrativo
                      </dt>
                      <dd>{guardian.email}</dd>
                    </div>
                    <div>
                      <dt>
                        <Clock size={16} />
                        Melhor horário para contato
                      </dt>
                      <dd>{guardian.availability}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <p className={styles.demo}>
              <Info size={16} />
              Os telefones estão mascarados e os e-mails são de exemplo. Esta demonstração não
              realiza contatos.
            </p>
          </>
        )}
      </section>
    </article>
  );
}
