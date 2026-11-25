import { useState } from 'react';
import { Bell, BookOpen, CalendarDays, ClipboardList, HeartHandshake, ListChecks, UserRound, Settings, ChartNoAxesColumn, GraduationCap, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { subjectVisual } from '../../../components/student/subjectVisual.js';
import { Link, useLocation } from 'react-router-dom';
import StudentActivities from '../../../components/student/StudentActivities.jsx';
import StudentCalendar from '../../../components/student/StudentCalendar.jsx';
import StudentPlan from '../../../components/student/StudentPlan.jsx';
import SupportForm from '../../../components/student/SupportForm.jsx';
import useLocalStorage from '../../../hooks/useLocalStorage.js';
import { initialSchoolwork, subjects, notices, formatDate } from '../../../data/studentArea.js';
import { getStudentProfile } from '../../../data/studentProfiles.js';
import StudentSpace, { defaultPreferences } from '../../../components/student/StudentSpace.jsx';
import StudentHome from '../../../components/student/StudentHome.jsx';
import styles from './StudentArea.module.css';

const studentHistory = getStudentProfile('Camila');
const routeVisuals = {
  studentSpace: ['purple', UserRound], studentJourney: ['green', TrendingUp],
  studentSettings: ['teal', Settings], studentActivities: ['blue', ClipboardList],
  studentCalendar: ['purple', CalendarDays], studentSubjects: ['teal', BookOpen],
  studentNotices: ['orange', Bell], studentPlan: ['green', ListChecks],
  studentSupport: ['teal', HeartHandshake],
};

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
  const [pageTone, PageIcon] = routeVisuals[route] || ['blue', GraduationCap];

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
      {(route !== 'student' || onboarding) && <header className={styles.intro} data-tone={pageTone}><span className={styles.featureIcon}><PageIcon size={25} aria-hidden="true" /></span><div><h1>{title}</h1><p>{subtitle}</p></div></header>}
      {onboarding ? <StudentSpace preferences={preferences} update={setPreferences} onboarding onFinish={() => {
        setPreferences((current) => ({ ...current, onboarded: true }));
        setOnboardingRoute(null);
      }} /> : <>
      {route === 'student' && <StudentHome greeting={greeting} history={studentHistory} preferences={preferences}
        subjects={subjects} attendance={attendance} progress={progress} delivered={delivered} tasks={tasks}
        pending={pending} events={upcoming} personal={personalActivities} unread={unread} metrics={metrics}
        onCustomize={() => setOnboardingRoute(route)}
        onDismiss={() => setPreferences((current) => ({ ...current, onboarded: true }))} />}
      {(route === 'studentSpace' || route === 'studentSettings') && <StudentSpace key={route} preferences={preferences} update={setPreferences} settings={route === 'studentSettings'} />}
      {route === 'studentSettings' && <button className={styles.secondary} onClick={() => setOnboardingRoute(route)}>Reabrir apresentação</button>}
      {route === 'studentJourney' && <>
        <section className={styles.card}>
          <h2 className={styles.iconHeading} data-tone="blue"><span className={styles.featureIcon}><GraduationCap size={20} aria-hidden="true" /></span>Frequência e desempenho por matéria</h2>
          {subjects.map((subject) => <div className={styles.row} key={subject.name}>
            <div><b>{subject.name}</b><small>{subject.attendance}% de frequência · Média {subject.grade.toLocaleString('pt-BR')}</small></div>
            <progress value={subject.attendance} max={100} aria-label={'Frequência em ' + subject.name} />
          </div>)}
          <h2 className={styles.iconHeading} data-tone="teal"><span className={styles.featureIcon}><CalendarDays size={20} aria-hidden="true" /></span>Frequência por mês</h2>
          {studentHistory.months.map((month) => <div className={styles.row} key={month.month}>
            <div><b>{month.month}</b><small>{month.present} de {month.total} aulas</small></div>
            <progress value={month.present} max={month.total} aria-label={'Frequência em ' + month.month} />
          </div>)}
          <h2 className={styles.iconHeading} data-tone="purple"><span className={styles.featureIcon}><ChartNoAxesColumn size={20} aria-hidden="true" /></span>Notas por etapa</h2>
          {studentHistory.grades.map((grade) => <div className={styles.row} key={grade.subject}>
            <b>{grade.subject}</b><div className={styles.gradeTrend}>{grade.scores.map((score, index) =>
              <div key={index}><small>Etapa {index + 1} · {score.toLocaleString('pt-BR')}</small><progress value={score} max={10} aria-label={grade.subject + ', etapa ' + (index + 1)} /></div>)}</div>
          </div>)}
        </section>
        <section className={styles.card}>
          <h2 className={styles.iconHeading} data-tone="orange"><span className={styles.featureIcon}><ClipboardList size={20} aria-hidden="true" /></span>Atividades recentes</h2>
          {tasks.filter((task) => task.submittedAt).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).map((task) => <p key={task.id}>{task.title} · {new Date(task.submittedAt).toLocaleDateString('pt-BR')}</p>)}
          {personalActivities.filter((item) => item.done).map((item) => <p key={item.id}>{item.title} · Atividade pessoal concluída</p>)}
          {!delivered && !personalActivities.some((item) => item.done) && <p>Suas entregas e atividades pessoais concluídas aparecerão aqui.</p>}
        </section>
        <section className={styles.card}>
          <h2 className={styles.iconHeading} data-tone="green"><span className={styles.featureIcon}><ListChecks size={20} aria-hidden="true" /></span>Objetivos pessoais</h2>
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
          {subjects.map((subject) => {
            const [tone, Icon] = subjectVisual(subject.name);
            return (
            <article className={styles.card} data-tone={tone} key={subject.name}>
              <span className={styles.featureIcon}><Icon size={23} aria-hidden="true" /></span>
              <span className={styles.eyebrow}>{subject.teacher}</span>
              <h2>{subject.name}</h2>
              <p>
                Média: <b>{subject.grade.toLocaleString('pt-BR')}</b> · Frequência:{' '}
                <b>{subject.attendance}%</b>
              </p>
              <progress value={subject.attendance} max={100} aria-label={'Frequência em ' + subject.name} />
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
                Consultar atividades <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ); })}
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
              <article className={styles.card} data-tone={read ? 'teal' : 'blue'} key={notice.id}>
                <div className={styles.cardTop}><span className={styles.featureIcon}>{read ? <CheckCircle2 size={22} aria-hidden="true" /> : <Bell size={22} aria-hidden="true" />}</span><span className={styles.badge} data-status={read ? 'done' : 'info'}>{read ? 'Lido' : 'Não lido'}</span></div>
                <span className={styles.eyebrow}>{notice.category}</span>
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
