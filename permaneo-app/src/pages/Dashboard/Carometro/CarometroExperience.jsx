import StudentPortrait from '../../../components/students/StudentPortrait.jsx';
import { useMemo, useRef, useState } from 'react';
import { Activity, ArrowLeft, ArrowRight, BookOpen, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, GraduationCap, HeartHandshake, History, LayoutGrid, List, MessageSquareText, Plus, Search, ShieldCheck, UsersRound, X } from 'lucide-react';
import { demoStudents } from '../../../data/students.js';
import { getStudentProfile } from '../../../data/studentProfiles.js';
import { atencoes, categorias, chamadaRegistrada, chaveObservacoes, foiPresenca, hoje, lerLocal, normalizar, ordenarObservacoes, percentual, presencas, presencasAbreviadas, situacaoAluno, situacoes } from '../../../data/sala.js';
import styles from './CarometroExperience.module.css';

const modes = [['cards', 'Cartões', LayoutGrid], ['list', 'Lista', List], ['compact', 'Compacto', ClipboardList]];
const tabs = [['overview', 'Visão geral', BookOpen], ['attendance', 'Frequência', CalendarDays], ['performance', 'Desempenho', GraduationCap], ['notes', 'Observações', MessageSquareText], ['followup', 'Acompanhamento', HeartHandshake], ['history', 'Histórico', History]];
const formatDate = (value) => value ? new Date(value.length === 10 ? value + 'T12:00:00' : value).toLocaleDateString('pt-BR') : 'Sem data';
const gradeName = (student) => student.grade || student.className?.match(/(\d+)º/)?.[1] && `${student.className.match(/(\d+)º/)[1]}º ano` || 'Ensino fundamental';
const asIsoDate = (value = '') => value.includes('/') ? value.split('/').reverse().join('-') : value;

function Photo({ student, large = false }) {
  return <StudentPortrait student={student} className={`${styles.photo} ${large ? styles.photoLarge : ''}`} loading={large ? 'eager' : 'lazy'} decorative={!large} />;
}

function AttendanceBar({ value }) {
  return <span className={styles.attendance}>
    <span className={styles.attendanceLabel}><small><Activity size={13} aria-hidden="true" /> Frequência</small><b>{percentual(value)}</b></span>
    <span className={styles.bar} role={value == null ? undefined : "progressbar"} aria-label={value == null ? undefined : "Frequência geral"} aria-valuemin={value == null ? undefined : 0} aria-valuemax={value == null ? undefined : 100} aria-valuenow={value ?? undefined}><i key={value} style={{ width: `${Math.max(0, Math.min(100, value ?? 0))}%` }} /></span>
  </span>;
}

function profileFor(student) {
  return demoStudents.some((candidate) => candidate.key === student.key)
    ? getStudentProfile(student.key)
    : { attendance: student.attendance ?? null, totalLessons: 0, registration: student.registration || '—', grades: [], observations: [], months: [] };
}

function attendanceWithCalls(base, totalLessons, calls) {
  const marked = calls.filter((call) => chamadaRegistrada(call.status));
  if (!marked.length) return base;
  const present = marked.filter((call) => foiPresenca(call.status)).length;
  const priorTotal = base == null ? 0 : totalLessons;
  const priorPresent = base == null ? 0 : (base / 100) * priorTotal;
  return Math.round(((priorPresent + present) / (priorTotal + marked.length)) * 1000) / 10;
}

function ObservationDialog({ student, role, onClose, onSave }) {
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    data.descricao = data.descricao.trim();
    if (!data.assunto.trim() || !data.descricao) return setError('Preencha o assunto e a descrição.');
    onSave({ ...data, autor: role === 'teacher' ? 'Renata Oliveira' : 'Marcos Silva', id: crypto.randomUUID(), registradoEm: new Date().toISOString() });
    onClose();
  }
  return <div className={styles.scrim} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <form className={styles.observationDialog} role="dialog" aria-modal="true" onSubmit={submit} aria-labelledby="note-title">
      <header><div><span className={styles.eyebrow}>Registro pedagógico · {student.name}</span><h2 id="note-title">Adicionar observação</h2></div><button type="button" className={styles.iconButton} aria-label="Fechar" onClick={onClose}><X size={19} /></button></header>
      <div className={styles.formGrid}>
        <label>Categoria<select name="categoria" defaultValue="GERAL">{Object.entries(categorias).map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></label>
        <label>Nível de atenção<select name="atencao" defaultValue="INFORMATIVO">{Object.entries(atencoes).map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></label>
        <label>Assunto<input name="assunto" required maxLength={100} placeholder="Ex.: participação em aula" /></label>
        <label>Data<input name="data" type="date" defaultValue={hoje()} required /></label>
        <label className={styles.full}>Descrição<textarea name="descricao" rows="4" required maxLength={2000} placeholder="Registre fatos observáveis e próximos passos, sem rotular o estudante." /></label>
        <label>Responsável<input value={role === 'teacher' ? 'Renata Oliveira' : 'Marcos Silva'} readOnly /></label>
        <label>Visibilidade<select name="visibilidade" defaultValue="EQUIPE">{[['EQUIPE', 'Equipe pedagógica'], ...(role === 'director' ? [['RESTRITA', 'Restrita à direção e coordenação']] : [])].map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></label>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <footer><button type="button" className={styles.secondaryButton} onClick={onClose}>Cancelar</button><button className={styles.primaryButton}><Plus size={16} /> Salvar observação</button></footer>
    </form>
  </div>;
}

function StudentDetails({ student, role, attendanceRecords, cases, onClose, onNavigate, onStartFollowup }) {
  const [tab, setTab] = useState('overview');
  const [addingNote, setAddingNote] = useState(false);
  const [noteRevision, setNoteRevision] = useState(0);
  const tabRefs = useRef([]);
  const profile = profileFor(student);
  const savedNotes = useMemo(() => ordenarObservacoes(lerLocal(chaveObservacoes(student.key))), [student.key, noteRevision]);
  const notes = [...(profile.observations || []), ...savedNotes].filter((note) => role === 'director' || note.visibilidade !== 'RESTRITA');
  const grades = profile.grades || [];
  const average = grades.length ? grades.flatMap((grade) => grade.scores).reduce((sum, score) => sum + score, 0) / grades.flatMap((grade) => grade.scores).length : null;
  const calls = Object.values(attendanceRecords || {}).flatMap((dateMap) => Object.entries(dateMap || {}).map(([date, statuses]) => ({ date, status: statuses?.[student.key] }))).filter((item) => item.status && item.status !== 'NAO_REGISTRADA').sort((a, b) => b.date.localeCompare(a.date));
  const attendance = attendanceWithCalls(profile.attendance, profile.totalLessons, calls);
  const currentStatus = situacaoAluno({ frequencia: attendance });
  const calendarEntries = new Map((profile.recentAttendance || []).map((item) => [asIsoDate(item.date), { date: asIsoDate(item.date), status: item.absent ? item.justified ? 'JUSTIFICADA' : 'AUSENTE' : 'PRESENTE' }]));
  calls.forEach((call) => calendarEntries.set(call.date, call));
  const calendar = [...calendarEntries.values()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 14);
  const absences = calendar.filter((entry) => entry.status === 'AUSENTE').length;
  const justified = calendar.filter((entry) => entry.status === 'JUSTIFICADA').length;
  const consecutiveAbsences = calls.findIndex((call) => foiPresenca(call.status));
  const studentCases = (cases || []).filter((item) => item.student === student.key || item.student === student.name);
  const activeCases = studentCases.filter((item) => item.status !== 'Concluída');
  const caseDetail = (item) => `${item.text || item.description || 'Ação registrada.'}${item.date ? ` Próximo retorno: ${formatDate(item.date)}.` : ''}`;
  const timeline = [
    ...notes.map((note) => ({ date: note.data || note.date, title: note.assunto || note.subject || categorias[note.categoria] || 'Observação', detail: note.descricao || note.text, who: note.autor || note.author, type: 'Observação' })),
    ...calls.map((call) => ({ date: call.date, title: `Chamada · ${presencas[call.status]}`, detail: 'Registro de frequência da turma.', who: 'Registro de chamada', type: 'Frequência' })),
    ...studentCases.map((item) => ({ date: item.createdAt || item.date, title: item.status || 'Acompanhamento registrado', detail: caseDetail(item), who: item.author || item.responsible || 'Equipe pedagógica', type: 'Acompanhamento' })),
  ].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

  function saveNote(note) {
    const key = chaveObservacoes(student.key);
    localStorage.setItem(key, JSON.stringify([...lerLocal(key), note]));
    setNoteRevision((value) => value + 1);
  }
  function moveTab(event, index) {
    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : event.key === 'Home' ? -index : event.key === 'End' ? tabs.length - index - 1 : null;
    if (direction === null) return;
    event.preventDefault();
    const next = (index + direction + tabs.length) % tabs.length;
    setTab(tabs[next][0]);
    tabRefs.current[next]?.focus();
  }
  const metricCards = <div className={styles.metrics}>
    <article><span>Frequência geral</span><strong>{percentual(attendance)}</strong><small>{calls.length ? 'Ano letivo · chamadas salvas incluídas' : 'Ano letivo · 2026'}</small></article>
    <article><span>Faltas consecutivas</span><strong>{calls.length ? consecutiveAbsences < 0 ? calls.length : consecutiveAbsences : '—'}</strong><small>{calls.length ? 'Com base nas chamadas salvas' : 'Sem chamadas registradas'}</small></article>
    <article><span>Média acadêmica</span><strong>{average == null ? '—' : average.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</strong><small>{average == null ? 'Sem notas disponíveis' : 'Disciplinas com notas · 2026'}</small></article>
    <article><span>Acompanhamento</span><strong className={styles.metricStatus}>{activeCases.length ? 'Ativo' : situacoes[situacaoAluno({ frequencia: attendance })]}</strong><small>{activeCases.length ? `${activeCases.length} registro(s) associado(s)` : 'Situação pela frequência'}</small></article>
  </div>;
  return <section className={styles.profilePage} data-carometro-profile>
    <div className={styles.profileTop}><button className={styles.backButton} onClick={onClose}><ArrowLeft size={17} /> Voltar ao Carômetro</button><span>Estudante · Ano letivo 2026</span></div>
    <header className={styles.profileHero}>
      <Photo student={student} large />
      <div className={styles.profileIdentity}><span className={styles.eyebrow}>Perfil do estudante</span><h1 tabIndex={-1}>{student.name}</h1><p>{student.className} <i>·</i> {gradeName(student)} <i>·</i> Matrícula ativa</p><span className={styles.statusPill} data-status={currentStatus}><i />{situacoes[currentStatus]}</span></div>
      <div className={styles.profileActions}><button className={styles.secondaryButton} onClick={() => setAddingNote(true)}><Plus size={16} /> Adicionar observação</button>{role === 'director' && <button className={styles.primaryButton} onClick={() => onStartFollowup?.(student)}><HeartHandshake size={16} /> Iniciar acompanhamento</button>}<div className={styles.studentPager}><button className={styles.iconButton} aria-label="Estudante anterior" onClick={() => onNavigate(-1)}><ChevronLeft size={18} /></button><span>Navegar estudantes</span><button className={styles.iconButton} aria-label="Próximo estudante" onClick={() => onNavigate(1)}><ChevronRight size={18} /></button></div></div>
    </header>
    {metricCards}
    <nav className={styles.tabs} role="tablist" aria-label="Seções do perfil">{tabs.map(([id, label, Icon], index) => <button key={id} ref={(node) => { tabRefs.current[index] = node; }} id={`profile-tab-${id}`} role="tab" aria-controls={`profile-panel-${id}`} aria-selected={tab === id} tabIndex={tab === id ? 0 : -1} onKeyDown={(event) => moveTab(event, index)} onClick={() => setTab(id)}><Icon size={16} />{label}{id === 'notes' && <span>{notes.length}</span>}</button>)}</nav>
    <div className={styles.tabPanel} id={`profile-panel-${tab}`} role="tabpanel" aria-labelledby={`profile-tab-${tab}`} tabIndex={0}>
      {tab === 'overview' && <div className={styles.overviewGrid}><section className={styles.panel}><h2>Resumo acadêmico</h2><div className={styles.subjectRows}>{grades.slice(0, 4).map((grade) => <div key={grade.subject}><span>{grade.subject}</span><strong>{(grade.scores.reduce((sum, score) => sum + score, 0) / grade.scores.length).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</strong></div>)}</div><button className={styles.textButton} onClick={() => setTab('performance')}>Ver desempenho <ArrowRight size={15} /></button></section><section className={styles.panel}><h2>Dados escolares</h2><dl className={styles.schoolData}><div><dt>Turma</dt><dd>{student.className}</dd></div><div><dt>Matrícula</dt><dd>{profile.registration}</dd></div><div><dt>Série</dt><dd>{student.grade || 'Ensino fundamental'}</dd></div><div><dt>Período</dt><dd>{student.period || 'Não informado'}</dd></div></dl></section><section className={styles.panel}><h2>Eventos recentes</h2><Timeline items={timeline.slice(0, 3)} empty="Ainda não há eventos registrados." /><button className={styles.textButton} onClick={() => setTab('history')}>Ver histórico <ArrowRight size={15} /></button></section><section className={styles.panel}><h2>Presença por bimestre</h2><div className={styles.termRows}>{profile.months.map((month) => <div key={month.month}><span>{month.month}</span><b>{Math.round(month.present / month.total * 100)}%</b><i><span style={{ width: `${Math.round(month.present / month.total * 100)}%` }} /></i></div>)}</div></section></div>}
      {tab === 'attendance' && <div className={styles.panel}><div className={styles.panelHeading}><div><h2>Evolução da frequência</h2><p>Registros disponíveis no ano letivo de 2026</p></div><strong className={styles.bigNumber}>{percentual(attendance)}</strong></div>{profile.months.length > 0 && <div className={styles.monthChart}>{profile.months.map((month) => <div key={month.month}><div className={styles.chartTrack}><i style={{ height: `${Math.max(4, month.present / month.total * 100)}%` }} /></div><b>{Math.round(month.present / month.total * 100)}%</b><small>{month.month}</small></div>)}</div>}<h3>Calendário de presença · registros mais recentes</h3>{calendar.length ? <div className={styles.attendanceCalendar}>{calendar.map((entry) => <div className={styles.calendarDay} data-status={entry.status.toLowerCase()} key={entry.date} title={`${formatDate(entry.date)} · ${presencas[entry.status]}`}><small>{formatDate(entry.date).slice(0, 5)}</small><b>{presencasAbreviadas[entry.status]}</b></div>)}</div> : <p className={styles.empty}>Ainda não há registros para exibir no calendário.</p>}<div className={styles.absenceSummary}><span><i data-kind="absent" />Faltas não justificadas <b>{absences}</b></span><span><i data-kind="justified" />Faltas justificadas <b>{justified}</b></span></div><h3>Chamadas registradas</h3>{calls.length ? <div className={styles.dataTable}><div className={styles.tableHead}><span>Data</span><span>Registro</span><span>Origem</span></div>{calls.map((call) => <div className={styles.tableRow} key={call.date}><span>{formatDate(call.date)}</span><span>{presencas[call.status]}</span><span>{student.className}</span></div>)}</div> : <p className={styles.empty}>As chamadas salvas em Minhas Turmas aparecerão aqui.</p>}</div>}
      {tab === 'performance' && <div className={styles.panel}><div className={styles.panelHeading}><div><h2>Desempenho por disciplina</h2><p>Notas cadastradas para o período atual</p></div>{average != null && <strong className={styles.bigNumber}>{average.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}<small>média</small></strong>}</div>{grades.length ? <div className={styles.dataTable}><div className={styles.tableHead}><span>Disciplina</span><span>Notas</span><span>Média</span></div>{grades.map((grade) => <div className={styles.tableRow} key={grade.subject}><span><b>{grade.subject}</b><small>{grade.teacher}</small></span><span>{grade.scores.join(' · ')}</span><span>{(grade.scores.reduce((sum, score) => sum + score, 0) / grade.scores.length).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</span></div>)}</div> : <p className={styles.empty}>Ainda não há notas disponíveis para este estudante.</p>}</div>}
      {tab === 'notes' && <section className={styles.panel}><div className={styles.panelHeading}><div><h2>Observações pedagógicas</h2><p>Registros visíveis conforme seu perfil de acesso.</p></div><button className={styles.primaryButton} onClick={() => setAddingNote(true)}><Plus size={16} /> Nova observação</button></div><Timeline items={notes.map((note) => ({ date: note.data || note.date, title: note.assunto || note.subject || categorias[note.categoria] || 'Observação', detail: note.descricao || note.text, who: note.autor || note.author, type: note.visibilidade === 'RESTRITA' ? 'Restrita à direção' : categorias[note.categoria] || 'Equipe pedagógica', attention: atencoes[note.atencao] }))} empty="Nenhuma observação foi registrada." /></section>}
      {tab === 'followup' && <section className={styles.panel}><div className={styles.panelHeading}><div><h2>Acompanhamento</h2><p>Encaminhamentos e ações vinculados ao estudante.</p></div>{role === 'director' && <button className={styles.primaryButton} onClick={() => onStartFollowup?.(student)}><HeartHandshake size={16} /> Iniciar acompanhamento</button>}</div>{activeCases.length ? <Timeline items={activeCases.map((item) => ({ date: item.createdAt || item.date, title: item.status || 'Caso ativo', detail: caseDetail(item), who: item.author || item.responsible || 'Equipe pedagógica', type: item.status || 'Em andamento' }))} /> : <div className={styles.emptyState}><ShieldCheck size={28} /><strong>Nenhum caso ativo</strong><span>O acompanhamento será exibido aqui quando for iniciado pela equipe autorizada.</span></div>}</section>}
      {tab === 'history' && <section className={styles.panel}><h2>Histórico escolar e intervenções</h2><p className={styles.panelIntro}>Linha do tempo organizada pelos registros disponíveis.</p><Timeline items={timeline.map((item) => ({ ...item, type: item.type }))} empty="Ainda não há eventos no histórico." /></section>}
    </div>
    <div className={styles.profileFooter}><button className={styles.backButton} onClick={onClose}><ArrowLeft size={17} /> Voltar ao Carômetro</button><button className={styles.textButton} onClick={() => onNavigate(1)}>Próximo estudante <ArrowRight size={15} /></button></div>
    {addingNote && <ObservationDialog student={student} role={role} onClose={() => setAddingNote(false)} onSave={saveNote} />}
  </section>;
}

function Timeline({ items, empty }) {
  if (!items.length) return <p className={styles.empty}>{empty}</p>;
  return <ol className={styles.timeline}>{items.map((item, index) => <li key={`${item.title}-${item.date}-${index}`}><i className={styles.timelineDot} /><div><div className={styles.timelineMeta}><span>{item.type}</span><time>{formatDate(item.date)}</time></div><h3>{item.title}</h3>{item.detail && <details className={styles.timelineDetails}><summary>Consultar contexto</summary><p>{item.detail}</p></details>}<small>{item.who}{item.attention ? ` · ${item.attention}` : ''}</small></div></li>)}</ol>;
}

export default function CarometroExperience({ role = 'teacher', dark = false, localStudents = [], classAttendance = {}, records = [], onStartFollowup, onBack, initialStudentKey = null }) {
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [mode, setMode] = useState('cards');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(initialStudentKey);
  const lastViewed = useRef(null);
  const students = useMemo(() => [
    ...demoStudents.map((student) => ({ ...student, id: student.key })),
    ...localStudents.map((student) => ({ ...student, key: student.id, id: student.id })),
  ], [localStudents]);
  const classes = [...new Set(students.map((student) => student.className).filter(Boolean))];
  const studentsWithActiveCases = new Set(records.filter((record) => record.status !== 'Concluída').map((record) => record.student));
  const filtered = students.filter((student) => normalizar([student.name, student.className].filter(Boolean).join(' ')).includes(normalizar(query)) && (!classFilter || student.className === classFilter));
  const pageSize = mode === 'cards' ? 8 : 12;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const selectedIndex = students.findIndex((student) => student.id === selected);
  function selectStudent(student) {
    lastViewed.current = student.id;
    setSelected(student.id);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => document.querySelector('[data-carometro-profile] h1')?.focus());
  }
  function navigateStudent(direction) {
    if (!students.length) return;
    const next = (selectedIndex + direction + students.length) % students.length;
    setSelected(students[next].id);
  }
  function showList() {
    setSelected(null);
    requestAnimationFrame(() => [...document.querySelectorAll('[data-carometro-card]')]
      .find((card) => card.dataset.carometroCard === String(lastViewed.current))?.focus());
  }
  return <main className={styles.page} data-local-content data-theme={dark ? 'dark' : 'light'} data-role={role}>
    {selected ? <StudentDetails student={students.find((student) => student.id === selected)} role={role} attendanceRecords={classAttendance} cases={records} onClose={initialStudentKey ? onBack : showList} onNavigate={navigateStudent} onStartFollowup={onStartFollowup} /> : <>
      <header className={styles.pageHeader}><div><span className={styles.eyebrow}>{role === 'teacher' ? 'Espaço do professor' : 'Visão institucional'}</span><h1>Carômetro</h1><p>{role === 'teacher' ? 'Acompanhe seus estudantes com uma visão clara e acolhedora.' : 'Consulte estudantes, frequência e casos de acompanhamento por turma.'}</p></div><span className={styles.scope}><UsersRound size={16} /> {role === 'teacher' ? 'Turmas vinculadas' : 'Toda a escola'}</span></header>
      <section className={styles.summaryStrip}><div><span>Estudantes</span><strong>{students.length}</strong></div><div><span>Em acompanhamento</span><strong>{students.filter((student) => studentsWithActiveCases.has(student.key) || studentsWithActiveCases.has(student.name)).length}</strong></div><div><span>Turmas</span><strong>{classes.length}</strong></div><span className={styles.period}><CheckCircle2 size={16} /> Ano letivo · 2026</span></section>
      <div className={styles.controls}><label className={styles.search}><Search size={17} /><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Buscar por nome ou turma" aria-label="Buscar estudante" /></label><label className={styles.classSelect}><span>Turma</span><select value={classFilter} onChange={(event) => { setClassFilter(event.target.value); setPage(1); }}><option value="">Todas as turmas</option>{classes.map((value) => <option key={value}>{value}</option>)}</select></label><div className={styles.viewSwitch} role="group" aria-label="Modo de visualização">{modes.map(([id, label, Icon]) => <button type="button" key={id} aria-pressed={mode === id} onClick={() => { setMode(id); setPage(1); }}><Icon size={16} /><span>{label}</span></button>)}</div></div>
      <div className={styles.results}><strong>{filtered.length} {filtered.length === 1 ? 'estudante' : 'estudantes'}</strong><span>Selecione um perfil para consultar os detalhes</span></div>
      <div className={`${styles.studentGrid} ${styles[mode]}`} data-view={mode}>
        {visible.map((student) => {
          const profile = profileFor(student);
          const calls = Object.values(classAttendance || {}).flatMap((dateMap) => Object.entries(dateMap || {}).map(([date, statuses]) => ({ date, status: statuses?.[student.key] }))).filter((call) => chamadaRegistrada(call.status));
          const frequency = attendanceWithCalls(profile.attendance, profile.totalLessons, calls);
          const status = situacaoAluno({ frequencia: frequency });
          return <button type="button" key={student.id} className={styles.studentCard} data-carometro-card={student.id} data-last-viewed={lastViewed.current === student.id} onClick={() => selectStudent(student)}>
            <Photo student={student} />
            <span className={styles.studentInfo}><strong>{student.name}</strong><small>{student.className} · {gradeName(student)}</small></span>
            <AttendanceBar value={frequency} />
            <span className={styles.statusPill} data-status={status}><i />{situacoes[status]}</span>
            <span className={styles.cardAction}>Ver perfil <ArrowRight size={15} /></span>
          </button>;
        })}
      </div>
      {!filtered.length && <div className={styles.emptyState}><Search size={26} /><strong>Nenhum estudante encontrado</strong><span>Tente ajustar a busca ou o filtro de turma.</span></div>}
      {pages > 1 && <nav className={styles.pagination} aria-label="Paginação do Carômetro"><button disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Página anterior"><ChevronLeft size={17} /></button><span>Página {page} de {pages}</span><button disabled={page === pages} onClick={() => setPage(page + 1)} aria-label="Próxima página"><ChevronRight size={17} /></button></nav>}
    </>}
  </main>;
}
