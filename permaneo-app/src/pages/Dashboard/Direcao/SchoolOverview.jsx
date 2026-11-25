import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowDownRight, ArrowRight, Bell, BookOpen, CheckCircle2, ClipboardList, Download, HeartHandshake, Info, Users } from 'lucide-react';
import StudentPortrait from '../../../components/students/StudentPortrait.jsx';
import { demoStudents } from '../../../data/students.js';
import { getStudentProfile } from '../../../data/studentProfiles.js';
import { directorNotifications } from '../../../data/directorNotifications.js';
import { foiPresenca } from '../../../data/sala.js';
import { attendanceEntries, dateLabel, frequency, isoDate, levels, percent, periodKey, periodLabel, previousPeriod, schoolGrade, schoolShift, studentSituation, within } from '../../../data/schoolOverview.js';
import useLocalStorage from '../../../hooks/useLocalStorage.js';
import styles from './SchoolOverview.module.css';

const groupsOf = (rows, key) => {
  const groups = new Map();
  for (const row of rows) {
    const id = key(row);
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(row);
  }
  return groups;
};
const matchesStudent = (record, student) => [student.key, student.name].includes(record.student);
const isActive = (record) => record.status !== 'Concluída';
const needsAttention = (student) => ['attention', 'priority', 'urgent'].includes(student.level);
const baseStudents = demoStudents.map((student) => getStudentProfile(student.key));

function jump(id) {
  const element = document.getElementById(id);
  element?.focus({ preventScroll: true });
  element?.scrollIntoView({ block: 'start' });
}

function Kpi({ icon: Icon, label, value, detail, section, format = String }) {
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    if (!value || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(value);
      return;
    }
    const start = performance.now();
    let frame;
    function animate(now) {
      const progress = Math.min(1, (now - start) / 290);
      setDisplayed(value * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  const content = <><div><span>{label}</span><Icon size={17} aria-hidden="true" /></div><strong aria-label={format(value)}>{format(format === String ? Math.round(displayed) : displayed)}</strong><small>{detail}</small><span className={styles.kpiDetail}>Ver detalhes <ArrowRight size={13} aria-hidden="true" /></span></>;
  return <button type="button" className={styles.kpi} onClick={() => jump(section)}>{content}</button>;
}

function AttendanceLine({ groups, view }) {
  if (!groups.length) return <p className={styles.empty}>Nenhuma chamada registrada neste período.</p>;
  const points = groups.map(([key, entries], index) => ({
    key, rate: frequency(entries), x: groups.length === 1 ? 310 : 40 + index * 530 / (groups.length - 1),
  })).map((point) => ({ ...point, y: 175 - point.rate * 1.4 }));
  return <>
    <div className={styles.chart}><svg viewBox="0 0 600 190" preserveAspectRatio="none" role="img" aria-label="Gráfico de evolução da frequência">
      {[0, 50, 100].map((value) => <line key={value} x1="35" x2="580" y1={175 - value * 1.4} y2={175 - value * 1.4} className={styles.gridLine} />)}
      <line x1="35" y1="70" x2="580" y2="70" className={styles.goal} /><text x="40" y="64">Referência 75%</text>
      <polyline className={styles.line} points={points.map((point) => [point.x, point.y].join(',')).join(' ')} />
      {points.map(({ key, rate, x, y }) => <circle key={key} cx={x} cy={y} r="5" className={styles.point}><title>{periodLabel(key, view)} · {percent(rate)}</title></circle>)}
    </svg></div>
    <div className={styles.chartLabels}>{points.map(({ key, rate }) => <span key={key}>{periodLabel(key, view)}<b>{percent(rate)}</b></span>)}</div>
  </>;
}

function Distribution({ people, counts, category, setCategory, open }) {
  let cursor = 0;
  const stops = levels.map(([level, , color]) => {
    const next = cursor + ((counts[level] || 0) / (people.length || 1)) * 100;
    const stop = color + ' ' + cursor + '% ' + next + '%';
    cursor = next;
    return stop;
  });
  return <section className={styles.panel}>
    <h3>Distribuição por acompanhamento</h3>
    <p>Sinais calculados a partir das chamadas do período.</p>
    <div className={styles.distributionGrid}>
      <div className={styles.donut} aria-hidden="true" style={{ background: people.length ? 'conic-gradient(' + stops.join(', ') + ')' : 'var(--app-bg)' }}><span><b>{people.length}</b> estudantes</span></div>
      <div className={styles.distribution}>{levels.map(([level, label, color]) => {
        const count = counts[level] || 0;
        const detail = people.length ? percent(100 * count / people.length) : '—';
        return <button type="button" key={level} onClick={() => setCategory(category === level ? '' : level)}
          aria-pressed={category === level} title={label + ' · ' + count + ' estudantes · ' + detail}>
          <span className={styles.dot} style={{ background: color }} /><span>{label}</span><strong>{count}</strong><small>{detail}</small>
        </button>;
      })}</div>
    </div>
    {category && <div className={styles.categoryList}>{people.some((student) => student.level === category)
      ? people.filter((student) => student.level === category).map((student) => <button type="button" key={student.key} onClick={() => open(student)}>{student.name} · {student.className}</button>)
      : <p>Nenhum estudante nesta situação.</p>}</div>}
    <p className={styles.footnote}>Atenção entre 75% e 84,9%. Intervenção abaixo de 75%. Acompanhamento urgente quando os registros terminam com três ou mais ausências consecutivas.</p>
  </section>;
}

export default function SchoolOverview({ records = [], classAttendance = {}, localStudents = [], onOpenProfile, notificationsRead }) {
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState('');
  const [shift, setShift] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [view, setView] = useState('week');
  const [order, setOrder] = useState('low');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [alertStatus, setAlertStatus] = useState('pending');
  const [readIds] = useLocalStorage('permaneo-demo-notifications-items-director', null);

  const students = useMemo(() => [...baseStudents, ...localStudents.map((student) => ({ ...student, key: student.id }))]
    .map((student) => ({ ...student, days: attendanceEntries(student, classAttendance) })), [localStudents, classAttendance]);
  const classOptions = [...new Set(students.filter((student) => (!grade || schoolGrade(student) === grade) && (!shift || schoolShift(student) === shift)).map((student) => student.className).filter(Boolean))].sort();
  const selected = students.filter((student) => (!className || className === student.className) && (!grade || schoolGrade(student) === grade) && (!shift || schoolShift(student) === shift));
  const people = selected.map((student) => {
    const entries = student.days.filter(({ date }) => within(date, from, to));
    return { ...student, entries, ...studentSituation(entries) };
  }).filter((student) => !level || student.level === level);
  const open = (student) => onOpenProfile(student.key);
  const entries = people.flatMap((student) => student.entries);
  const groups = [...groupsOf(entries, (entry) => periodKey(entry.date, view))].sort(([a], [b]) => a.localeCompare(b));
  const classes = [...groupsOf(people, (student) => student.className || 'Turma não informada')].map(([name, members]) => ({
    name, students: members, rate: frequency(members.flatMap((student) => student.entries)),
  })).sort((a, b) => order === 'alpha' ? a.name.localeCompare(b.name) : (order === 'low' ? 1 : -1) * ((a.rate ?? -1) - (b.rate ?? -1)));
  const counts = Object.fromEntries([...groupsOf(people, (student) => student.level)].map(([key, members]) => [key, members.length]));
  const scopedRecords = records.filter((record) => people.some((student) => matchesStudent(record, student)) && within(isoDate(record.createdAt), from, to));
  const activeRecords = scopedRecords.filter(isActive);
  const recordsByState = ['Pendente', 'Em andamento', 'Concluída'].map((status) => [
    status, scopedRecords.filter((record) => (record.status || 'Pendente') === status).length,
  ]);
  const recentAlerts = directorNotifications
    .filter((alert) => within(isoDate(alert.date), from, to) && (alert.studentKey
      ? people.some((student) => student.key === alert.studentKey)
      : !className && !grade && !shift && !level))
    .map((alert) => ({ ...alert, read: readIds ? readIds.includes(alert.id) : notificationsRead }))
    .sort((a, b) => isoDate(b.date).localeCompare(isoDate(a.date)));
  const pendingAlerts = recentAlerts.filter((alert) => !alert.read).length;
  const signalStudents = people.filter(needsAttention);
  const currentFrequency = frequency(entries);
  const previousDates = previousPeriod(from, to);
  const previousFrequency = previousDates && frequency(people.flatMap((student) => student.days.filter(({ date }) => within(date, ...previousDates))));
  const delta = currentFrequency == null || previousFrequency == null ? null : currentFrequency - previousFrequency;
  const deltaLabel = delta == null ? 'Nas chamadas do período' : (delta > 0 ? '+' : '') + delta.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' p.p. vs. período anterior';

  function exportCsv() {
    const rows = [['Estudante', 'Turma', 'Frequência no período', 'Situação'], ...people.map((student) => [student.name, student.className, percent(student.rate), levels.find(([key]) => key === student.level)[1]])];
    const csv = '\ufeff' + rows.map((row) => row.map((value) => '"' + String(value ?? '').replaceAll('"', '""') + '"').join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'permaneo-visao-escolar.csv';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function clearFilters() {
    setClassName(''); setGrade(''); setShift(''); setLevel(''); setCategory(''); setFrom(''); setTo('');
  }
  const firstClass = classes.filter((row) => row.rate != null).reduce((lowest, row) => !lowest || row.rate < lowest.rate ? row : lowest, null);

  return <main className={styles.dashboard} data-local-content>
    <header className={styles.intro}>
      <div><p className={styles.context}>Coordenação · Escola Estadual Horizonte</p><h1>Visão geral da escola</h1><p>Olá, Marcos! Acompanhe a frequência e organize as próximas ações de apoio.</p></div>
      <button type="button" className={styles.export} onClick={exportCsv}><Download size={17} /> Exportar relatório</button>
    </header>
    <section className={styles.filters} aria-label="Filtros do painel">
      <label>Série<select aria-label="Série" value={grade} onChange={(event) => { setGrade(event.target.value); setClassName(''); }}><option value="">Todas as séries</option>{[...new Set(students.map(schoolGrade).filter(Boolean))].sort().map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Turma<select aria-label="Turma" value={className} onChange={(event) => setClassName(event.target.value)}><option value="">Todas as turmas</option>{classOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Turno<select aria-label="Turno" value={shift} onChange={(event) => { setShift(event.target.value); setClassName(''); }}><option value="">Todos os turnos</option>{[...new Set(students.map(schoolShift).filter(Boolean))].sort().map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Situação<select aria-label="Situação" value={level} onChange={(event) => { setLevel(event.target.value); setCategory(''); }}><option value="">Todas as situações</option>{levels.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label>De<input type="date" value={from} max={to || undefined} onChange={(event) => setFrom(event.target.value)} /></label>
      <label>Até<input type="date" value={to} min={from || undefined} onChange={(event) => setTo(event.target.value)} /></label>
      {(className || grade || shift || level || from || to) && <button className={styles.clear} type="button" onClick={clearFilters}>Limpar filtros</button>}
    </section>

    <section className={styles.kpis} data-school-kpis aria-label="Indicadores principais">
      <Kpi icon={Users} label="Total de estudantes" value={people.length} detail="Cadastros na seleção" section="school-classes" />
      <Kpi icon={Activity} label="Frequência média" value={currentFrequency} format={percent} detail={deltaLabel} section="school-frequency" />
      <Kpi icon={HeartHandshake} label="Precisam de acompanhamento" value={signalStudents.length} detail="Estudantes com sinais de atenção" section="school-signals" />
      <Kpi icon={Bell} label="Alertas pendentes" value={pendingAlerts} detail="Notificações não lidas" section="school-alerts" />
      <Kpi icon={ClipboardList} label="Intervenções em andamento" value={recordsByState[1][1]} detail={recordsByState[0][1] + ' aguardando início'} section="school-interventions" />
      <Kpi icon={CheckCircle2} label="Intervenções concluídas" value={scopedRecords.length - activeRecords.length} detail="Registros finalizados" section="school-interventions" />
    </section>
    <p className={styles.notice}><Info size={16} aria-hidden="true" /> Demonstração. A média considera chamadas detalhadas da seleção. Atrasos contam como presença e faltas justificadas contam como ausência.</p>

    <div className={styles.sectionHeading}><h2 id="school-frequency" tabIndex={-1}>Frequência escolar</h2></div>
    <div className={styles.analysis}>
      <section className={styles.panel}>
        <div className={styles.panelHeader}><div><h3>Evolução da frequência</h3><p>Percentual de presenças por período</p></div>
          <label className={styles.srLabel}>Agrupar por<select aria-label="Agrupar por" value={view} onChange={(event) => setView(event.target.value)}><option value="day">Dia</option><option value="week">Semana</option><option value="month">Mês</option><option value="term">Bimestre</option></select></label>
        </div>
        <AttendanceLine groups={groups} view={view} />
      </section>
      <Distribution people={people} counts={counts} category={category} setCategory={setCategory} open={open} />
    </div>
    <div className={styles.analysis}>
      <section className={styles.panel}>
        <div className={styles.panelHeader}><div><h3>Frequência por turma</h3><p>Selecione uma turma para filtrar o painel.</p></div>
          <label className={styles.srLabel}>Ordenar<select aria-label="Ordenar" value={order} onChange={(event) => setOrder(event.target.value)}><option value="low">Menor frequência</option><option value="high">Maior frequência</option><option value="alpha">Ordem alfabética</option></select></label>
        </div>
        <div className={styles.bars}>{classes.map((row) => <button type="button" key={row.name} className={styles.barRow} disabled={!classOptions.includes(row.name)} onClick={() => setClassName(row.name)}><span>{row.name}</span><span className={styles.track}><i style={{ width: (row.rate || 0) + '%' }} data-low={row.rate != null && row.rate < 75} /></span><b>{percent(row.rate)}</b></button>)}</div>
        {!classes.length && <p className={styles.empty}>Nenhuma turma nesta seleção.</p>}
        {firstClass && <p className={styles.footnote}><ArrowDownRight size={14} aria-hidden="true" /> Menor frequência na seleção: {firstClass.name} · {percent(firstClass.rate)}</p>}
      </section>
      <section className={styles.panel}><h3>Mapa de ausências</h3><p>Quantidade de ausências por turma e período.</p>
        {groups.length ? <div className={styles.heatScroll}><table className={styles.heat}><thead><tr><th scope="col">Turma</th>{groups.map(([key]) => <th key={key} scope="col">{periodLabel(key, view)}</th>)}</tr></thead>
          <tbody>{classes.map((row) => <tr key={row.name}><th scope="row">{row.name}</th>{groups.map(([key]) => {
            const calls = row.students.flatMap((student) => student.entries).filter((entry) => periodKey(entry.date, view) === key);
            const rate = frequency(calls);
            const absences = calls.filter((entry) => !foiPresenca(entry.status)).length;
            return <td key={key}><span data-level={rate == null ? 'none' : rate < 75 ? 'critical' : rate < 85 ? 'warning' : 'good'} title={absences + ' ausências em ' + calls.length + ' registros'}>{calls.length ? absences : '—'}</span></td>;
          })}</tr>)}</tbody></table></div> : <p className={styles.empty}>O mapa aparece quando houver chamadas no período.</p>}
        <p className={styles.footnote}>As cores indicam a proporção de ausências. Verde até 15%, âmbar acima de 15% até 25% e vermelho acima de 25%.</p>
      </section>
    </div>
    <div className={styles.sectionHeading}><h2 id="school-alerts" tabIndex={-1}>Alertas recentes</h2><Link to="/directorNotifications">Abrir central de alertas <ArrowRight size={15} /></Link></div>
    <div className={styles.analysis}>
      <section className={styles.panel}>
        <div className={styles.panelHeader}><div><h3>Caixa de entrada</h3><p>{pendingAlerts} alertas não lidos na seleção</p></div>
          <label className={styles.srLabel}>Leitura<select aria-label="Leitura" value={alertStatus} onChange={(event) => setAlertStatus(event.target.value)}><option value="pending">Pendentes</option><option value="all">Todos</option><option value="read">Lidos</option></select></label>
        </div>
        <div className={styles.list}>{recentAlerts.filter((alert) => alertStatus === 'all' || alert.read === (alertStatus === 'read')).slice(0, 5).map((alert) => <article className={styles.listRow} key={alert.id}>
          {alert.studentKey && <StudentPortrait student={{ id: alert.studentKey, name: alert.studentName }} className={styles.listPhoto} decorative />}
          <div><b>{alert.title}</b><small>{alert.category} · {alert.date} · {alert.read ? 'Lido' : 'Pendente'}</small><small>{alert.description}</small></div>
          {alert.studentKey ? <button type="button" onClick={() => onOpenProfile(alert.studentKey)}>Ver estudante →</button> : <Link to={alert.route || '/directorNotifications'}>{alert.routeLabel || 'Ver alertas'} →</Link>}
        </article>)}</div>
        {!recentAlerts.some((alert) => alertStatus === 'all' || alert.read === (alertStatus === 'read')) && <p className={styles.empty}>Nenhum alerta com esses filtros.</p>}
      </section>
      <section className={styles.panel}><h3 id="school-signals" tabIndex={-1}>Sinais nas chamadas</h3><p>Confira o contexto antes de definir o próximo passo.</p><div className={styles.list}>{signalStudents.map((student) => <article className={styles.listRow} key={student.key}>
        <StudentPortrait student={student} className={styles.listPhoto} decorative />
        <div><b>{student.name}</b><small>{student.className} · {student.absences >= 3 ? student.absences + ' ausências consecutivas' : percent(student.rate) + ' de frequência'}</small><small>{levels.find(([key]) => key === student.level)[1]} · {dateLabel(student.entries.at(-1)?.date)}</small></div>
        <button type="button" onClick={() => open(student)}>Ver estudante →</button>
      </article>)}</div>{!signalStudents.length && <p className={styles.empty}>Nenhum sinal na seleção.</p>}</section>
    </div>

    <div className={styles.sectionHeading}><h2 id="school-interventions" tabIndex={-1}>Intervenções</h2><Link to="/directorFollowup">Abrir acompanhamento <ArrowRight size={15} /></Link></div>
    <div className={styles.analysis}>
      <section className={styles.panel}><h3>Distribuição das intervenções</h3><p>Registros por situação dentro da seleção.</p>
        {scopedRecords.length ? <div className={styles.stack} role="img" aria-label={recordsByState.map(([status, count]) => status + ': ' + count).join(', ')}>{recordsByState.map(([status, count], index) => <span key={status} data-kind={index} style={{ flex: count }} title={status + ' · ' + count} />)}</div> : <p className={styles.empty}>Nenhuma intervenção registrada nesta seleção.</p>}
        <dl className={styles.stackLegend}>{recordsByState.map(([status, count], index) => <div key={status}><dt><i data-kind={index} />{status}</dt><dd>{count}</dd></div>)}</dl>
      </section>
      <section className={styles.panel}><h3>Próximos acompanhamentos</h3><p>Retornos agendados aparecem primeiro.</p><div className={styles.list}>
        {activeRecords.slice().sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999')).slice(0, 5).map((record, index) => {
          const student = people.find((candidate) => matchesStudent(record, candidate));
          return <article className={styles.listRow} key={record.id || record.createdAt + index}><div><b>{student.name}</b><small>{record.text}</small><small>{record.status || 'Pendente'} · {record.date ? 'Retorno em ' + dateLabel(record.date) : 'Sem retorno agendado'}</small></div><button type="button" onClick={() => open(student)}>Ver perfil →</button></article>;
        })}
      </div>{!activeRecords.length && <p className={styles.empty}>Nenhuma intervenção em aberto.</p>}</section>
    </div>
    <div className={styles.analysis}>
      <section className={styles.panel}><h3 id="school-classes" tabIndex={-1}>Detalhes por turma</h3><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th scope="col">Turma</th><th scope="col">Estudantes</th><th scope="col">Frequência</th><th scope="col">Em atenção</th><th scope="col">Filtro</th></tr></thead><tbody>
        {classes.map((row) => <tr key={row.name}><th scope="row">{row.name}</th><td>{row.students.length}</td><td>{percent(row.rate)}</td><td>{row.students.filter(needsAttention).length}</td><td><button type="button" disabled={!classOptions.includes(row.name)} onClick={() => setClassName(row.name)}>Detalhar</button></td></tr>)}
      </tbody></table></div></section>
      <section className={styles.panel}><h3>Acessos rápidos</h3><nav className={styles.quickLinks} aria-label="Acessos rápidos da coordenação">
        <Link to="/carometroManagement"><BookOpen size={18} /> Carômetro <ArrowRight size={15} /></Link>
        <Link to="/reports"><Activity size={18} /> Relatórios <ArrowRight size={15} /></Link>
        <Link to="/directorFollowup"><HeartHandshake size={18} /> Acompanhamento <ArrowRight size={15} /></Link>
      </nav></section>
    </div>
  </main>;
}
