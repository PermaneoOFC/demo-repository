import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StudentActivities from '../../../components/student/StudentActivities.jsx';
import StudentCalendar from '../../../components/student/StudentCalendar.jsx';
import StudentPlan from '../../../components/student/StudentPlan.jsx';
import SupportForm from '../../../components/student/SupportForm.jsx';
import useLocalStorage from '../../../hooks/useLocalStorage.js';
import { initialSchoolwork, subjects, notices, formatDate } from '../../../data/studentArea.js';
import { getStudentProfile } from '../../../data/studentProfiles.js';
import StudentSpace, { Avatar, defaultPreferences, widgets } from '../../../components/student/StudentSpace.jsx';
import styles from './StudentArea.module.css';

const studentHistory = getStudentProfile('Camila');

const titles = {
  student: ['Meu dia', 'Sua jornada continua por aqui.'],
  studentSpace: ['Meu Espaço', 'Personalize seu perfil e escolha o que aparece no início.'],
  studentJourney: ['Minha Jornada', 'Acompanhe sua evolução e os próximos passos.'],
  studentSettings: ['Configurações', 'Ajuste a interface para estudar do seu jeito.'],
  studentActivities: ['Minhas atividades', 'Confira os prazos e prepare suas respostas.'],
  studentCalendar: ['Calendário escolar', 'Aulas, provas, entregas e encontros em um só lugar.'],
  studentSubjects: ['Minhas disciplinas', 'Acompanhe seus indicadores e revise os materiais.'],
  studentNotices: ['Avisos da escola', 'Fique por dentro do que acontece na escola.'],
  studentPlan: ['Minhas Metas', 'Pequenas metas ajudam a construir sua rotina.'],
  studentSupport: ['Meus pedidos de apoio', 'Você pode pedir ajuda e consultar seus pedidos.'],
};

export default function StudentArea({ studentPreferences: stored, setPreferences, studentTheme }) {
  const route = useLocation().pathname.slice(1);
  const [schoolwork, setSchoolwork] = useLocalStorage(
    'permaneo-student-schoolwork',
    initialSchoolwork
  );
  const [readNotices, setReadNotices] = useLocalStorage('permaneo-student-read-notices', []);
  const preferences = { ...defaultPreferences, ...stored, theme: studentTheme };
  const [goals, setGoals] = useLocalStorage('permaneo-student-goals', []);
  const [onboardingRoute, setOnboardingRoute] = useState(null);
  const onboarding = onboardingRoute === route;
  const [noticeCategory, setNoticeCategory] = useState('Todas');
  const [personalActivities, setPersonalActivities] = useLocalStorage('permaneo-student-calendar-personal', []);
  const [material, setMaterial] = useState('');
  const { tasks, events } = schoolwork;
  const delivered = tasks.filter((task) => task.submittedAt).length;
  const pending = tasks
    .filter((task) => !task.submittedAt)
    .sort((a, b) => a.due.localeCompare(b.due));
  const progress = tasks.length ? Math.round((delivered / tasks.length) * 100) : 0;
  const [title, subtitle] = titles[route] || titles.student;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const attendance = Math.round(subjects.reduce((total, subject) => total + subject.attendance, 0) / subjects.length);
  const completed = goals.filter((goal) => goal.done).length;
  const messages = [
    ...notices.map((notice) => ({ ...notice, category: 'Comunicados escolares' })),
    ...pending.map((task) => ({
      id: 'task-' + task.id, title: task.title, category: 'Atividades',
      text: task.subject + ' · Entrega em ' + formatDate(task.due),
    })),
    ...upcoming.map((event) => ({
      id: 'event-' + event.id, title: event.title, category: 'Calendário',
      text: formatDate(event.date) + ' · ' + event.time,
    })),
    ...(preferences.reminders ? goals.filter((goal) => goal.date && !goal.done).map((goal) => ({
      id: 'goal-' + goal.id, title: goal.title, category: 'Lembretes pessoais',
      text: 'Prazo escolhido por você · ' + formatDate(goal.date),
    })) : []),
  ];
  const unread = messages.filter((notice) => !readNotices.includes(notice.id)).length;
  const metrics = {
    work: [pending.slice(0, 3).map((task) => <div className={styles.row} key={task.id}><span><b>{task.title}</b><small>{task.subject} · {formatDate(task.due)}</small></span></div>), '/studentActivities', 'Ver atividades'],
    calendar: [upcoming.slice(0, 2).map((event) => <div className={styles.row} key={event.id}><span><b>{event.title}</b><small>{formatDate(event.date)} · {event.time}</small></span><span className={styles.badge}>{event.type}</span></div>), '/studentCalendar', 'Abrir calendário'],
    attendance: [<><strong className={styles.metric}>{attendance}%</strong><p>Média demonstrativa entre matérias</p></>, '/studentJourney', 'Ver minha jornada'],
    progress: [<><p>{delivered} de {tasks.length} atividades entregues · {progress}%</p><progress value={delivered} max={tasks.length || 1} aria-label="Progresso das atividades" /></>, '/studentJourney', 'Ver evolução'],
    notices: [<p>{unread ? `${unread} comunicado(s) não lido(s).` : 'Você leu todos os comunicados.'}</p>, '/studentNotices', 'Abrir notificações'],
    goals: [<p>{completed} de {goals.length} metas concluídas.</p>, '/studentPlan', 'Gerenciar metas'],
    grades: [<p>{subjects.map((subject) => `${subject.name} ${subject.grade.toLocaleString('pt-BR')}`).join(' · ')}</p>, '/studentSubjects', 'Consultar notas'],
    subjects: [<p>{subjects.map((subject) => subject.name).join(' · ')}</p>, '/studentSubjects', 'Ver matérias'],
    support: [<p>Quer conversar sobre sua rotina escolar?</p>, '/studentSupport', 'Pedir apoio'],
  };
  return (
    <div className={styles.area} data-local-content data-accent={preferences.accent} data-density={preferences.density} data-scale={preferences.scale} data-motion={preferences.motion}>
      <header className={route === 'student' ? styles.hero : styles.intro} data-cover={preferences.cover}>
        <div>
          <h1>{title}</h1>
          {route === 'student' ? <p className={styles.greeting}>{greeting}, Camila! {subtitle}</p> : <p>{subtitle}</p>}
        </div>
        {route === 'student' && <Avatar name={preferences.avatar} />}
      </header>
      {onboarding ? <StudentSpace preferences={preferences} update={setPreferences} onboarding onFinish={() => {
        setPreferences((current) => ({ ...current, onboarded: true }));
        setOnboardingRoute(null);
      }} /> : <>
      {route === 'student' && <>
        {!preferences.onboarded && <div className={styles.controls}>
          <button className={styles.primary} onClick={() => setOnboardingRoute(route)}>Personalizar meu início</button>
          <button className={styles.secondary} onClick={() => setPreferences({ ...stored, onboarded: true })}>Agora não</button>
        </div>}
        <nav className={styles.controls} aria-label="Atalhos do estudante">
          <Link className={styles.secondary} to="/studentSpace">Editar painel</Link>
          {preferences.order.filter((id) => !preferences.hidden.includes(id) && metrics[id]).slice(0, 2).map((id) =>
            <Link className={styles.secondary} key={id} to={metrics[id][1]}>{widgets[id]}</Link>
          )}
          <Link className={styles.secondary} to="/studentJourney">Atividades recentes</Link>
        </nav>
        <div className={styles.widgets}>
          {preferences.order.filter((id) => !preferences.hidden.includes(id) && metrics[id]).map((id) => {
            const [content, destination, label] = metrics[id];
            return <section className={styles.card} data-widget={id} key={id}>
              <h2>{widgets[id]}</h2>
              {id === 'work' && !pending.length ? <p>Suas atividades estão em dia.</p> : content}
              <Link className={styles.secondary} to={destination}>{label}</Link>
            </section>;
          })}
        </div>
      </>}
      {(route === 'studentSpace' || route === 'studentSettings') && <StudentSpace key={route} preferences={preferences} update={setPreferences} settings={route === 'studentSettings'} />}
      {route === 'studentSettings' && <button className={styles.secondary} onClick={() => setOnboardingRoute(route)}>Reabrir apresentação</button>}
      {route === 'studentJourney' && <>
        <section className={styles.card}>
          <h2>Frequência e desempenho por matéria</h2>
          {subjects.map((subject) => <div className={styles.row} key={subject.name}>
            <div><b>{subject.name}</b><small>{subject.attendance}% de frequência · Média {subject.grade.toLocaleString('pt-BR')}</small></div>
            <progress value={subject.attendance} max={100} aria-label={'Frequência em ' + subject.name} />
          </div>)}
          <h2>Frequência por mês</h2>
          {studentHistory.months.map((month) => <div className={styles.row} key={month.month}>
            <div><b>{month.month}</b><small>{month.present} de {month.total} aulas</small></div>
            <progress value={month.present} max={month.total} aria-label={'Frequência em ' + month.month} />
          </div>)}
          <h2>Notas por etapa</h2>
          {studentHistory.grades.map((grade) => <div className={styles.row} key={grade.subject}>
            <b>{grade.subject}</b><span>{grade.scores.map((score) => score.toLocaleString('pt-BR')).join(' · ')}</span>
          </div>)}
        </section>
        <section className={styles.card}>
          <h2>Atividades recentes</h2>
          {tasks.filter((task) => task.submittedAt).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).map((task) => <p key={task.id}>{task.title} · {new Date(task.submittedAt).toLocaleDateString('pt-BR')}</p>)}
          {personalActivities.filter((item) => item.done).map((item) => <p key={item.id}>{item.title} · Atividade pessoal concluída</p>)}
          {!delivered && !personalActivities.some((item) => item.done) && <p>Suas entregas e atividades pessoais concluídas aparecerão aqui.</p>}
        </section>
        <section className={styles.card}>
          <h2>Objetivos pessoais</h2>
          {metrics.goals[0]}
          {!!goals.length && <progress value={completed} max={goals.length} aria-label="Progresso das metas" />}
          <Link className={styles.secondary} to="/studentPlan">Ver minhas metas</Link>
        </section>
      </>}
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
      {route === 'studentCalendar' && <StudentCalendar tasks={tasks} events={events} personal={personalActivities} setPersonal={setPersonalActivities} />}
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
          <div className={styles.filters}><label>Categoria<select value={noticeCategory} onChange={(event) => setNoticeCategory(event.target.value)}>
            {['Todas', 'Atividades', 'Calendário', 'Comunicados escolares', 'Lembretes pessoais'].map((option) => <option key={option}>{option}</option>)}
          </select></label></div>
          {noticeCategory !== 'Todas' && !messages.some((notice) => notice.category === noticeCategory) && <p>Nenhuma notificação nesta categoria.</p>}
          {messages.filter((notice) => noticeCategory === 'Todas' || notice.category === noticeCategory).map((notice) => {
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
      {route === 'studentPlan' && <StudentPlan goals={goals} setGoals={setGoals} />}
      {route === 'studentSupport' && <SupportForm />}
      </>}
      <p className={styles.demo}>Demonstração com dados fictícios. Suas alterações são salvas neste navegador.</p>
    </div>
  );
}
