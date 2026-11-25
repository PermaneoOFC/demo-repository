import { useState } from 'react';
import StudentPortrait from '../../../components/students/StudentPortrait.jsx';
import { Link } from 'react-router-dom';
import { getStudentProfile } from '../../../data/studentProfiles.js';
import { demoStudents } from '../../../data/students.js';
import { normalizar, presencas, presencasAbreviadas, turmasDemo } from '../../../data/sala.js';
import styles from '../Estudante/StudentArea.module.css';

const students = demoStudents.map((student) => getStudentProfile(student.key));
const classes = [...new Set(students.map((student) => student.className))];
const states = ['Pendente', 'Em andamento', 'Concluída'];

export default function Monitoring({ role = 'director', records = [], setRecords, onOpenProfile, classAttendance = {}, onStartFollowup }) {
  const isTeacher = role === 'teacher';
  const [className, setClassName] = useState('');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Visão geral');
  const [date, setDate] = useState('');
  const visible = students.filter((student) =>
    (!className || student.className === className) && normalizar(student.name).includes(normalizar(search))
  );
  const group = records.filter((record) => visible.some((student) => [student.key, student.name].includes(record.student)));
  const pending = group.filter((record) => record.status !== 'Concluída');
  const alerts = visible.filter((student) => student.attendance < 85);
  const attendance = visible.length ? Math.round(visible.reduce((sum, student) => sum + student.attendance, 0) / visible.length) + '%' : '—';
  const savedAttendance = (student) => classAttendance[turmasDemo.find((turma) => turma.nome === student.className)?.id] || {};
  const dates = [...new Set(visible.flatMap((student) => [
    ...student.recentAttendance.map((day) => day.date.split('/').reverse().join('-')),
    ...Object.keys(savedAttendance(student)),
  ]))].sort();
  const displayDate = (day) => day.split('-').reverse().join('/');
  const filteredDates = dates.filter((day) => !date || day === date);
  const openProfile = (student, event) => {
    event.preventDefault();
    onOpenProfile(student.key);
  };

  return <div className={styles.area} data-local-content>
    <header className={styles.intro}>
      <h1>{isTeacher ? 'Acompanhamento das turmas' : 'Acompanhamento escolar'}</h1>
      <p>{isTeacher ? 'Acompanhe a frequência dos estudantes e registre encaminhamentos pedagógicos.' : 'Consulte a frequência e organize os próximos passos de apoio.'}</p>
    </header>
    <div className={styles.filters}>
      <label>Turma<select value={className} onChange={(event) => { setClassName(event.target.value); setDate(''); }}>
        <option value="">Todas as turmas</option>
        {classes.map((name) => <option key={name}>{name}</option>)}
      </select></label>
      <label>Estudante<input value={search} onChange={(event) => { setSearch(event.target.value); setDate(''); }} placeholder="Buscar por nome" /></label>
    </div>
    <div className={styles.stats}>
      {[[attendance, 'Frequência média'], [alerts.length, 'Alertas de frequência'], [pending.length, 'Registros em aberto'], [visible.length, 'Estudantes na seleção']].map(([value, label]) =>
        <article key={label}><strong>{value}</strong><span>{label}</span></article>
      )}
    </div>
    <div className={styles.controls} aria-label="Visões de acompanhamento">
      {['Visão geral', 'Mapa de frequência', 'Intervenções'].map((name) => <button key={name} className={styles.secondary} aria-pressed={tab === name} onClick={() => setTab(name)}>{name}</button>)}
    </div>
    {tab === 'Visão geral' && <section className={styles.card}>
      <h2>Alertas de frequência</h2>
      <p>O alerta sinaliza frequência abaixo de 85% nos registros demonstrativos.</p>
      {alerts.map((student) => <div className={styles.row} key={student.key}>
        <div className={styles.person}><StudentPortrait student={student} className={styles.personPhoto} decorative /><span><b>{student.name}</b><small>{student.className} · {student.attendance}% de frequência</small></span></div>
        <div className={styles.controls}>
          <Link className={styles.secondary} to={'/Profile' + student.key + (isTeacher ? 'Teacher' : 'Management')} onClick={(event) => openProfile(student, event)}>Ver perfil de {student.name}</Link>
          {onStartFollowup && <button type="button" className={styles.primary} onClick={() => onStartFollowup(student)}>Registrar intervenção</button>}
        </div>
      </div>)}
      {!alerts.length && <p>Nenhum alerta nesta seleção.</p>}
    </section>}
    {tab === 'Mapa de frequência' && <section className={styles.card}>
      <h2>Mapa de frequência</h2>
      <div className={styles.filters}>
        <label>Data<select value={date} onChange={(event) => setDate(event.target.value)}>
          <option value="">Todas as datas</option>
          {dates.map((day) => <option key={day} value={day}>{displayDate(day)}</option>)}
        </select></label>
      </div>
      <p>P = Presente · AT = Atrasado · A = Ausente · J = Falta justificada · — = Sem registro</p>
      <div className={styles.tableScroll}>
        <table className={styles.attendanceTable}>
          <thead><tr><th scope="col">Estudante</th>{filteredDates.map((day) => <th key={day} scope="col">{displayDate(day).slice(0, 5)}</th>)}</tr></thead>
          <tbody>{visible.map((student) => <tr key={student.key}>
            <th scope="row"><Link to={'/Profile' + student.key + (isTeacher ? 'Teacher' : 'Management')} onClick={(event) => openProfile(student, event)}>{student.name}</Link></th>
            {filteredDates.map((day) => {
              const entry = student.recentAttendance.find((item) => item.date === displayDate(day));
              const status = savedAttendance(student)[day]?.[student.key];
              const code = status
                ? presencasAbreviadas[status]
                : !entry ? '—' : !entry.absent ? 'P' : entry.justified ? 'J' : 'A';
              const label = status ? presencas[status] : Object.entries(presencasAbreviadas).find(([, letter]) => letter === code)?.[0];
              return <td key={day} data-presence={code} title={status ? label : presencas[label]}>{code}</td>;
            })}
          </tr>)}</tbody>
        </table>
        {!visible.length && <p>Nenhum estudante nesta seleção.</p>}
      </div>
    </section>}
    {tab === 'Intervenções' && <section className={styles.card}>
      <h2>Linha do tempo das intervenções</h2>
      {group.slice().reverse().map((record, index) => {
        const student = visible.find((item) => [item.key, item.name].includes(record.student));
        return <article className={styles.row} key={record.id || record.createdAt + index}>
          <div><b>{student?.name || record.student}</b><p>{record.text}</p>
            <small>{record.createdAt && new Date(record.createdAt).toLocaleDateString('pt-BR')}{record.date && ' · Retorno ' + record.date.split('-').reverse().join('/')}</small>
          </div>
          <label>Situação<select value={record.status} onChange={(event) => {
            const status = event.target.value;
            setRecords((list) => list.map((item) => item === record ? { ...item, status } : item));
          }}>{states.map((state) => <option key={state}>{state}</option>)}</select></label>
        </article>;
      })}
      {!group.length && <p>Abra um perfil no Carômetro para registrar a primeira intervenção.</p>}
      <Link className={styles.secondary} to={isTeacher ? '/carometroTeacher' : '/carometroManagement'}>Abrir Carômetro</Link>
    </section>}
    <p className={styles.demo}>Dados fictícios. As intervenções ficam neste navegador.</p>
  </div>;
}
