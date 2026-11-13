import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Bell, LayoutDashboard, HeartHandshake, ChartNoAxesColumn,
  Settings, LogOut, BookOpen, UserRound, CalendarDays,
  ClipboardList, ListChecks, Sun, Moon, Menu, X
} from 'lucide-react';
import logo from '../../images/logo.svg';
import styles from './AppShell.module.css';

export default function AppShell({ role, dark, notificationsRead, onToggleTheme, children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
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
        ['studentSpace', 'Meu espaço', UserRound]
      ]
    : [
        [dashboard, teacher ? 'Minhas turmas' : 'Painel da escola', LayoutDashboard],
        [teacher ? 'teacherFollowup' : 'directorFollowup', 'Acompanhamento', HeartHandshake],
        [teacher ? 'carometroTeacher' : 'carometroManagement', 'Carômetro', BookOpen],
        [notificationPage, 'Notificações', Bell],
        ...(!teacher ? [['reports', 'Relatórios', ChartNoAxesColumn]] : []),
        [teacher ? 'teacherSettings' : 'directorSettings', 'Configurações', Settings]
      ];
  const name = student ? 'Camila Rocha' : teacher ? 'Renata Oliveira' : 'Marcos Silva';
  const initials = student ? 'CR' : teacher ? 'RO' : 'MS';
  const description = student ? 'Estudante' : teacher ? 'Professor(a)' : 'Direção e coordenação';
  const currentPage = location.pathname.replace(/^\//, '');
  const pageTitle = entries.find(([path]) => path === currentPage)?.[1] ||
    (currentPage.startsWith('Profile') ? 'Perfil do estudante' : 'Acompanhamento');
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className={styles.shell} data-app-shell onClick={(event) => {
      if (event.target.closest('[data-shell-controls]')) event.stopPropagation();
    }}>
      <aside className={styles.sidebar} data-shell-controls aria-label="Navegação da plataforma">
        <div className={styles.brandRow}>
          <Link to="/home" className={styles.brand} aria-label="Permaneo — voltar ao início">
            <img src={logo} alt="" width="39" height="31" />
            <span>Permane<span className={styles.brandEnd}>o</span></span>
          </Link>
          <button type="button" className={styles.mobileToggle}
            aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'}
            aria-controls="app-navigation" aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
            <span>Menu</span>
          </button>
        </div>
        <div className={styles.navLabel}>ESPAÇO DE {student ? 'ESTUDANTE' : teacher ? 'PROFESSOR' : 'GESTÃO'}</div>
        <nav id="app-navigation" className={menuOpen ? styles.navigationOpen : styles.navigation} aria-label="Menu da plataforma">
          {entries.map(([path, label, Icon]) => (
            <NavLink key={path} to={'/' + path} end
              className={({ isActive }) => isActive ? styles.navActive : styles.navLink}
              onClick={() => setMenuOpen(false)}>
              <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
              {path === notificationPage && !notificationsRead && (
                <span className={styles.badge} aria-label="9 notificações não lidas">9</span>
              )}
            </NavLink>
          ))}
          <Link className={styles.mobileExit} to="/login"><LogOut size={18} aria-hidden="true" /> Sair da demonstração</Link>
        </nav>
        <div className={styles.account}>
          <div className={styles.identity}>
            <span className={styles.avatar} aria-hidden="true">{initials}</span>
            <span className={styles.identityName}>{name}<small>{description} · Exemplo</small></span>
          </div>
          <Link className={styles.exitLink} to="/login"><LogOut size={17} aria-hidden="true" /> Sair da demonstração</Link>
        </div>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.header} data-shell-controls>
          <div className={styles.headerContext}>
            <small>Escola Estadual Horizonte <span aria-hidden="true">/</span> Ambiente demonstrativo</small>
            <strong>{pageTitle}</strong>
          </div>
          <div className={styles.actions}>
            <span className={styles.demoBadge}>Dados fictícios</span>
            {!student && (
              <Link to={'/' + notificationPage} className={styles.notifications} aria-label="Abrir notificações">
                <Bell size={19} aria-hidden="true" />
                {!notificationsRead && <span aria-hidden="true" />}
              </Link>
            )}
            <button type="button" className={styles.themeToggle} data-name="Alternar tema"
              aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} onClick={onToggleTheme}>
              {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
            </button>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
