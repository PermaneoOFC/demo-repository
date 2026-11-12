import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Platform.module.css';
import LoginPage from '../../pages/Login/LoginPage.jsx';
import { frequenciaIntegrada } from '../../services/frequenciaApi.js';
import loginPhoto from '../../images/school-0.jpg';
import logo from '../../images/logo.svg';
import utilityStyles from './Layout.module.css';
import Modal from '../ui/Modal.jsx';
import TextField from '../ui/TextField.jsx';

const FrequenciaIntegrada = lazy(() => import('../../pages/Dashboard/Frequencia/FrequenciaIntegrada.jsx'));
const HomeLight = lazy(() => import('../../pages/Landing/HomeLight.jsx'));
const HomeDark = lazy(() => import('../../pages/Landing/HomeDark.jsx'));
const DirectorDashboardLight = lazy(() => import('../../pages/Dashboard/Direcao/DirectorDashboardLight.jsx'));
const DirectorDashboardDark = lazy(() => import('../../pages/Dashboard/Direcao/DirectorDashboardDark.jsx'));
const DirectorFollowupLight = lazy(() => import('../../pages/Dashboard/Direcao/DirectorFollowupLight.jsx'));
const DirectorFollowupDark = lazy(() => import('../../pages/Dashboard/Direcao/DirectorFollowupDark.jsx'));
const DirectorNotificationsLight = lazy(() => import('../../pages/Dashboard/Direcao/DirectorNotificationsLight.jsx'));
const DirectorNotificationsDark = lazy(() => import('../../pages/Dashboard/Direcao/DirectorNotificationsDark.jsx'));
const ReportsLight = lazy(() => import('../../pages/Dashboard/Direcao/ReportsLight.jsx'));
const ReportsDark = lazy(() => import('../../pages/Dashboard/Direcao/ReportsDark.jsx'));
const DirectorSettingsLight = lazy(() => import('../../pages/Dashboard/Direcao/DirectorSettingsLight.jsx'));
const DirectorSettingsDark = lazy(() => import('../../pages/Dashboard/Direcao/DirectorSettingsDark.jsx'));
const TeacherClassesLight = lazy(() => import('../../pages/Dashboard/Professor/TeacherClassesLight.jsx'));
const TeacherClassesDark = lazy(() => import('../../pages/Dashboard/Professor/TeacherClassesDark.jsx'));
const TeacherFollowupLight = lazy(() => import('../../pages/Dashboard/Professor/TeacherFollowupLight.jsx'));
const TeacherFollowupDark = lazy(() => import('../../pages/Dashboard/Professor/TeacherFollowupDark.jsx'));
const TeacherNotificationsLight = lazy(() => import('../../pages/Dashboard/Professor/TeacherNotificationsLight.jsx'));
const TeacherNotificationsDark = lazy(() => import('../../pages/Dashboard/Professor/TeacherNotificationsDark.jsx'));
const TeacherSettingsLight = lazy(() => import('../../pages/Dashboard/Professor/TeacherSettingsLight.jsx'));
const TeacherSettingsDark = lazy(() => import('../../pages/Dashboard/Professor/TeacherSettingsDark.jsx'));
const StudentDashboardLight = lazy(() => import('../../pages/Dashboard/Estudante/StudentDashboardLight.jsx'));
const StudentDashboardDark = lazy(() => import('../../pages/Dashboard/Estudante/StudentDashboardDark.jsx'));
const StudentSpaceLight = lazy(() => import('../../pages/Dashboard/Estudante/StudentSpaceLight.jsx'));
const StudentSpaceDark = lazy(() => import('../../pages/Dashboard/Estudante/StudentSpaceDark.jsx'));
const CarometroManagementLight = lazy(() => import('../../pages/Dashboard/Carometro/CarometroManagementLight.jsx'));
const CarometroManagementDark = lazy(() => import('../../pages/Dashboard/Carometro/CarometroManagementDark.jsx'));
const CarometroTeacherLight = lazy(() => import('../../pages/Dashboard/Carometro/CarometroTeacherLight.jsx'));
const CarometroTeacherDark = lazy(() => import('../../pages/Dashboard/Carometro/CarometroTeacherDark.jsx'));

const profiles = {
  Lucas: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileLucasManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileLucasManagementDark.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileLucasTeacherLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileLucasTeacherDark.jsx'))],
  Camila: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileCamilaManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileCamilaManagementDark.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileCamilaTeacherLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileCamilaTeacherDark.jsx'))],
  Isabela: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileIsabelaManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileIsabelaManagementDark.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileIsabelaTeacherLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileIsabelaTeacherDark.jsx'))],
  Eduardo: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileEduardoManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileEduardoManagementDark.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileEduardoTeacherLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileEduardoTeacherDark.jsx'))],
  Yasmin: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileYasminManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileYasminManagementDark.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileYasminTeacherLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileYasminTeacherDark.jsx'))],
  Livia: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileLiviaManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileLiviaManagementDark.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileLiviaTeacherLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileLiviaTeacherDark.jsx'))],
  AnaBeatriz: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileAnaBeatrizManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileAnaBeatrizManagementDark.jsx'))],
  Heitor: [lazy(() => import('../../pages/Dashboard/Carometro/ProfileHeitorManagementLight.jsx')), lazy(() => import('../../pages/Dashboard/Carometro/ProfileHeitorManagementDark.jsx'))],
};

const pages = {
  home: [HomeLight, HomeDark], login: [LoginPage, LoginPage],
  director: [DirectorDashboardLight, DirectorDashboardDark],
  directorFollowup: [DirectorFollowupLight, DirectorFollowupDark],
  directorNotifications: [DirectorNotificationsLight, DirectorNotificationsDark],
  reports: [ReportsLight, ReportsDark], directorSettings: [DirectorSettingsLight, DirectorSettingsDark],
  teacher: [TeacherClassesLight, TeacherClassesDark],
  teacherFollowup: [TeacherFollowupLight, TeacherFollowupDark],
  teacherNotifications: [TeacherNotificationsLight, TeacherNotificationsDark],
  teacherSettings: [TeacherSettingsLight, TeacherSettingsDark],
  student: [StudentDashboardLight, StudentDashboardDark], studentSpace: [StudentSpaceLight, StudentSpaceDark],
  carometroManagement: [CarometroManagementLight, CarometroManagementDark],
  carometroTeacher: [CarometroTeacherLight, CarometroTeacherDark],
};

const resolvePage = (value) => {
  if (value === 'frequencia' && frequenciaIntegrada) return value;
  if (Object.hasOwn(pages, value)) return value;
  const match = value.match(/^Profile(.+)(Management|Teacher)$/);
  return match && Object.hasOwn(profiles, match[1]) ? value : 'home';
};

const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

const demoStudents = [
  { name: 'Lucas Gomes', key: 'Lucas', className: '9º A' },
  { name: 'Camila Rocha', key: 'Camila', className: '9º A' },
  { name: 'Isabela Moura', key: 'Isabela', className: '9º A' },
  { name: 'Eduardo Azeredo', key: 'Eduardo', className: '9º A' },
  { name: 'Yasmin Cunha', key: 'Yasmin', className: '9º A' },
  { name: 'Lívia Monteiro', key: 'Livia', className: '9º A' },
  { name: 'Ana Beatriz', key: 'AnaBeatriz', className: '8º A' },
  { name: 'Heitor', key: 'Heitor', className: '8º A' },
];

export default function Platform() {
  const [page, setPage] = useState(() => resolvePage(window.location.hash.slice(1)));
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('permaneo-theme') === 'dark'; } catch { return false; }
  });
  const [role, setRole] = useState('director');
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('Todas as turmas');
  const [listPage, setListPage] = useState(1);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [viewMode, setViewMode] = useState('cards');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('9º A');
  const [formError, setFormError] = useState('');
  const [attendance, setAttendance] = useState(() => {
    try { return JSON.parse(localStorage.getItem('permaneo-demo-attendance') || '{}'); } catch { return {}; }
  });
  const [notificationsRead, setNotificationsRead] = useState(() => {
    try { return localStorage.getItem('permaneo-demo-notifications-read') === 'true'; } catch { return false; }
  });
  const toastTimer = useRef();
  const returnPage = useRef('carometroManagement');
  const returnScroll = useRef(0);
  const modalOpener = useRef(null);
  const isProfile = page.startsWith('Profile');
  const profileName = isProfile ? page.slice(7).replace(/(Management|Teacher)$/, '') : '';
  const profileComponents = profiles[profileName];
  const isTeacherProfile = page.endsWith('Teacher');
  const Screen = isProfile
    ? profileComponents?.[isTeacherProfile ? (dark ? 3 : 2) : (dark ? 1 : 0)]
    : pages[page]?.[dark ? 1 : 0];
  const ActiveScreen = Screen || HomeLight;
  const toggleTheme = () => setDark((value) => !value);
  const visibleStudents = useMemo(
    () => demoStudents.filter((student) => normalize(student.name).includes(normalize(searchQuery))
      && (classFilter === 'Todas as turmas' || student.className === classFilter)),
    [searchQuery, classFilter],
  );

  const navigate = (destination) => {
    const nextPage = resolvePage(destination);
    if (nextPage === page) return;
    setPage(nextPage);
    window.history.pushState({ page: nextPage }, '', '#' + nextPage);
  };

  useEffect(() => {
    try { localStorage.setItem('permaneo-theme', dark ? 'dark' : 'light'); } catch {}
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  useEffect(() => {
    const handlePopState = (event) => {
      const nextPage = resolvePage(event.state?.page || window.location.hash.slice(1));
      setPage(nextPage);
    };
    if (!window.history.state?.page) {
      window.history.replaceState({ page }, '', window.location.pathname + window.location.search + '#' + page);
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!modal) {
      modalOpener.current?.focus?.();
      return undefined;
    }
    const timer = window.setTimeout(() => document.querySelector('[role="dialog"] input, [role="dialog"] select, [role="dialog"] button')?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [modal]);

  useEffect(() => {
    const root = document.querySelector('.' + utilityStyles.marker);
    if (!root) return undefined;
    const enhance = () => {
      root.querySelectorAll('[data-name^="Perfil ·"]').forEach((card) => {
        const name = normalize(card.getAttribute('data-name'));
        const selected = (role === 'director' && name.includes('direcao'))
          || (role === 'teacher' && name.includes('professor'))
          || (role === 'student' && name.includes('estudante'));
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-pressed', String(selected));
      });
      root.querySelectorAll('[data-name="aside.sticky"] [data-name="a.px-2"]').forEach((brand) => {
        if (!brand.querySelector('[data-name="Logo Permaneo · Vínculo · Vetor"]')) return;
        brand.setAttribute('role', 'button');
        brand.setAttribute('tabindex', '0');
        brand.setAttribute('aria-label', 'Permaneo, voltar para a Home');
      });
      root.querySelectorAll('a:not([href])').forEach((link) => {
        if (link.matches('[data-name^="Estudante ·"]')) {
          link.setAttribute('role', 'group');
          link.removeAttribute('tabindex');
          return;
        }
        link.setAttribute('role', 'link');
        link.setAttribute('tabindex', '0');
      });
      root.querySelectorAll('[data-name="Ver perfil"]').forEach((button) => {
        const card = button.closest('[data-name^="Estudante ·"]');
        const name = card?.getAttribute('data-name')?.replace('Estudante ·', '').trim();
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        button.setAttribute('aria-label', name ? 'Ver perfil de ' + name : 'Ver perfil');
      });
    };
    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [page, role]);

  useEffect(() => {
    const root = document.querySelector('.' + utilityStyles.marker);
    if (!root) return;
    root.querySelectorAll('[data-name^="Faltou ·"]').forEach((toggle) => {
      const student = toggle.getAttribute('data-name').replace(/^Faltou ·\s*/, '');
      const checked = Boolean(attendance[student]);
      const box = toggle.querySelector('[data-name="Checkbox"]');
      toggle.setAttribute('aria-pressed', String(checked));
      if (box) {
        box.style.backgroundColor = checked ? '#246579' : '';
        box.style.borderColor = checked ? '#246579' : '';
        box.textContent = checked ? '✓' : '';
        box.style.color = 'white';
        box.style.fontWeight = '700';
      }
    });
    root.querySelectorAll('[data-name*="não lidas"], [data-name*="nao lidas"]').forEach((badge) => {
      if (notificationsRead) badge.textContent = '0';
    });
  }, [page, attendance, notificationsRead]);

  useEffect(() => {
    if (!page.startsWith('carometro')) return undefined;
    const root = document.querySelector('.' + utilityStyles.marker);
    if (!root) return undefined;
    const applyViewMode = () => {
      const grid = root.querySelector('[data-name="Grade de estudantes"]');
      if (grid) grid.setAttribute('data-view-mode', viewMode);
      root.querySelectorAll('[data-name="Cartões"], [data-name="Lista"]').forEach((button) => {
        button.setAttribute('aria-pressed', String(normalize(button.getAttribute('data-name')) === (viewMode === 'cards' ? 'cartoes' : 'lista')));
      });
    };
    applyViewMode();
    const observer = new MutationObserver(applyViewMode);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [page, viewMode]);

  useEffect(() => {
    if (!page.startsWith('carometro')) return undefined;
    const root = document.querySelector('.' + utilityStyles.marker);
    if (!root) return undefined;
    const applyFilters = () => {
      const cards = [...root.querySelectorAll('[data-name^="Estudante ·"]')];
      let matchIndex = 0;
      cards.forEach((card) => {
        const cardLabel = normalize(card.getAttribute('data-name') + ' ' + card.textContent);
        const matchesSearch = normalize(card.getAttribute('data-name')).includes(normalize(searchQuery));
        const matchesClass = classFilter === 'Todas as turmas' || cardLabel.includes(normalize(classFilter));
        const matchesPage = showAllStudents || Math.floor(matchIndex / 6) + 1 === listPage;
        if (matchesSearch && matchesClass) matchIndex += 1;
        card.style.display = matchesSearch && matchesClass && matchesPage ? '' : 'none';
      });
      root.querySelectorAll('[data-name="Páginas"] button').forEach((button) => {
        const selected = button.getAttribute('data-name') === String(listPage);
        button.setAttribute('aria-current', selected ? 'page' : 'false');
      });
      const pageLabel = root.querySelector('[data-name="Páginas"] > p');
      const pageText = 'Página ' + listPage + ' de ' + Math.max(1, Math.ceil(matchIndex / 6));
      if (pageLabel && pageLabel.textContent !== pageText) pageLabel.textContent = pageText;
    };
    applyFilters();
    const observer = new MutationObserver(applyFilters);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [page, searchQuery, classFilter, listPage, showAllStudents]);

  const notify = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2800);
  };

  // A marca aparece com estruturas distintas nas telas exportadas do Figma.
  // Usar captura garante a navegação antes dos links internos de cada tela.
  const isHomeBrand = (target) => {
    if (!(target instanceof Element)) return false;
    const sidebar = target.closest('[data-name="aside.sticky"]');
    if (sidebar) {
      const logo = sidebar.querySelector('[data-name="Logo Permaneo · Vínculo · Vetor"]');
      if (logo) {
        const header = logo.closest('[data-name="a.px-2"]') || logo.parentElement?.parentElement;
        if (header?.contains(target)) return true;
      }
    }
    return Boolean(target.closest('a[href="#home"]')?.closest('section'));
  };

  const returnHome = (event) => {
    if (!isHomeBrand(event.target)) return;
    event.preventDefault();
    event.stopPropagation();
    navigate('home');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleClick = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const element = target?.closest('button, a[href], [role="button"], [role="link"]')
      || target?.closest('[data-name="Ver perfil"], [data-name^="Faltou ·"], [data-name="Buscar por nome"]');
    if (!element) return;
    const card = element.closest('[data-name^="Estudante ·"]');
    const cardLabel = card?.getAttribute('data-name') || '';
    const rawLabel = [element.getAttribute('aria-label'), element.getAttribute('data-name'), element.textContent, cardLabel].filter(Boolean).join(' ');
    const label = normalize(rawLabel);
    const actionName = normalize(element.getAttribute('data-name') || element.textContent);
    const prevent = () => event.preventDefault();

    if (label.includes('alternar tema') || label === 'tema' || label.includes('modo escuro')) {
      prevent(); setDark((value) => !value); notify(dark ? 'Tema claro ativado' : 'Tema escuro ativado'); return;
    }

    if (page === 'home') {
      const sections = [['a proposta', '2009:7591'], ['como funciona', '2009:7626'], ['para quem', '2009:7646'], ['solucoes', '2009:7653']];
      const section = sections.find(([title]) => label.includes(title));
      if (section) { prevent(); document.querySelector('[data-node-id="' + section[1] + '"]')?.scrollIntoView({ behavior: 'smooth' }); return; }
      if (/acessar|explorar|demonstracao|vamos conhecer|perfil/.test(label)) { prevent(); navigate('login'); return; }
    }

    if (page === 'login') {
      if (label.includes('direcao') || label.includes('diretor')) { setRole('director'); return; }
      if (label.includes('professor')) { setRole('teacher'); return; }
      if (label.includes('estudante') || label.includes('aluno')) { setRole('student'); return; }
      if (label.includes('entrar') || label.includes('explorar sem preencher')) { prevent(); navigate(role); return; }
      if (label.includes('voltar ao inicio') || label.includes('voltar a pagina')) { prevent(); navigate('home'); return; }
    }

    if (page.startsWith('carometro')) {
      const names = [['ana beatriz', 'AnaBeatriz'], ['lucas', 'Lucas'], ['camila', 'Camila'], ['isabela', 'Isabela'], ['eduardo', 'Eduardo'], ['yasmin', 'Yasmin'], ['livia', 'Livia'], ['heitor', 'Heitor']];
      const entry = names.find(([name]) => label.includes(name));
      if (entry && profiles[entry[1]] && element.matches('[data-name="Ver perfil"]')) {
        const teacherView = role === 'teacher' && profiles[entry[1]].length === 4;
        returnPage.current = page;
        returnScroll.current = window.scrollY;
        navigate('Profile' + entry[1] + (teacherView ? 'Teacher' : 'Management'));
        return;
      }
    }

    if (isProfile && label.includes('voltar')) {
      navigate(returnPage.current);
      window.requestAnimationFrame(() => window.scrollTo({ top: returnScroll.current, behavior: 'auto' }));
      return;
    }

    if (label.includes('sair')) { prevent(); navigate('login'); return; }
    if (label.includes('painel da escola') || label.includes('painel da direcao')) { navigate('director'); return; }
    if (label.includes('minhas turmas')) { setRole('teacher'); navigate('teacher'); return; }
    if (label.includes('meu painel')) { setRole('student'); navigate('student'); return; }
    if (label.includes('meu espaco')) { navigate('studentSpace'); return; }
    if (label.includes('carometro')) { navigate(role === 'teacher' ? 'carometroTeacher' : 'carometroManagement'); return; }
    if (label.includes('acompanhamento')) { navigate(role === 'teacher' ? 'teacherFollowup' : 'directorFollowup'); return; }
    if (label.includes('notificacoes')) { navigate(role === 'teacher' ? 'teacherNotifications' : 'directorNotifications'); return; }
    if (label.includes('relatorios')) { navigate('reports'); return; }
    if (label.includes('configuracoes')) { navigate(role === 'teacher' ? 'teacherSettings' : role === 'student' ? 'studentSpace' : 'directorSettings'); return; }

    if (page.startsWith('carometro') && label.includes('cartoes')) { setViewMode('cards'); return; }
    if (page.startsWith('carometro') && actionName === 'lista') { setViewMode('list'); return; }
    if (page.startsWith('carometro') && actionName.includes('exibir todos')) { setShowAllStudents(true); return; }
    if (page.startsWith('carometro') && element.closest('[data-name="Páginas"]')) {
      if (actionName.includes('exibir todos')) { setShowAllStudents(true); return; }
      if (actionName === '1' || actionName === '2') { setShowAllStudents(false); setListPage(Number(actionName)); return; }
    }
    if (page.startsWith('carometro') && (label.includes('buscar por nome') || label === 'buscar')) {
      modalOpener.current = element;
      setModal('search');
      setSearchQuery('');
      return;
    }
    if (page.startsWith('carometro') && label.includes('filtros')) {
      modalOpener.current = element;
      setModal('filters');
      return;
    }
    if (page.startsWith('carometro') && label.includes('adicionar aluno')) {
      modalOpener.current = element;
      setModal('add-student');
      setFormError('');
      return;
    }

    if (label.includes('faltou') || label.includes('presenca')) {
      const student = (element.getAttribute('data-name') || '').replace(/^Faltou ·\s*/, '').trim();
      const checked = !attendance[student];
      setAttendance((previous) => {
        const next = { ...previous, [student]: checked };
        try { localStorage.setItem('permaneo-demo-attendance', JSON.stringify(next)); } catch {}
        return next;
      });
      notify(checked ? 'Falta marcada e salva nesta demonstração' : 'Falta desmarcada');
      return;
    }

    if (label.includes('salvar frequencia') || label.includes('salvar configuracoes') || label.includes('salvar alteracoes')) {
      prevent();
      try { localStorage.setItem('permaneo-demo-' + page, new Date().toISOString()); } catch {}
      notify('Alterações salvas nesta demonstração'); return;
    }

    if (label.includes('exportar') || label.includes('baixar relatorio')) {
      prevent();
      const csvCell = (value) => '"' + String(value || '').replace(/"/g, '""') + '"';
      const root = document.querySelector('.' + utilityStyles.marker);
      const students = [...(root?.querySelectorAll('[data-name^="Estudante ·"]') || [])]
        .filter((card) => card.style.display !== 'none')
        .map((card) => {
          const name = card.getAttribute('data-name').replace('Estudante ·', '').trim();
          const texts = [...card.querySelectorAll('p')].map((item) => item.textContent.trim());
          return [name, texts.find((value) => /\d+º\s*[A-Z]/.test(value)) || '', texts.find((value) => /\d+%/.test(value)) || ''];
        });
      const rows = [
        ['Relatório Permaneo — demonstração'],
        ['Tela', page],
        ['Gerado em', new Date().toLocaleString('pt-BR')],
        [],
        ['Estudante', 'Turma', 'Frequência'],
        ...(students.length ? students : [['Sem lista de estudantes nesta tela', '', '']]),
      ];
      const csv = rows.map((row) => row.map(csvCell).join(';')).join('\r\n');
      const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio-permaneo-demonstrativo.csv';
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify('Relatório demonstrativo baixado');
      return;
    }

    if (label.includes('marcar todas') || label.includes('marcar como lida')) {
      prevent();
      setNotificationsRead(true);
      try { localStorage.setItem('permaneo-demo-notifications-read', 'true'); } catch {}
      notify('Notificações marcadas como lidas nesta demonstração');
      return;
    }

    if (element.matches('button, [role="button"], [tabindex]') && label) {
      prevent();
      if (label.includes('adicionar estudante')) notify('Cadastro disponível apenas como demonstração front end');
      else if (label.includes('buscar') || label.includes('filtrar')) notify('Use os campos da tela para refinar a visualização');
      else notify('Ação demonstrativa: ' + rawLabel.replace(/\s+/g, ' ').trim().slice(0, 60));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && modal) { setModal(''); return; }
    if (event.key === 'Tab' && modal) {
      const dialog = document.querySelector('[role="dialog"]');
      const controls = [...(dialog?.querySelectorAll('button, input, select, [href], [tabindex]:not([tabindex="-1"])') || [])].filter((item) => !item.disabled);
      if (controls.length) {
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      return;
    }
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target instanceof Element ? event.target : null;
    const interactive = target?.closest('[role="button"]:not(button), a[role="link"]:not([href])');
    if (!interactive) return;
    event.preventDefault();
    interactive.click();
  };

  const saveStudent = (event) => {
    event.preventDefault();
    if (!studentName.trim()) {
      setFormError('Informe o nome do estudante.');
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem('permaneo-demo-students') || '[]');
      saved.push({ name: studentName.trim(), className: studentClass, createdAt: new Date().toISOString() });
      localStorage.setItem('permaneo-demo-students', JSON.stringify(saved));
    } catch {}
    setStudentName('');
    setModal('');
    notify('Cadastro demonstrativo salvo neste navegador.');
  };

  return (
    <div
      className={styles.canvas + ' ' + utilityStyles.marker}
      data-theme={dark ? 'dark' : 'light'}
      data-selected-role={role}
      onClickCapture={returnHome}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Suspense fallback={<div className={styles.loading}>Carregando Permaneo…</div>}>
        {page === 'login' && (
          <LoginPage role={role} onSelectRole={setRole} onNavigate={navigate}
            dark={dark} onToggleTheme={toggleTheme} photo={loginPhoto} logo={logo}
            frequenciaIntegrada={frequenciaIntegrada} />
        )}
        {page === 'frequencia' && (
          <FrequenciaIntegrada onVoltar={() => navigate('login')} dark={dark} onToggleTheme={toggleTheme} />
        )}
        {page === 'home' && <ActiveScreen dark={dark} onToggleTheme={toggleTheme} onNavigate={navigate} />}
        {page !== 'home' && page !== 'login' && page !== 'frequencia' && <ActiveScreen />}
      </Suspense>
        {modal && (
          <Modal labelledBy="dialog-title" onClose={() => setModal('')}>
              {modal === 'search' && (
                <>
                  <h2 id="dialog-title">Buscar estudante</h2>
                  <p>Pesquise nos perfis demonstrativos do carômetro.</p>
                  <TextField label="Nome do estudante" autoFocus value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setListPage(1); }} placeholder="Digite um nome" />
                  <ul className={styles.searchResults}>
                    {visibleStudents.map((student) => (
                      <li key={student.key}>
                        <button type="button" onClick={() => {
                          returnPage.current = page;
                          returnScroll.current = window.scrollY;
                          const teacherView = role === 'teacher' && profiles[student.key]?.length === 4;
                          setModal('');
                          navigate('Profile' + student.key + (teacherView ? 'Teacher' : 'Management'));
                        }}>
                          <span><b>{student.name}</b><small>{student.className}</small></span><span aria-hidden="true">›</span>
                        </button>
                      </li>
                    ))}
                    {!visibleStudents.length && <li className={styles.emptyResult}>Nenhum estudante encontrado.</li>}
                  </ul>
                  <div className={styles.dialogActions}><button type="button" onClick={() => setModal('')}>Fechar</button></div>
                </>
              )}
              {modal === 'filters' && (
                <>
                  <h2 id="dialog-title">Filtros do carômetro</h2>
                  <p>Refine a lista demonstrativa por turma. Sua seleção fica ativa ao abrir um perfil.</p>
                  <TextField as="select" label="Turma" value={classFilter} onChange={(event) => { setClassFilter(event.target.value); setListPage(1); }}>
                    <option>Todas as turmas</option><option>9º A</option><option>8º A</option>
                  </TextField>
                  <div className={styles.dialogActions}>
                    <button type="button" onClick={() => { setClassFilter('Todas as turmas'); setSearchQuery(''); setModal(''); }}>Limpar filtros</button>
                    <button className={styles.primaryAction} type="button" onClick={() => setModal('')}>Aplicar filtros</button>
                  </div>
                </>
              )}
              {modal === 'add-student' && (
                <>
                  <h2 id="dialog-title">Adicionar estudante</h2>
                  <p>Este cadastro fica salvo somente neste navegador para a demonstração.</p>
                  <form onSubmit={saveStudent}>
                    <TextField label="Nome completo" autoFocus value={studentName} onChange={(event) => { setStudentName(event.target.value); setFormError(''); }} placeholder="Ex.: Marina Alves" />
                    <TextField as="select" label="Turma" value={studentClass} onChange={(event) => setStudentClass(event.target.value)}>
                      <option>9º A</option><option>8º A</option><option>7º A</option>
                    </TextField>
                    {formError && <p className={styles.formError} role="alert">{formError}</p>}
                    <div className={styles.dialogActions}>
                      <button type="button" onClick={() => setModal('')}>Cancelar</button>
                      <button className={styles.primaryAction} type="submit">Salvar cadastro</button>
                    </div>
                  </form>
                </>
              )}
          </Modal>
        )}
      {toast && <div className={styles.toast} role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}
