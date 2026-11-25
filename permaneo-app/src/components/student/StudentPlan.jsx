import { useState } from 'react';
import { Target } from 'lucide-react';
import styles from '../../pages/Dashboard/Estudante/StudentArea.module.css';

export default function StudentPlan({ goals, setGoals }) {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  return (
    <section className={styles.section}>
      <form
        className={styles.card + ' ' + styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) return;
          setGoals((list) => [
            ...list,
            { id: crypto.randomUUID(), title: title.trim(), date, done: false },
          ]);
          setTitle('');
          setDate('');
        }}
      >
        <h2 className={styles.iconHeading} data-tone="green"><span className={styles.featureIcon}><Target size={21} aria-hidden="true" /></span>Um passo de cada vez</h2>
        <p>Defina pequenas metas para sua rotina de estudos.</p>
        {goals.length > 0 && <><p>{goals.filter((goal) => goal.done).length} de {goals.length} metas concluídas</p><progress value={goals.filter((goal) => goal.done).length} max={goals.length} aria-label="Progresso das metas" /></>}
        <label>
          Nova meta
          <input
            required
            maxLength={160}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex.: revisar frações por 20 minutos"
          />
        </label>
        <label>Prazo opcional<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        <button className={styles.primary} disabled={!title.trim()}>
          Adicionar meta
        </button>
      </form>
      <p role="status">
        {goals.filter((goal) => goal.done).length} de {goals.length} metas concluídas.
      </p>
      {goals.map((goal) => (
        <div className={styles.goal} data-complete={goal.done} key={goal.id}>
          <label>
            <input
              type="checkbox"
              checked={goal.done}
              onChange={() =>
                setGoals((list) =>
                  list.map((item) => (item.id === goal.id ? { ...item, done: !item.done } : item))
                )
              }
            />
            {goal.title}
          </label>
          {goal.date && <small>Até {new Date(goal.date + 'T12:00:00').toLocaleDateString('pt-BR')}</small>}
          <button
            className={styles.secondary}
            aria-label={'Excluir meta: ' + goal.title}
            onClick={() => setGoals((list) => list.filter((item) => item.id !== goal.id))}
          >
            Excluir
          </button>
        </div>
      ))}
      {!goals.length && <p>Seu plano está vazio. Adicione a primeira meta acima.</p>}
    </section>
  );
}
