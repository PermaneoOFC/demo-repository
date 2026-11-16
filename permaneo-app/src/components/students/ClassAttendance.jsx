import { useState } from 'react';
import { hoje, presencas } from '../../data/sala.js';
import styles from '../../pages/Dashboard/Estudante/StudentArea.module.css';

export default function ClassAttendance({ turma, attendance, onSave }) {
  const [date, setDate] = useState(hoje);
  const [drafts, setDrafts] = useState({});
  const [saved, setSaved] = useState(false);
  const draft = drafts[date] || attendance[date] || {};
  return <form className={styles.card + ' ' + styles.form} onSubmit={(event) => {
    event.preventDefault();
    onSave(date, Object.fromEntries(turma.estudantes.map((student) => [student.id, draft[student.id] || 'NAO_REGISTRADA'])));
    setSaved(true);
  }}>
    <h2>Chamada da turma</h2>
    <label>Data da chamada<input type="date" value={date} required onChange={(event) => {
      setDate(event.target.value);
      setSaved(false);
    }} /></label>
    {turma.estudantes.map((student) => <label key={student.id}>{student.nome}
      <select value={draft[student.id] || 'NAO_REGISTRADA'} onChange={(event) => {
        setDrafts({ ...drafts, [date]: { ...draft, [student.id]: event.target.value } });
        setSaved(false);
      }}>
        {Object.entries(presencas).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
      </select>
    </label>)}
    <button className={styles.primary} disabled={!date || !turma.estudantes.length}>Salvar chamada demonstrativa</button>
    {saved && <p role="status">Chamada salva neste navegador.</p>}
  </form>;
}
