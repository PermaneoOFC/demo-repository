import StudentPortrait from './StudentPortrait.jsx';
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, Circle, Search, X } from 'lucide-react';
import { hoje, presencas } from '../../data/sala.js';
import styles from './ClassAttendance.module.css';

const statuses = Object.entries(presencas).filter(([status]) => status !== 'NAO_REGISTRADA');

export default function ClassAttendance({ turma, attendance = {}, attendanceMeta = {}, onSave, onClose }) {
  const [date, setDate] = useState(hoje());
  const [lesson, setLesson] = useState(attendanceMeta[hoje()] || '1ª aula');
  const [drafts, setDrafts] = useState({});
  const [search, setSearch] = useState('');
  const [review, setReview] = useState(false);
  const [saved, setSaved] = useState(false);
  const original = attendance[date] || {};
  const draft = drafts[date] || original;
  const matching = useMemo(() => turma.estudantes.filter((student) => student.nome.toLowerCase().includes(search.toLowerCase())), [turma.estudantes, search]);
  const completed = turma.estudantes.filter((student) => statuses.some(([value]) => (draft[student.id] || 'NAO_REGISTRADA') === value)).length;
  const calls = Object.entries(attendance).sort(([a], [b]) => b.localeCompare(a));
  function mark(studentId, status) {
    setDrafts((previous) => ({ ...previous, [date]: { ...(previous[date] || original), [studentId]: status } }));
    setSaved(false);
  }
  function submit(event) {
    event.preventDefault();
    if (review) {
      onSave(date, draft, lesson);
      setSaved(true);
      setReview(false);
      return;
    }
    if (completed !== turma.estudantes.length) return;
    setReview(true);
  }
  return <div className={styles.scrim} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <form className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="attendance-title" onSubmit={submit}>
      <header className={styles.header}><div><span className={styles.kicker}>Registro de frequência</span><h2 id="attendance-title">{review ? 'Revisar chamada' : 'Realizar chamada'}</h2><p>{turma.nome} · {turma.serie} · {turma.periodo}</p></div><button type="button" className={styles.close} onClick={onClose} aria-label="Fechar chamada"><X size={20} /></button></header>
      {!review ? <>
        <div className={styles.meta}><label>Data da aula<input type="date" value={date} required onChange={(event) => { setDate(event.target.value); setLesson(attendanceMeta[event.target.value] || '1ª aula'); setSaved(false); }} /></label><label>Aula<select value={lesson} onChange={(event) => setLesson(event.target.value)}>{['1ª aula', '2ª aula', '3ª aula', '4ª aula', '5ª aula', 'Aula dupla', 'Outro horário'].map((value) => <option key={value}>{value}</option>)}</select></label><div className={styles.progress}><span>Registros concluídos</span><strong>{completed} <small>/ {turma.estudantes.length}</small></strong><i><b style={{ width: `${turma.estudantes.length ? completed / turma.estudantes.length * 100 : 0}%` }} /></i></div></div>
        <label className={styles.search}><Search size={17} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar estudante" /></label>
        <div className={styles.roster}>{matching.map((student) => {
          const current = draft[student.id] || 'NAO_REGISTRADA';
          const completedMark = statuses.some(([value]) => value === current);
          return <article className={styles.studentRow} key={student.id}><StudentPortrait student={student} className={styles.photo} decorative /><div className={styles.name}><strong>{student.nome}</strong><small>{completedMark ? presencas[current] : 'Marcação pendente'}</small></div><div className={styles.statusButtons} role="group" aria-label={`Marcação para ${student.nome}`}>{statuses.map(([value, label]) => <button type="button" key={value} data-status={value.toLowerCase()} aria-label={`${student.nome}: ${label}`} aria-pressed={current === value} title={label} onClick={() => mark(student.id, value)}>{current === value ? <Check size={15} /> : <Circle size={15} />}<span>{label}</span></button>)}</div></article>;
        })}</div>
        {!matching.length && <p className={styles.empty}>Nenhum estudante corresponde à busca.</p>}
        <section className={styles.history}><h3>Chamadas anteriores</h3>{calls.length ? <ul>{calls.slice(0, 5).map(([callDate, students]) => <li key={callDate}><span>{new Date(`${callDate}T12:00:00`).toLocaleDateString('pt-BR')} · {attendanceMeta[callDate] || 'Aula'}</span><span>{turma.estudantes.filter((student) => students[student.id] && students[student.id] !== 'NAO_REGISTRADA').length}/{turma.estudantes.length} registros concluídos</span></li>)}</ul> : <p>Esta turma ainda não tem chamadas salvas.</p>}</section>
      </> : <section className={styles.review}><CheckCircle2 size={28} /><h3>Confira os registros antes de salvar</h3><p>{turma.nome} · {new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR')} · {lesson}</p><div><span>{turma.estudantes.length} estudantes registrados</span>{statuses.map(([value, label]) => <span key={value}>{label}<b>{turma.estudantes.filter((student) => draft[student.id] === value).length}</b></span>)}</div><ul className={styles.reviewList}>{turma.estudantes.map((student) => <li key={student.id}><span>{student.nome}</span><b>{presencas[draft[student.id]]}</b></li>)}</ul><p className={styles.notice}>Ao confirmar, esta chamada será salva junto ao histórico de frequência da turma.</p><button type="button" className={styles.back} onClick={() => setReview(false)}><ArrowLeft size={15} /> Voltar e revisar</button></section>}
      <footer className={styles.footer}>{saved && <span role="status" className={styles.saved}><CheckCircle2 size={16} /> Chamada salva com sucesso.</span>}<button type="button" className={styles.cancel} onClick={onClose}>{saved ? 'Concluir' : 'Cancelar'}</button>{!saved && <button className={styles.save} disabled={!review && completed !== turma.estudantes.length}>{review ? 'Confirmar e salvar' : `Revisar chamada · ${completed}/${turma.estudantes.length}`} <Check size={16} /></button>}</footer>
    </form>
  </div>;
}
