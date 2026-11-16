import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, HeartHandshake, TrendingDown, Download, Info } from 'lucide-react';
import { demoStudents } from '../../../data/students.js';
import { getStudentProfile } from '../../../data/studentProfiles.js';
import { turmasDemo } from '../../../data/sala.js';
import styles from './SchoolOverview.module.css';

const iso = (value) => value.split('/').reverse().join('-');
const dateLabel = (value) => value.split('-').reverse().join('/');
const percent = (n) => n == null ? '—' : `${n.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
const ratio = (entries) => entries.length ? 100 * entries.filter((entry) => entry.status === 'PRESENTE').length / entries.length : null;
const groupKey = (date, view) => {
  if (view === 'month') return date.slice(0, 7);
  if (view === 'week') { const d = new Date(`${date}T12:00:00Z`); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); }
  return date;
};
const labelKey = (key, view) => view === 'month' ? key.slice(5) + '/' + key.slice(0, 4) : dateLabel(key).slice(0, 5);

export default function SchoolOverview({ records = [], classAttendance = {}, localStudents = [], onOpenProfile }) {
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState('');
  const [shift, setShift] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [view, setView] = useState('week');
  const [order, setOrder] = useState('low');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const students = useMemo(() => [...demoStudents.map((s) => ({ ...getStudentProfile(s.key), id: s.key })), ...localStudents.map((s) => ({ ...s, key: s.id }))], [localStudents]);
  const classes = useMemo(() => [...new Set(students.map((s) => s.className).filter(Boolean))].sort(), [students]);
  const meta = (name) => turmasDemo.find((c) => c.nome === name);
  const selected = students.filter((s) => (!className || s.className === className) && (!grade || (meta(s.className)?.serie || s.className.split(' ')[0]) === grade) && (!shift || meta(s.className)?.periodo === shift));
  const allEntries = useMemo(() => students.flatMap((student) => {
    const map = new Map((student.recentAttendance || []).map((day) => [iso(day.date), day.absent ? (day.justified ? 'JUSTIFICADA' : 'AUSENTE') : 'PRESENTE']));
    const id = meta(student.className)?.id;
    Object.entries(classAttendance[id] || {}).forEach(([date, values]) => { if (values[student.key]) map.set(date, values[student.key]); });
    return [...map].filter(([, value]) => ['PRESENTE', 'AUSENTE', 'JUSTIFICADA'].includes(value)).map(([date, value]) => ({ date, status: value, student: student.key, className: student.className }));
  }), [students, classAttendance]);
  const entries = allEntries.filter((e) => selected.some((s) => s.key === e.student) && (!from || e.date >= from) && (!to || e.date <= to));
  const people = selected.map((s) => {
    const days = entries.filter((e) => e.student === s.key).sort((a, b) => a.date.localeCompare(b.date));
    const frequency = ratio(days);
    let consecutive = 0;
    for (let i = days.length - 1; i >= 0 && days[i].status !== 'PRESENTE'; i--) consecutive++;
    const situation = frequency == null ? 'Sem dados' : frequency < 75 || consecutive >= 3 ? 'Prioritário' : frequency < 85 ? 'Atenção' : 'Satisfatória';
    return { ...s, days, frequency, consecutive, situation };
  });
  const groups = [...new Set(entries.map((e) => groupKey(e.date, view)))].sort().map((key) => ({ key, frequency: ratio(entries.filter((e) => groupKey(e.date, view) === key)) }));
  const classRows = [...new Set(selected.map((s) => s.className))].map((name) => ({ name, students: people.filter((s) => s.className === name), frequency: ratio(entries.filter((e) => e.className === name)) })).sort((a, b) => order === 'alpha' ? a.name.localeCompare(b.name) : (order === 'low' ? 1 : -1) * ((a.frequency ?? -1) - (b.frequency ?? -1)));
  const scopedRecords = records.filter((r) => {
    const date = (r.createdAt || '').slice(0, 10);
    return selected.some((s) => [s.key, s.name].includes(r.student)) && (!from || (date && date >= from)) && (!to || (date && date <= to));
  });
  const alerts = people.filter((s) => s.situation === 'Atenção' || s.situation === 'Prioritário').filter((s) => !priority || s.situation === priority).filter((s) => !status || (scopedRecords.some((r) => [s.key, s.name].includes(r.student) && r.status !== 'Concluída') ? 'Em acompanhamento' : 'Sem acompanhamento') === status);
  const frequency = ratio(entries);
  const categories = ['Satisfatória', 'Atenção', 'Prioritário', 'Sem dados'].map((name) => ({ name, count: people.filter((s) => s.situation === name).length }));
  const open = (student) => onOpenProfile(student.key);
  const exportCsv = () => {
    const rows = [['Estudante', 'Turma', 'Frequência no período', 'Situação'], ...people.map((s) => [s.name, s.className, percent(s.frequency), s.situation])];
    const csv = '\ufeff' + rows.map((row) => row.map((v) => `"${String(v ?? '').replaceAll('"', '""')}"`).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'permaneo-visao-escolar.csv'; a.click(); URL.revokeObjectURL(url);
  };
  return <main className={styles.dashboard} data-local-content>
    <header className={styles.intro}><div><p className={styles.context}>Escola Estadual Horizonte <span>· Demonstração</span></p><h1>Visão geral da escola</h1><p>Acompanhe a frequência, identifique tendências e tome decisões com base nos dados da sua escola.</p></div><button className={styles.export} onClick={exportCsv}><Download size={17}/> Exportar relatório</button></header>
    <section className={styles.filters} aria-label="Filtros do painel">
      <label>Série<select value={grade} onChange={(e) => { setGrade(e.target.value); setClassName(''); }}><option value="">Todas as séries</option>{[...new Set(classes.map((c) => meta(c)?.serie || c.split(' ')[0]))].sort().map((v) => <option key={v}>{v}</option>)}</select></label>
      <label>Turma<select value={className} onChange={(e) => setClassName(e.target.value)}><option value="">Todas as turmas</option>{classes.filter((c) => !grade || (meta(c)?.serie || c.split(' ')[0]) === grade).map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>Turno<select value={shift} onChange={(e) => setShift(e.target.value)}><option value="">Todos os turnos</option>{[...new Set(turmasDemo.map((c) => c.periodo))].map((v) => <option key={v}>{v}</option>)}</select></label>
      <label>De<input type="date" value={from} max={to || undefined} onChange={(e) => setFrom(e.target.value)}/></label><label>Até<input type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)}/></label>
    </section>
    <p className={styles.notice}><Info size={16}/> Dados demonstrativos e registros salvos neste navegador. Frequência calculada apenas sobre as chamadas detalhadas disponíveis na seleção; pode diferir da frequência geral do perfil. Faltas justificadas contam como ausência e dias sem registro não entram no cálculo.</p>
    <section className={styles.kpis} aria-label="Indicadores principais">
      {[[Users, 'Estudantes cadastrados', selected.length, 'Cadastros na seleção'], [Activity, 'Frequência nas chamadas', percent(frequency), 'Meta de referência: 75%'], [HeartHandshake, 'Estudantes em atenção', people.filter((s) => ['Atenção','Prioritário'].includes(s.situation)).length, 'Inclui acompanhamento prioritário'], [TrendingDown, 'Queda de frequência', '—', 'Comparação individual indisponível'], [Activity, 'Taxa de permanência', '—', 'Histórico de matrículas indisponível']].map(([Icon, title, value, detail]) => <article className={styles.kpi} key={title}><div><span>{title}</span><Icon size={17}/></div><strong>{value}</strong><small>{detail}</small></article>)}
    </section>
    <div className={styles.sectionHeading}><div><h2>Análise de frequência escolar</h2><p>Leitura dos registros de presença no período selecionado.</p></div></div>
    <div className={styles.analysis}><section className={styles.panel}><div className={styles.panelHeader}><div><h3>Evolução da frequência</h3><p>Percentual de presenças por período</p></div><label className={styles.srLabel}>Agrupar por<select value={view} onChange={(e) => setView(e.target.value)}><option value="day">Dia</option><option value="week">Semana</option><option value="month">Mês</option></select></label></div>
      {groups.length ? <><div className={styles.chart}><svg viewBox="0 0 600 200" preserveAspectRatio="none" role="img" aria-label="Gráfico de evolução da frequência"><line x1="35" y1="60" x2="585" y2="60" className={styles.goal}/><text x="38" y="54">Meta 75%</text><polyline className={styles.line} points={groups.map((g, i) => `${groups.length === 1 ? 310 : 40 + i * 530 / (groups.length - 1)},${180 - g.frequency * 1.6}`).join(' ')}/>{groups.map((g, i) => <circle key={g.key} cx={groups.length === 1 ? 310 : 40 + i * 530 / (groups.length - 1)} cy={180 - g.frequency * 1.6} r="5" className={styles.point}><title>{labelKey(g.key, view)}: {percent(g.frequency)}</title></circle>)}</svg></div><div className={styles.chartLabels}>{groups.map((g) => <span key={g.key}>{labelKey(g.key, view)}<b>{percent(g.frequency)}</b></span>)}</div></> : <p className={styles.empty}>Nenhuma chamada registrada neste período.</p>}
      <p className={styles.footnote}>Comparação automática com período anterior ainda não disponível.</p></section>
      <section className={styles.panel}><div className={styles.panelHeader}><div><h3>Comparação entre turmas</h3><p>Frequência nas chamadas registradas</p></div><label className={styles.srLabel}>Ordenar<select value={order} onChange={(e) => setOrder(e.target.value)}><option value="low">Menor frequência</option><option value="high">Maior frequência</option><option value="alpha">Ordem alfabética</option></select></label></div><div className={styles.bars}>{classRows.map((row) => <button key={row.name} className={styles.barRow} onClick={() => setClassName(row.name)} title="Filtrar painel por esta turma"><span>{row.name}</span><span className={styles.track}><i style={{width: `${row.frequency ?? 0}%`}} data-low={row.frequency != null && row.frequency < 75}/></span><b>{percent(row.frequency)}</b></button>)}{!classRows.length && <p className={styles.empty}>Nenhuma turma nesta seleção.</p>}</div><p className={styles.footnote}>Selecione uma turma para filtrar todo o painel.</p></section></div>
    <div className={styles.analysis}><section className={styles.panel}><div className={styles.panelHeader}><div><h3>Mapa de frequência escolar</h3><p>Ausências por turma e {view === 'month' ? 'mês' : view === 'week' ? 'semana' : 'dia'}</p></div></div><div className={styles.heatScroll}><table className={styles.heat}><thead><tr><th>Turma</th>{groups.map((g) => <th key={g.key}>{labelKey(g.key, view)}</th>)}</tr></thead><tbody>{classRows.map((row) => <tr key={row.name}><th>{row.name}</th>{groups.map((g) => { const list = entries.filter((e) => e.className === row.name && groupKey(e.date, view) === g.key); const f = ratio(list); return <td key={g.key}><span tabIndex="0" data-level={f == null ? 'none' : f < 75 ? 'critical' : f < 85 ? 'warning' : 'good'} title={`${row.name} · ${labelKey(g.key, view)} · ${list.filter((e) => e.status === 'PRESENTE').length} presenças · ${list.filter((e) => e.status !== 'PRESENTE').length} ausências · ${percent(f)}`}>{percent(f)}</span></td>; })}</tr>)}</tbody></table></div><p className={styles.footnote}>Verde: 85% ou mais · Âmbar: 75% a 84,9% · Vermelho: abaixo de 75% · — sem registros</p></section>
    <section className={styles.panel}><h3>Distribuição dos estudantes</h3><p>Uma categoria por estudante, com base nas chamadas da seleção.</p><div className={styles.donut} role="img" aria-label={`Distribuição: ${categories.map((c) => `${c.name} ${c.count}`).join(', ')}`} style={{ background: people.length ? `conic-gradient(#32936b 0 ${categories[0].count / people.length * 100}%, #c58b32 0 ${(categories[0].count + categories[1].count) / people.length * 100}%, #ba6952 0 ${(categories[0].count + categories[1].count + categories[2].count) / people.length * 100}%, #84999e 0 100%)` : 'var(--app-bg)' }}><span><b>{people.length}</b> estudantes</span></div><div className={styles.distribution}>{categories.map((item) => <button key={item.name} onClick={() => setCategory(category === item.name ? '' : item.name)} aria-pressed={category === item.name}><span data-category={item.name} className={styles.dot}/><span>{item.name}</span><strong>{item.count}</strong><small>{people.length ? percent(item.count / people.length * 100) : '—'}</small></button>)}</div>{category && <div className={styles.categoryList}><b>{category}</b>{people.filter((s) => s.situation === category).map((s) => <button key={s.key} onClick={() => open(s)}>{s.name} · {s.className}</button>)}</div>}<p className={styles.footnote}>Prioritário: abaixo de 75% ou 3 ausências seguidas; atenção: de 75% a menos de 85%; satisfatória: 85% ou mais.</p></section></div>
    <div className={styles.sectionHeading}><div><h2>Atuação e acompanhamento</h2><p>Sinais para apoiar a equipe, sem definir diagnósticos.</p></div><Link to="/directorFollowup">Abrir acompanhamento →</Link></div>
    <div className={styles.analysis}><section className={styles.panel}><div className={styles.panelHeader}><div><h3>Situações que precisam de atenção</h3><p>{alerts.length} estudante(s) na seleção</p></div><div className={styles.inlineFilters}><label>Prioridade<select value={priority} onChange={(e) => setPriority(e.target.value)}><option value="">Todas</option><option>Atenção</option><option>Prioritário</option></select></label><label>Status<select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Todos</option><option>Em acompanhamento</option><option>Sem acompanhamento</option></select></label></div></div><div className={styles.list}>{alerts.map((s) => { const active = scopedRecords.some((r) => [s.key, s.name].includes(r.student) && r.status !== 'Concluída'); return <div className={styles.listRow} key={s.key}><div><b>{s.name}</b><small>{s.className} · {s.consecutive >= 3 ? `${s.consecutive} ausências consecutivas` : `${percent(s.frequency)} nas chamadas selecionadas`} · {active ? 'Em acompanhamento' : 'Sem acompanhamento'}</small><small>Último registro: {s.days.length ? dateLabel(s.days.at(-1).date) : 'indisponível'}</small></div><span className={styles.tag}>{s.situation}</span><button onClick={() => open(s)}>Ver estudante →</button></div>; })}{!alerts.length && <p className={styles.empty}>Nenhuma situação encontrada com estes filtros.</p>}</div></section>
    <section className={styles.panel}><h3>Acompanhamentos em andamento</h3><p>Registros locais vinculados aos estudantes selecionados.</p><div className={styles.recordStats}><div><strong>{scopedRecords.filter((r) => r.status !== 'Concluída').length}</strong><span>Em aberto</span></div><div><strong>{scopedRecords.filter((r) => r.status === 'Concluída').length}</strong><span>Concluídos</span></div></div><div className={styles.list}>{scopedRecords.slice().reverse().slice(0, 4).map((r, i) => { const student = people.find((s) => [s.key, s.name].includes(r.student)); return <div className={styles.listRow} key={r.id || i}><div><b>{student?.name}</b><small>{r.text}</small><small>{r.status || 'Pendente'}{r.createdAt ? ` · ${new Date(r.createdAt).toLocaleDateString('pt-BR')}` : ''}</small></div>{student && <button onClick={() => open(student)}>Ver perfil →</button>}</div>; })}{!scopedRecords.length && <p className={styles.empty}>Nenhum acompanhamento registrado nesta seleção.</p>}</div><p className={styles.footnote}>Contatos e retornos não são classificados separadamente nos dados disponíveis.</p></section></div>
    <div className={styles.analysis}><section className={styles.panel}><h3>Turmas com maior necessidade de atenção</h3><p>Ordenadas conforme a opção de comparação acima.</p><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Turma</th><th>Estudantes</th><th>Frequência</th><th>Em atenção</th><th></th></tr></thead><tbody>{classRows.map((row) => <tr key={row.name}><th>{row.name}</th><td>{row.students.length}</td><td>{percent(row.frequency)}</td><td>{row.students.filter((s) => ['Atenção','Prioritário'].includes(s.situation)).length}</td><td><button onClick={() => setClassName(row.name)}>Detalhar</button></td></tr>)}</tbody></table></div></section><section className={styles.panel}><h3>Tendências da escola</h3>{classRows.filter((r) => r.frequency != null).length ? <p>A turma com menor frequência nas chamadas selecionadas é <b>{[...classRows].filter((r) => r.frequency != null).sort((a,b) => a.frequency-b.frequency)[0].name}</b>, com {percent([...classRows].filter((r) => r.frequency != null).sort((a,b) => a.frequency-b.frequency)[0].frequency)}.</p> : <p>Registre chamadas para visualizar tendências.</p>}<p className={styles.footnote}>Retornos à frequência satisfatória e evolução de matrículas exigem histórico adicional.</p><Link to="/carometroManagement">Abrir carômetro →</Link></section></div>
  </main>;
}
