import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bell, CalendarDays, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Clock3, GraduationCap, HeartHandshake, Settings2, TrendingUp, UserRound } from 'lucide-react';
import { formatDate } from '../../data/studentArea.js';
import { Avatar, widgets } from './StudentSpace.jsx';
import styles from './StudentHome.module.css';

const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
const shortDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' });
const shortcuts = [
  ['Minhas notas', '/studentSubjects', GraduationCap],
  ['Minha frequência', '/studentJourney', TrendingUp],
  ['Calendário', '/studentCalendar', CalendarDays],
  ['Solicitações', '/studentSupport', HeartHandshake],
  ['Comunicados', '/studentNotices', Bell],
  ['Meu perfil', '/studentSpace', UserRound],
  ['Preciso de ajuda', '/studentSupport', CircleHelp],
];

function dateKey(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((value, index) => String(value).padStart(index ? 2 : 4, '0')).join('-');
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function StudentWeek({ events, tasks, personal }) {
  const now = new Date();
  const today = dateKey(now);
  const monday = addDays(now, -((now.getDay() + 6) % 7));
  const [offset, setOffset] = useState(0);
  const [day, setDay] = useState((now.getDay() + 6) % 7);
  const days = Array.from({ length: 7 }, (_, index) => addDays(monday, offset * 7 + index));
  const selected = dateKey(days[day]);
  const agenda = [
    ...events.map((event) => ({ ...event, route: '/studentCalendar' })),
    ...tasks.map((task) => ({ ...task, date: task.due, type: task.submittedAt ? 'Entrega concluída' : 'Entrega', route: '/studentActivities' })),
    ...personal.map((item) => ({ ...item, type: 'Pessoal', route: '/studentCalendar' })),
  ].filter((item) => item.date === selected).sort((a, b) => (a.time || '').localeCompare(b.time || ''));

  return <section className={styles.panel} aria-labelledby="my-week">
    <div className={styles.panelHeader}>
      <div><h2 id="my-week">Minha semana</h2><p>{shortDate.format(days[0])} a {shortDate.format(days[6])}</p></div>
      <div className={styles.weekControls}>
        <button type="button" aria-label="Semana anterior" onClick={() => setOffset(offset - 1)}><ChevronLeft size={17} aria-hidden="true" /></button>
        <button type="button" aria-label="Próxima semana" onClick={() => setOffset(offset + 1)}><ChevronRight size={17} aria-hidden="true" /></button>
      </div>
    </div>
    <div className={styles.days} role="group" aria-label="Dias da semana">
      {days.map((date, index) => <button key={dateKey(date)} type="button"
        aria-label={date.toLocaleDateString('pt-BR', { dateStyle: 'full' })}
        aria-current={dateKey(date) === today ? 'date' : undefined}
        aria-pressed={day === index} onClick={() => setDay(index)}>
        <span>{weekday.format(date).replace('.', '')}</span><b>{date.getDate()}</b>
      </button>)}
    </div>
    <ul className={styles.agenda} aria-label={'Agenda de ' + formatDate(selected)}>
      {agenda.length ? agenda.map((item) => <li key={item.type + item.id}>
        <Link to={item.route}><span className={styles.agendaIcon} aria-hidden="true">{item.time ? <Clock3 size={18} /> : <ClipboardList size={18} />}</span>
          <span><b>{item.title}</b><small>{[item.time, item.type, item.subject].filter(Boolean).join(' · ')}</small></span><ArrowRight size={16} aria-hidden="true" />
        </Link>
      </li>) : <li className={styles.empty}><CalendarDays size={24} aria-hidden="true" /><span>Nenhuma atividade planejada para este dia.</span></li>}
    </ul>
    <Link className={styles.textLink} to="/studentCalendar">Abrir calendário <ArrowRight size={15} aria-hidden="true" /></Link>
  </section>;
}

export default function StudentHome({ greeting, history, preferences, subjects, attendance, progress, delivered, tasks, pending, events, personal, unread, metrics, onCustomize, onDismiss }) {
  const average = subjects.reduce((sum, subject) => sum + subject.grade, 0) / subjects.length;
  const visible = preferences.order.filter((id) => !preferences.hidden.includes(id) && metrics[id]);
  const nextClass = events.filter((event) => event.type === 'Aula' && event.date >= dateKey(new Date()))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0];
  const lastAttendance = history.months.slice(-2).map((month) => 100 * month.present / month.total);
  const difference = lastAttendance.length === 2 ? lastAttendance[1] - lastAttendance[0] : null;
  const summary = [
    ['attendance', 'Frequência', attendance + '%', 'Média entre disciplinas', '/studentJourney', TrendingUp, 'mint'],
    ['grades', 'Média de notas', number.format(average), 'Nas suas disciplinas', '/studentSubjects', GraduationCap, 'lavender'],
    ['work', 'Atividades a fazer', pending.length, pending[0]?.title || 'Tudo em dia', '/studentActivities', ClipboardList, 'peach'],
    ['notices', 'Avisos não lidos', unread, 'Ver notificações', '/studentNotices', Bell, 'blue'],
  ].filter(([id]) => !preferences.hidden.includes(id));

  return <div className={styles.home}>
    <header className={styles.welcome} data-cover={preferences.cover}>
      <div className={styles.welcomeContent}>
        <h1>Meu dia</h1>
        <p className={styles.greeting}>{greeting}, {history.name.split(' ')[0]}!</p>
        <p>Confira o que vem por aí e acompanhe sua jornada no seu ritmo.</p>
        <Link to="/studentSpace" className={styles.customize}><Settings2 size={16} aria-hidden="true" /> Editar painel</Link>
      </div>
      <Avatar name={preferences.avatar} className={styles.portrait} />
    </header>
    {!preferences.onboarded && <div className={styles.onboarding}>
      <span>Escolha o que você quer ver aqui.</span>
      <button type="button" onClick={onCustomize}>Personalizar meu início</button>
      <button type="button" onClick={onDismiss}>Agora não</button>
    </div>}
    {!!summary.length && <section className={styles.summary} aria-label="Resumo do meu dia">
      {summary.map(([id, label, value, detail, route, Icon, tone]) => <Link key={id} to={route} data-tone={tone} className={styles.stat}>
        <span className={styles.statIcon}><Icon size={20} aria-hidden="true" /></span><ArrowRight className={styles.statArrow} size={17} aria-hidden="true" />
        <strong>{value}</strong><b>{label}</b><small>{detail}</small>
      </Link>)}
    </section>}
    <div className={styles.columns}>
      {!preferences.hidden.includes('calendar') && <StudentWeek events={events} tasks={tasks} personal={personal} />}
      {!preferences.hidden.includes('progress') && <section className={styles.panel} aria-labelledby="my-progress">
        <div className={styles.panelHeader}><div><h2 id="my-progress">Meu progresso</h2><p>Veja como sua jornada está avançando.</p></div></div>
        <div className={styles.progressRow}>
          <div className={styles.ring} style={{ '--progress': progress + '%' }} role="img" aria-label={progress + '% das atividades entregues'}><b>{progress}%</b></div>
          <div><strong>{delivered} de {tasks.length} atividades entregues</strong><p>{delivered ? 'Seu trabalho fica registrado na sua jornada.' : 'Suas entregas aparecerão aqui conforme você avançar.'}</p></div>
        </div>
        <div className={styles.trends}>
          {history.months.slice(-3).map((month) => <div key={month.month}><span>{month.month}</span><progress max={month.total} value={month.present} aria-label={'Frequência em ' + month.month} /><b>{number.format(100 * month.present / month.total)}%</b></div>)}
        </div>
        {difference != null && <p className={styles.comparison}>Frequência no último mês registrado {difference === 0 ? 'igual ao anterior' : number.format(Math.abs(difference)) + ' p.p. ' + (difference > 0 ? 'acima' : 'abaixo') + ' do anterior'}.</p>}
        <Link className={styles.textLink} to="/studentJourney">Ver minha jornada <ArrowRight size={15} aria-hidden="true" /></Link>
      </section>}
    </div>
    <section className={styles.quick} aria-labelledby="quick-title">
      <h2 id="quick-title">Acesso rápido</h2>
      <nav aria-label="Atalhos do estudante">{shortcuts.map(([label, route, Icon]) => <Link to={route} key={label}><Icon size={19} aria-hidden="true" />{label}</Link>)}</nav>
    </section>
    {!!visible.length && <section className={styles.quick} aria-labelledby="custom-widgets">
      <h2 id="custom-widgets">Seu painel</h2>
      <div className={styles.widgets}>{visible.map((id) => {
        const [content, destination, label] = metrics[id];
        return <section className={styles.panel} data-widget={id} key={id}><h3>{widgets[id]}</h3>
          {id === 'work' && !pending.length ? <p>Suas atividades estão em dia.</p> : content}
          {id === 'calendar' && <p>{nextClass ? <>Próxima aula · {nextClass.title} · {formatDate(nextClass.date)} às {nextClass.time}</> : 'Nenhuma aula futura no calendário.'}</p>}
          <Link className={styles.textLink} to={destination}>{label} <ArrowRight size={15} aria-hidden="true" /></Link></section>;
      })}</div>
      <Link className={styles.textLink} to="/studentJourney">Atividades recentes <ArrowRight size={15} aria-hidden="true" /></Link>
    </section>}
  </div>;
}
