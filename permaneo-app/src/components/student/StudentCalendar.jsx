import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { formatDate } from '../../data/studentArea.js';
import styles from '../../pages/Dashboard/Estudante/StudentArea.module.css';

const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export default function StudentCalendar({ tasks, events, personal, setPersonal }) {
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [view, setView] = useState('Mês');
  const [week, setWeek] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  });
  const [selected, setSelected] = useState('');
  const [type, setType] = useState('Todos');
  const schedule = [
    ...events,
    ...personal,
    ...tasks.map((task) => ({
      id: task.id,
      title: task.title,
      date: task.due,
      type: 'Entrega',
      time: 'Até o fim do dia',
      details: task.instructions,
    })),
  ]
    .filter((item) => type === 'Todos' || item.type === type)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const monthPrefix = dateKey(month).slice(0, 7);
  const weekEnd = new Date(week.getFullYear(), week.getMonth(), week.getDate() + 6);
  const visible = schedule.filter((item) => {
    if (selected) return item.date === selected;
    if (view === 'Semana') return item.date >= dateKey(week) && item.date <= dateKey(weekEnd);
    return view === 'Lista' || item.date.startsWith(monthPrefix);
  });
  function changePeriod(offset) {
    setSelected('');
    if (view === 'Semana') {
      setWeek(new Date(week.getFullYear(), week.getMonth(), week.getDate() + 7 * offset));
    } else {
      setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
    }
  }
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  return (
    <section className={styles.section}>
      <div className={styles.controls} aria-label="Visualização do calendário">
        {['Mês', 'Semana', 'Lista'].map((option) => <button className={styles.secondary} key={option} aria-pressed={view === option} onClick={() => { setView(option); setSelected(''); }}>{option}</button>)}
      </div>
      <div className={styles.filters}>
        {view !== 'Lista' && <>
          <button className={styles.secondary} aria-label={view === 'Mês' ? 'Mês anterior' : 'Semana anterior'} onClick={() => changePeriod(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
          <h2 aria-live="polite">{view === 'Mês'
            ? month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
            : formatDate(dateKey(week)) + ' a ' + formatDate(dateKey(weekEnd))}</h2>
          <button className={styles.secondary} aria-label={view === 'Mês' ? 'Próximo mês' : 'Próxima semana'} onClick={() => changePeriod(1)}><ChevronRight size={20} aria-hidden="true" /></button>
        </>}
        <label>
          Tipo de evento
          <select
            aria-label="Tipo de evento"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {['Todos', 'Aula', 'Prova', 'Entrega', 'Evento', 'Pessoal'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      {view === 'Mês' && <div className={styles.calendar} aria-label="Dias do mês">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <span className={styles.weekday} key={day}>
            {day}
          </span>
        ))}
        {Array.from({ length: month.getDay() }, (_, index) => (
          <span key={'empty' + index} />
        ))}
        {Array.from({ length: days }, (_, index) => {
          const day = index + 1;
          const date = dateKey(new Date(month.getFullYear(), month.getMonth(), day));
          const count = schedule.filter((item) => item.date === date).length;
          return (
            <button
              className={styles.day}
              key={day}
              aria-pressed={selected === date}
              aria-label={`${formatDate(date)}: ${count} eventos`}
              aria-current={date === dateKey(new Date()) ? 'date' : undefined}
              onClick={() => setSelected(date)}
            >
              {day}
              {count > 0 && (
                <small>
                  {count} <span>evento{count > 1 ? 's' : ''}</span>
                </small>
              )}
            </button>
          );
        })}
      </div>}
      {selected && (
        <button className={styles.secondary} onClick={() => setSelected('')}>
          Ver todo o mês
        </button>
      )}
      <h2>{selected ? 'Agenda de ' + formatDate(selected) : 'Agenda'}</h2>
      {visible.length ? (
        visible.map((item) => (
          <article className={styles.card} data-tone="purple" key={item.id}>
            <span className={styles.featureIcon}><CalendarDays size={22} aria-hidden="true" /></span>
            <span className={styles.eyebrow}>
              {item.type} · {formatDate(item.date)} · {item.time}
            </span>
            <details>
              <summary>{item.title}</summary>
              <p>{item.details || (item.type === 'Pessoal' ? 'Atividade pessoal' : 'Atividade escolar demonstrativa')}</p>
            </details>
            {item.type === 'Pessoal' && <label className={styles.check}>
              <input type="checkbox" checked={item.done} onChange={() => setPersonal((list) => list.map((entry) => entry.id === item.id ? { ...entry, done: !entry.done } : entry))} />
              Concluir {item.title}
            </label>}
          </article>
        ))
      ) : (
        <p className={styles.card}>Nenhum evento para esta seleção.</p>
      )}
      <form className={styles.card + ' ' + styles.form} onSubmit={(event) => {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);
        const title = fields.get('activity').trim();
        if (!title) return;
        setPersonal((list) => [...list, { id: crypto.randomUUID(), title, date: fields.get('date'), type: 'Pessoal', time: 'Dia inteiro', done: false }]);
        event.currentTarget.reset();
      }}>
        <h2>Adicionar atividade pessoal</h2>
        <label>Atividade<input name="activity" required maxLength={120} /></label>
        <label>Data<input name="date" type="date" required /></label>
        <button className={styles.primary}><Plus size={18} aria-hidden="true" /> Adicionar ao calendário</button>
      </form>
    </section>
  );
}
