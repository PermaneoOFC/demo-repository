import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StudentActivities from '../../../components/student/StudentActivities.jsx';
import StudentCalendar from '../../../components/student/StudentCalendar.jsx';
import StudentPlan from '../../../components/student/StudentPlan.jsx';
import SupportForm from '../../../components/student/SupportForm.jsx';
import useLocalStorage from '../../../hooks/useLocalStorage.js';
import { initialSchoolwork, subjects, notices, formatDate } from '../../../data/studentArea.js';
import styles from './StudentArea.module.css';

const titles = {
  student: ['Meu dia', 'Vamos organizar seus próximos passos?'],
  studentActivities: ['Minhas atividades', 'Confira os prazos e prepare suas respostas.'],
  studentCalendar: ['Calendário escolar', 'Aulas, provas, entregas e encontros em um só lugar.'],
  studentSubjects: ['Minhas disciplinas', 'Acompanhe seus indicadores e revise os materiais.'],
  studentNotices: ['Avisos da escola', 'Fique por dentro do que acontece na escola.'],
  studentPlan: ['Meu plano de estudos', 'Pequenas metas ajudam a construir sua rotina.'],
  studentSupport: ['Meus pedidos de apoio', 'Você pode pedir ajuda e consultar seus pedidos.'],
};

export default function StudentArea() {
  const route = useLocation().pathname.slice(1);
  const [schoolwork, setSchoolwork] = useLocalStorage(
    'permaneo-student-schoolwork',
    initialSchoolwork
  );
  const [readNotices, setReadNotices] = useLocalStorage('permaneo-student-read-notices', []);
  const [material, setMaterial] = useState('');
  const { tasks, events } = schoolwork;
  const delivered = tasks.filter((task) => task.submittedAt).length;
  const pending = tasks
    .filter((task) => !task.submittedAt)
    .sort((a, b) => a.due.localeCompare(b.due));
  const progress = tasks.length ? Math.round((delivered / tasks.length) * 100) : 0;
  const [title, subtitle] = titles[route] || titles.student;

  return (
    <div className={styles.area} data-local-content>
      <header className={styles.intro}>
        <span className={styles.eyebrow}>Seu espaço de aprendizagem</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      <p className={styles.demo}>
        Demonstração com dados fictícios. Respostas, metas e pedidos ficam somente neste navegador;
        nada é enviado à escola.
      </p>
      {route === 'student' && (
        <>
          <section className={styles.stats} aria-label="Resumo do aluno">
            <article>
              <strong>{pending.length}</strong>
              <span>Atividades pendentes</span>
            </article>
            <article>
              <strong>{delivered}</strong>
              <span>Entregas demonstrativas</span>
            </article>
            <article>
              <strong>94%</strong>
              <span>Frequência demonstrativa</span>
            </article>
            <article>
              <strong>{notices.filter((item) => !readNotices.includes(item.id)).length}</strong>
              <span>Avisos não lidos</span>
            </article>
          </section>
          <section className={styles.card}>
            <h2>Meu progresso nas atividades</h2>
            <p>
              {delivered} de {tasks.length} atividades entregues · {progress}%
            </p>
            <progress
              value={delivered}
              max={tasks.length || 1}
              aria-label="Progresso das atividades"
            />
          </section>
          <div className={styles.grid}>
            <section className={styles.card}>
              <h2>Próximas entregas</h2>
              {pending.length ? (
                pending.map((task) => (
                  <div className={styles.row} key={task.id}>
                    <span>
                      <b>{task.title}</b>
                      <small>
                        {task.subject} · {formatDate(task.due)}
                      </small>
                    </span>
                    <span className={styles.badge}>Pendente</span>
                  </div>
                ))
              ) : (
                <p>Suas atividades estão em dia. Bom trabalho!</p>
              )}
              <Link className={styles.secondary} to="/studentActivities">
                Ver atividades
              </Link>
            </section>
            <section className={styles.card}>
              <h2>Próximos encontros</h2>
              {events.map((event) => (
                <div className={styles.row} key={event.id}>
                  <span>
                    <b>{event.title}</b>
                    <small>
                      {formatDate(event.date)} · {event.time}
                    </small>
                  </span>
                  <span className={styles.badge}>{event.type}</span>
                </div>
              ))}
              <Link className={styles.secondary} to="/studentCalendar">
                Abrir calendário
              </Link>
            </section>
          </div>
          <SupportForm />
        </>
      )}
      {route === 'studentActivities' && (
        <StudentActivities
          tasks={tasks}
          onSubmit={(id, answer) =>
            setSchoolwork((previous) => ({
              ...previous,
              tasks: previous.tasks.map((task) =>
                task.id === id ? { ...task, answer, submittedAt: new Date().toISOString() } : task
              ),
            }))
          }
        />
      )}
      {route === 'studentCalendar' && <StudentCalendar tasks={tasks} events={events} />}
      {route === 'studentSubjects' && (
        <div className={styles.grid}>
          {subjects.map((subject) => (
            <article className={styles.card} key={subject.name}>
              <span className={styles.eyebrow}>{subject.teacher}</span>
              <h2>{subject.name}</h2>
              <p>
                Média: <b>{subject.grade.toLocaleString('pt-BR')}</b> · Frequência:{' '}
                <b>{subject.attendance}%</b>
              </p>
              <p>
                {tasks.filter((task) => task.subject === subject.name && !task.submittedAt).length}{' '}
                atividade(s) pendente(s)
              </p>
              <button
                className={styles.secondary}
                aria-expanded={material === subject.name}
                onClick={() => setMaterial(material === subject.name ? '' : subject.name)}
              >
                Material de revisão: {subject.name}
              </button>
              {material === subject.name && <p className={styles.material}>{subject.material}</p>}
              <Link className={styles.secondary} to="/studentActivities">
                Consultar atividades
              </Link>
            </article>
          ))}
        </div>
      )}
      {route === 'studentNotices' && (
        <section className={styles.section}>
          {notices.map((notice) => {
            const read = readNotices.includes(notice.id);
            return (
              <article className={styles.card} key={notice.id}>
                <span className={styles.eyebrow}>
                  {notice.category} · {read ? 'Lido' : 'Não lido'}
                </span>
                <h2>{notice.title}</h2>
                <p>{notice.text}</p>
                <button
                  className={styles.secondary}
                  aria-pressed={read}
                  onClick={() =>
                    setReadNotices((list) =>
                      read ? list.filter((id) => id !== notice.id) : [...list, notice.id]
                    )
                  }
                >
                  {read ? 'Marcar como não lido' : 'Marcar como lido'}: {notice.title}
                </button>
              </article>
            );
          })}
        </section>
      )}
      {route === 'studentPlan' && <StudentPlan />}
      {route === 'studentSupport' && <SupportForm />}
    </div>
  );
}
