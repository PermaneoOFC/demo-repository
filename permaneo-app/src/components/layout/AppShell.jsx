import StudentPortrait from '../students/StudentPortrait.jsx';
import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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
  Armchair,
  Ellipsis,
  PanelLeftClose,
} from 'lucide-react';
import logo from '../../images/logo.svg';
import styles from './AppShell.module.css';

export default function AppShell({ role, dark, notificationsRead, onToggleTheme, children }) {
  const teacher = role === 'teacher';
  const student = role === 'student';
  const [collapsed, setCollapsed] = useState(false);
  const [more, setMore] = useState(false);
  const menu = useRef(null);
  const moreButton = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => setMore(false), [pathname]);
  useEffect(() => {
    if (more) menu.current?.querySelector('[data-mobile-main="false"]')?.focus();
  }, [more]);
  const mainDestinations = { student: 'Início', studentActivities: 'Estudos', studentCalendar: 'Calendário', studentNotices: 'Avisos', studentSpace: 'Perfil' };
  const dashboard = student ? 'student' : teacher ? 'teacher' : 'director';
  const notificationPage = teacher ? 'teacherNotifications' : 'directorNotifications';
  const entries = student
    ? [
        ['student', 'Início', LayoutDashboard],
        ['studentActivities', 'Atividades', ClipboardList],
        ['studentCalendar', 'Calendário', CalendarDays],
        ['studentSubjects', 'Disciplinas', BookOpen],
        ['studentNotices', 'Notificações', Bell],
        ['studentPlan', 'Minhas Metas', ListChecks],
        ['studentSupport', 'Apoio', HeartHandshake],
        ['studentSpace', 'Meu espaço', UserRound],
        ['studentJourney', 'Minha Jornada', ChartNoAxesColumn],
        ['studentSettings', 'Configurações', Settings],
      ]
    : [
        [dashboard, teacher ? 'Minhas Turmas' : 'Painel da escola', LayoutDashboard],
        ...(teacher ? [['teacherRoom', 'Sala Virtual', Armchair]] : []),
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
      data-student-shell={student || undefined}
      data-collapsed={student && collapsed}
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
        <nav ref={menu} id="platform-menu" className={styles.navigation} data-more={student && more} aria-label="Menu da plataforma"
          onKeyDown={(event) => {
            if (more && event.key === 'Escape') {
              setMore(false);
              moreButton.current?.focus();
            }
          }}>
          {entries.map(([path, label, Icon]) => (
            <NavLink key={path} to={'/' + path} end className={styles.navLink} data-mobile-main={student && Boolean(mainDestinations[path])} aria-label={student && collapsed ? label : undefined} title={student && collapsed ? label : undefined}>
              <Icon size={18} aria-hidden="true" />
              <span className={student && mainDestinations[path] ? styles.desktopLabel : undefined}>{label}</span>
              {student && mainDestinations[path] && <span className={styles.mobileLabel}>{mainDestinations[path]}</span>}
              {path === notificationPage && !notificationsRead && (
                <span className={styles.badge} aria-label="Há notificações novas" />
              )}
            </NavLink>
          ))}
        </nav>
        <div className={styles.account}>
          <div className={styles.identity}>
            {student ? <StudentPortrait student={{ id: 'Camila', name }} className={styles.avatar} decorative /> : <span className={styles.avatar}>{initials}</span>}
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
            {student && <button className={styles.collapse} aria-controls="platform-menu" aria-expanded={!collapsed} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'} onClick={() => setCollapsed(!collapsed)}><PanelLeftClose size={20} aria-hidden="true" /></button>}
            {student && <button ref={moreButton} type="button" className={styles.more} aria-label="Mais opções" aria-controls="platform-menu" aria-expanded={more} onClick={() => setMore(!more)}><Ellipsis size={20} aria-hidden="true" /></button>}
            {student && <Link to="/studentNotices" className={styles.notifications} aria-label="Abrir notificações"><Bell size={18} aria-hidden="true" /></Link>}
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
