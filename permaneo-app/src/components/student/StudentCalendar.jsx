import { useState } from 'react';
import { formatDate } from '../../data/studentArea.js';
import styles from '../../pages/Dashboard/Estudante/StudentArea.module.css';

const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export default function StudentCalendar({ tasks, events }) {
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [selected, setSelected] = useState('');
  const [type, setType] = useState('Todos');
  const schedule = [
    ...events,
    ...tasks.map((task) => ({
      id: task.id,
      title: task.title,
      date: task.due,
      type: 'Entrega',
      time: 'Até o fim do dia',
    })),
  ]
    .filter((item) => type === 'Todos' || item.type === type)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const monthPrefix = dateKey(month).slice(0, 7);
  const visible = schedule.filter((item) =>
    selected ? item.date === selected : item.date.startsWith(monthPrefix)
  );
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  return (
    <section className={styles.section}>
      <div className={styles.filters}>
        <button
          className={styles.secondary}
          aria-label="Mês anterior"
          onClick={() => {
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
            setSelected('');
          }}
        >
          ←
        </button>
        <h2 aria-live="polite">
          {month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          className={styles.secondary}
          aria-label="Próximo mês"
          onClick={() => {
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
            setSelected('');
          }}
        >
          →
        </button>
        <label>
          Tipo de evento
          <select
            aria-label="Tipo de evento"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {['Todos', 'Aula', 'Prova', 'Entrega', 'Evento'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.calendar} aria-label="Dias do mês">
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
      </div>
      {selected && (
        <button className={styles.secondary} onClick={() => setSelected('')}>
          Ver todo o mês
        </button>
      )}
      <h2>{selected ? 'Agenda de ' + formatDate(selected) : 'Agenda do mês'}</h2>
      {visible.length ? (
        visible.map((item) => (
          <article className={styles.card} key={item.id}>
            <span className={styles.eyebrow}>
              {item.type} · {formatDate(item.date)} · {item.time}
            </span>
            <h3>{item.title}</h3>
          </article>
        ))
      ) : (
        <p className={styles.card}>Nenhum evento para esta seleção.</p>
      )}
    </section>
  );
}
