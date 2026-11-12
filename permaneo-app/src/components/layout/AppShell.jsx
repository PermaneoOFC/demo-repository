import { NavLink, Link } from 'react-router-dom';
import {
  Bell,
  LayoutDashboard,
  HeartHandshake,
  ChartNoAxesColumn,
  Settings,
  LogOut,
  BookOpen,
  UserRound,
  CalendarDays,
  ClipboardList,
  ListChecks,
} from 'lucide-react';
import logo from '../../images/logo.svg';
import styles from './AppShell.module.css';

export default function AppShell({ role, dark, notificationsRead, onToggleTheme, children }) {
  const teacher = role === 'teacher';
  const student = role === 'student';
  const dashboard = student ? 'student' : teacher ? 'teacher' : 'director';
  const notificationPage = teacher ? 'teacherNotifications' : 'directorNotifications';
  const entries = student
    ? [
        ['student', 'Meu dia', LayoutDashboard],
        ['studentActivities', 'Atividades', ClipboardList],
        ['studentCalendar', 'Calendário', CalendarDays],
        ['studentSubjects', 'Disciplinas', BookOpen],
        ['studentNotices', 'Avisos', Bell],
        ['studentPlan', 'Plano de estudos', ListChecks],
        ['studentSupport', 'Pedidos de apoio', HeartHandshake],
        ['studentSpace', 'Meu espaço', UserRound],
      ]
    : [
        [dashboard, teacher ? 'Minhas turmas' : 'Painel da escola', LayoutDashboard],
        [teacher ? 'teacherFollowup' : 'directorFollowup', 'Acompanhamento', HeartHandshake],
        [teacher ? 'carometroTeacher' : 'carometroManagement', 'Carômetro', BookOpen],
        [notificationPage, 'Notificações', Bell],
        ...(!teacher ? [['reports', 'Relatórios', ChartNoAxesColumn]] : []),
        [teacher ? 'teacherSettings' : 'directorSettings', 'Configurações', Settings],
      ];
  const name = student ? 'Camila Rocha' : teacher ? 'Renata Oliveira' : 'Marcos Silva';
  const initials = student ? 'CR' : teacher ? 'RO' : 'MS';
  const description = student ? 'Estudante' : teacher ? 'Professor(a)' : 'Direção e coordenação';
  return (
    <div
      className={styles.shell}
      data-app-shell
      onClick={(event) => {
        if (event.target.closest('[data-shell-controls]')) event.stopPropagation();
      }}
    >
      <aside className={styles.sidebar} data-shell-controls aria-label="Menu lateral">
        <Link to="/home" className={styles.brand} aria-label="Permaneo — voltar à Home">
          <img src={logo} alt="" />
          <span>
            Permane<span className={styles.brandEnd}>o</span>
          </span>
        </Link>
        <nav className={styles.navigation} aria-label="Menu da plataforma">
          {entries.map(([path, label, Icon]) => (
            <NavLink key={path} to={'/' + path} end className={styles.navLink}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              {path === notificationPage && !notificationsRead && (
                <span className={styles.badge}>9</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className={styles.account}>
          <div className={styles.identity}>
            <span className={styles.avatar}>{initials}</span>
            <span>
              {name}
              <small>{description}</small>
            </span>
          </div>
          <Link className={styles.navLink} to="/login">
            <LogOut size={16} aria-hidden="true" />
            Sair
          </Link>
        </div>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.header} data-shell-controls>
          <p>Escola Estadual Horizonte · Demonstração</p>
          <div className={styles.actions}>
            {!student && (
              <Link
                to={'/' + notificationPage}
                className={styles.notifications}
                aria-label="Abrir notificações"
              >
                <Bell size={18} aria-hidden="true" />
                {!notificationsRead && <span />}
              </Link>
            )}
            <button
              type="button"
              data-name="Alternar tema"
              aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
              onClick={onToggleTheme}
            />
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
