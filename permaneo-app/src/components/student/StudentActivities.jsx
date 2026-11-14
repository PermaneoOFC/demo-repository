import { useState } from 'react';
import { formatDate, subjects } from '../../data/studentArea.js';
import styles from '../../pages/Dashboard/Estudante/StudentArea.module.css';

export default function StudentActivities({ tasks, onSubmit }) {
  const [filter, setFilter] = useState('Todas');
  const [subject, setSubject] = useState('Todas');
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const visibleTasks = tasks.filter(
    (task) =>
      (filter === 'Todas' || Boolean(task.submittedAt) === (filter === 'Entregues')) &&
      (subject === 'Todas' || task.subject === subject)
  );
  const selectedTask = tasks.find((task) => task.id === selected);

  return (
    <section className={styles.section}>
      <div className={styles.filters}>
        <label>
          Situação
          <select
            aria-label="Situação"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {['Todas', 'Pendentes', 'Entregues'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Disciplina
          <select
            aria-label="Disciplina"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          >
            <option>Todas</option>
            {subjects.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">{message}</p>
      <div className={styles.grid}>
        {visibleTasks.map((task) => (
          <article className={styles.card} key={task.id}>
            <span className={styles.eyebrow}>
              {task.subject} · Até {formatDate(task.due)}
            </span>
            <h2>{task.title}</h2>
            <span className={styles.badge}>
              {task.submittedAt ? 'Entregue · demonstração' : 'Pendente'}
            </span>
            <p>{task.instructions}</p>
            <button
              className={styles.secondary}
              onClick={() => {
                setSelected(task.id);
                setAnswer(task.answer);
                setMessage('');
              }}
            >
              {task.submittedAt ? 'Ver resposta' : 'Abrir atividade'}: {task.title}
            </button>
          </article>
        ))}
      </div>
      {!visibleTasks.length && <p className={styles.card}>Nenhuma atividade com esses filtros.</p>}
      {selectedTask && (
        <ActivityAnswer
          task={selectedTask}
          answer={answer}
          onChange={setAnswer}
          onClose={() => setSelected(null)}
          onSubmit={() => {
            onSubmit(selectedTask.id, answer.trim());
            setSelected(null);
            setAnswer('');
            setMessage(
              'Atividade entregue nesta demonstração. A resposta foi salva somente neste navegador.'
            );
          }}
        />
      )}
    </section>
  );
}

function ActivityAnswer({ task, answer, onChange, onClose, onSubmit }) {
  return (
    <section className={styles.card} aria-label={'Resposta: ' + task.title}>
      <h2>{task.title}</h2>
      <p>{task.instructions}</p>
      {task.submittedAt ? (
        <>
          <h3>Sua resposta</h3>
          <p className={styles.answer}>{task.answer}</p>
          <p>
            Entrega demonstrativa registrada em {new Date(task.submittedAt).toLocaleString('pt-BR')}
            . Aguardando correção; não há feedback de professor nesta demonstração.
          </p>
        </>
      ) : (
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (!answer.trim()) return;
            onSubmit();
          }}
        >
          <label>
            Sua resposta
            <textarea
              required
              maxLength={5000}
              rows={6}
              value={answer}
              onChange={(event) => onChange(event.target.value)}
            />
          </label>
          <button className={styles.primary} disabled={!answer.trim()}>
            Entregar atividade demonstrativa
          </button>
        </form>
      )}
      <button className={styles.secondary} onClick={onClose}>
        Fechar atividade
      </button>
    </section>
  );
}
