import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import styles from './StudentPlan.module.css';

export default function StudentPlan() {
  const [goals, setGoals] = useLocalStorage('permaneo-student-goals', []);
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
            { id: crypto.randomUUID(), title: title.trim(), done: false },
          ]);
          setTitle('');
        }}
      >
        <h2>Um passo de cada vez</h2>
        <p>Defina pequenas metas para sua rotina de estudos.</p>
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
        <button className={styles.primary} disabled={!title.trim()}>
          Adicionar meta
        </button>
      </form>
      <p role="status">
        {goals.filter((goal) => goal.done).length} de {goals.length} metas concluídas.
      </p>
      {goals.map((goal) => (
        <div className={styles.goal} key={goal.id}>
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
