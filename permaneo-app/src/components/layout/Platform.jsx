import StudentProfile from '../students/StudentProfile.jsx';
import AppShell from './AppShell.jsx';
import { demoStudents } from '../../data/students.js';
import { pages, profiles, resolvePage, HomeLight } from '../../routes/screens.js';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Platform.module.css';
import LoginPage from '../../pages/Login/LoginPage.jsx';
import HomeRevamp from '../../pages/Landing/HomeRevamp.jsx';
import loginPhoto from '../../images/school-0.jpg';
import logo from '../../images/logo.svg';
import utilityStyles from './Layout.module.css';
import Modal from '../ui/Modal.jsx';
import TextField from '../ui/TextField.jsx';
import LocalStudents from '../students/LocalStudents.jsx';
import DemoForm from '../students/DemoForm.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import AddStudentForm from '../students/AddStudentForm.jsx';
import LocalProfile from '../../pages/Dashboard/Carometro/LocalProfile.jsx';
import { frequenciaIntegrada } from '../../services/frequenciaApi.js';

const FrequenciaIntegrada = lazy(() => import('../../pages/Dashboard/Frequencia/FrequenciaIntegrada.jsx'));

const normalize = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

export default function Platform() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const page = resolvePage(location.pathname.replace(/^\//, '') || 'home');
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('permaneo-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [role, setRole] = useState(() =>
    page.includes('Teacher') || page.startsWith('teacher')
      ? 'teacher'
      : page.startsWith('student')
        ? 'student'
        : 'director'
  );
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState('');
  const [records, setRecords] = useLocalStorage('permaneo-demo-records', []);
  const [localStudents, setLocalStudents] = useLocalStorage('permaneo-demo-students', []);
  const [localStudent, setLocalStudent] = useState(null);
  const [filterType, setFilterType] = useState('Turma');
  const [extraFilters, setExtraFilters] = useState({});
  const [notificationFilter, setNotificationFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('Todas as turmas');
  const [listPage, setListPage] = useState(1);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [viewMode, setViewMode] = useState('cards');
  const [attendance, setAttendance] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('permaneo-demo-attendance') || '{}');
    } catch {
      return {};
    }
  });
  const [notificationsRead, setNotificationsRead] = useState(() => {
    try {
      return localStorage.getItem('permaneo-demo-notifications-read') === 'true';
    } catch {
      return false;
    }
  });
  const toastTimer = useRef();
  const returnPage = useRef(null);
  const returnScroll = useRef(0);
  const modalOpener = useRef(null);
  const isProfile = page.startsWith('Profile');
  const profileName = isProfile ? page.slice(7).replace(/(Management|Teacher)$/, '') : '';
  const profileComponents = profiles[profileName];
  const isTeacherProfile = page.endsWith('Teacher');
  const Screen = isProfile
    ? profileComponents?.[isTeacherProfile ? (dark ? 3 : 2) : dark ? 1 : 0]
    : pages[page]?.[dark ? 1 : 0];
  const ActiveScreen = Screen || HomeLight;
  const shellRole =
    page.includes('Teacher') || page.startsWith('teacher')
      ? 'teacher'
      : page.startsWith('student')
        ? 'student'
        : 'director';
  const visibleStudents = useMemo(
    () =>
      [...demoStudents, ...localStudents].filter(
        (student) =>
          normalize(student.name).includes(normalize(searchQuery)) &&
          (classFilter === 'Todas as turmas' || student.className === classFilter)
      ),
    [searchQuery, classFilter, localStudents]
  );

  const navigate = (destination) => {
    const nextPage = resolvePage(destination);
    if (nextPage === page) return;
    routerNavigate('/' + nextPage);
  };

  useEffect(() => {
    setLocalStudent(null);
  }, [page]);

  useEffect(() => {
    try {
      localStorage.setItem('permaneo-theme', dark ? 'dark' : 'light');
    } catch {}
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  useEffect(() => {
    if (!modal) {
      modalOpener.current?.focus?.();
      return undefined;
    }
    const timer = window.setTimeout(
      () =>
        document
          .querySelector('[role="dialog"] input, [role="dialog"] select, [role="dialog"] button')
          ?.focus(),
      0
    );
    return () => window.clearTimeout(timer);
  }, [modal]);

  useEffect(() => {
    const root = document.querySelector('.' + utilityStyles.marker);
    if (!root) return undefined;
    const enhance = () => {
      root
        .querySelectorAll('[data-name="div.ml-auto"] [data-name="Component 5"]')
        .forEach((control) => {
          control.setAttribute('data-name', 'Alternar tema');
        });
      root.querySelectorAll('[data-name="Alternar tema"]').forEach((control) => {
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
        control.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
        control.setAttribute('title', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
      });
      if (page.includes('Notifications'))
        root.querySelectorAll('[data-name="div.inline-flex"] > [data-name]').forEach((control) => {
          control.setAttribute('role', 'tab');
          control.setAttribute('tabindex', '0');
          control.setAttribute(
            'aria-selected',
            String(normalize(control.textContent) === normalize(notificationFilter))
          );
        });
      root.querySelectorAll('[data-name^="Selecionar perfil"]').forEach((control) => {
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
        control.setAttribute(
          'aria-pressed',
          String(
            normalize(control.textContent).includes(
              role === 'director' ? 'direcao' : role === 'teacher' ? 'professor' : 'estudante'
            )
          )
        );
      });
      root
        .querySelectorAll('[data-name^="button#"], [data-name^="Faltou ·"]')
        .forEach((control) => {
          control.setAttribute('role', 'button');
          control.setAttribute('tabindex', '0');
          control.setAttribute('aria-label', control.dataset.name);
        });
      root.querySelectorAll('[data-name="Buscar estudante"]').forEach((control) => {
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
      });
      root.querySelectorAll('[data-name^="Perfil ·"]').forEach((card) => {
        const name = normalize(card.getAttribute('data-name'));
        const selected =
          (role === 'director' && name.includes('direcao')) ||
          (role === 'teacher' && name.includes('professor')) ||
          (role === 'student' && name.includes('estudante'));
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-pressed', String(selected));
      });
      root.querySelectorAll('[data-name="aside.sticky"] [data-name="Logo Permaneo · Vínculo · Vetor"]').forEach((logo) => {
        const brand = logo.closest('[data-name="a.px-2"]');
        if (!brand) return;
        brand.setAttribute('role', 'button');
        brand.setAttribute('tabindex', '0');
        brand.setAttribute('aria-label', 'Permaneo, voltar à página inicial');
        brand.style.cursor = 'pointer';
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
  }, [page, role, notificationFilter, dark]);

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
        button.setAttribute(
          'aria-pressed',
          String(
            normalize(button.getAttribute('data-name')) ===
              (viewMode === 'cards' ? 'cartoes' : 'lista')
          )
        );
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
        const matchesSearch = normalize(card.getAttribute('data-name')).includes(
          normalize(searchQuery)
        );
        const matchesClass =
          classFilter === 'Todas as turmas' || cardLabel.includes(normalize(classFilter));
        const frequency = Number(card.textContent.match(/(\d+)%/)?.[1] || 100);
        const matchesExtra =
          (!extraFilters['Série'] ||
            cardLabel.includes(normalize(extraFilters['Série']).replace(' ano', 'º'))) &&
          (!extraFilters['Frequência'] ||
            (extraFilters['Frequência'] === 'Em atenção' ? frequency < 85 : frequency >= 85)) &&
          (!extraFilters['Alertas'] ||
            (extraFilters['Alertas'] === 'Com alertas'
              ? cardLabel.includes('alerta')
              : !cardLabel.includes('alerta'))) &&
          (!extraFilters['Acompanhamento'] ||
            cardLabel.includes(normalize(extraFilters['Acompanhamento'])));
        const matchesPage = showAllStudents || Math.floor(matchIndex / 6) + 1 === listPage;
        if (matchesSearch && matchesClass && matchesExtra) matchIndex += 1;
        card.hidden = !(matchesSearch && matchesClass && matchesExtra && matchesPage);
        card.style.display = card.hidden ? 'none' : '';
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
  }, [page, searchQuery, classFilter, listPage, showAllStudents, extraFilters, localStudents]);

  useEffect(() => {
    const root = document.querySelector('.' + utilityStyles.marker);
    if (!root) return;
    const apply = () => {
      let count = 0;
      root.querySelectorAll('[data-name="Permaneo / Site / Linha de estudante"]').forEach((row) => {
        const text = normalize(row.textContent);
        const match =
          text.includes(normalize(searchQuery)) &&
          (classFilter === 'Todas as turmas' || text.includes(normalize(classFilter))) &&
          (!extraFilters['Situação'] || text.includes(normalize(extraFilters['Situação'])));
        const visible = match && Math.floor(count / 7) + 1 === listPage;
        if (match) count++;
        row.hidden = !visible;
        row.classList.toggle(styles.filteredOut, !visible);
      });
      for (const [key, name] of [
        ['turma', classFilter],
        ['serie', extraFilters['Série']],
        ['status', extraFilters['Situação']],
        ['periodo', extraFilters['Período']],
      ]) {
        const control = root.querySelector('[data-name="button#f-' + key + '"]');
        const label = control?.querySelector('p');
        if (label && name && label.textContent !== name) label.textContent = name;
      }
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [page, searchQuery, classFilter, extraFilters, listPage]);

  useEffect(() => {
    if (!page.includes('Notifications')) return;
    const root = document.querySelector('.' + utilityStyles.marker);
    if (!root) return;
    const apply = () =>
      root
        .querySelectorAll('[data-name="ul.surface-card"] > [data-name="li.flex"]')
        .forEach((row) => {
          row.classList.toggle(
            styles.filteredOut,
            notificationFilter !== 'Todas' &&
              !normalize(row.textContent).includes(normalize(notificationFilter))
          );
        });
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, [page, notificationFilter]);

  const notify = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2800);
  };

  const handleHomeBrandClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const sidebar = target.closest('[data-name="aside.sticky"]');
    const logo = sidebar?.querySelector('[data-name="Logo Permaneo · Vínculo · Vetor"]');
    const brand = logo?.closest('[data-name="a.px-2"]');
    if (!brand?.contains(target)) return;
    event.preventDefault();
    event.stopPropagation();
    navigate('home');
  };

  const handleClick = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const element =
      target?.closest('button, a[href], [role="button"], [role="link"], [role="tab"]') ||
      target?.closest(
        '[data-name="Ver perfil"], [data-name^="Faltou ·"], [data-name="Buscar por nome"]'
      );
    if (!element) return;
    const card = element.closest('[data-name^="Estudante ·"]');
    const cardLabel = card?.getAttribute('data-name') || '';
    const rawLabel = [
      element.getAttribute('aria-label'),
      element.getAttribute('data-name'),
      element.textContent,
      cardLabel,
    ]
      .filter(Boolean)
      .join(' ');
    const label = normalize(rawLabel);
    const actionName = normalize(element.getAttribute('data-name') || element.textContent);
    const prevent = () => event.preventDefault();

    if (element.closest('[data-local-content]')) return;
    if (page.includes('Notifications') && element.getAttribute('role') === 'tab') {
      setNotificationFilter(element.textContent.trim());
      return;
    }
    if (
      /registrar|agendar retorno|nova acao|pedir apoio|enviar pedido|vamos conversar/.test(label)
    ) {
      prevent();
      modalOpener.current = element;
      setModal('record');
      return;
    }
    if (label.includes('abrir portal') || label.includes('contato acolhedor')) {
      setModal('contact');
      return;
    }
    if (isProfile && /frequencia|notas|historico|observacoes|alertas|contatos/.test(actionName)) {
      const heading = [...document.querySelectorAll('p')].find(
        (p) => normalize(p.textContent) === actionName && !element.contains(p)
      );
      heading?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (element.dataset.name?.startsWith('button#f-')) {
      const key = element.dataset.name.includes('turma')
        ? 'Turma'
        : element.dataset.name.includes('serie')
          ? 'Série'
          : element.dataset.name.includes('status')
            ? 'Situação'
            : 'Período';
      setFilterType(key);
      setModal('choice');
      return;
    }
    if (element.dataset.name?.startsWith('button#')) {
      const active = element.getAttribute('aria-pressed') !== 'true';
      element.setAttribute('aria-pressed', String(active));
      try {
        localStorage.setItem('permaneo-setting-' + element.dataset.name, String(active));
      } catch {}
      return;
    }
    if (actionName.includes('limpar')) {
      setExtraFilters({});
      setClassFilter('Todas as turmas');
      setSearchQuery('');
      setListPage(1);
      return;
    }
    if (actionName === 'buscar estudante') {
      setModal('search');
      return;
    }
    if (!page.startsWith('carometro') && element.closest('[data-name="Páginas"]')) {
      const number = Number(element.textContent.trim());
      if (number) {
        setListPage(number);
        return;
      }
    }
    if (element.dataset.name === 'Permaneo / Site / Linha de estudante') {
      const entry = demoStudents.find((s) =>
        normalize(element.textContent).includes(normalize(s.name.split(' ')[0]))
      );
      if (entry) {
        navigate(
          'Profile' +
            entry.key +
            (role === 'teacher' && profiles[entry.key].length === 4 ? 'Teacher' : 'Management')
        );
        return;
      }
    }
    const filter = [
      'Turma',
      'Série',
      'Frequência',
      'Alertas',
      'Acompanhamento',
      'Período',
      'Situação',
    ].find(
      (name) =>
        actionName.startsWith(normalize(name)) &&
        !element.closest('aside') &&
        !/painel|acompanhamento da/.test(actionName)
    );
    if (
      filter &&
      !element.closest('[data-name="Menu da plataforma"]') &&
      /filtro|▾|selecionar|todos|todas|periodo|situacao/.test(label)
    ) {
      setFilterType(filter);
      setModal('choice');
      return;
    }

    if (label.includes('alternar tema') || label === 'tema' || label.includes('modo escuro')) {
      prevent();
      setDark((value) => !value);
      notify(dark ? 'Tema claro ativado' : 'Tema escuro ativado');
      return;
    }

    if (page === 'home') {
      if (actionName.startsWith('selecionar perfil')) {
        setRole(
          label.includes('professor')
            ? 'teacher'
            : label.includes('estudante')
              ? 'student'
              : 'director'
        );
        return;
      }
      if (label.includes('privacidade')) {
        setModal('privacy');
        return;
      }
      if (label.includes('conhecer a plataforma') || label.includes('conhecer a integracao')) {
        setModal('solution');
        return;
      }
      const sections = [
        ['a proposta', '2009:7591'],
        ['como funciona', '2009:7626'],
        ['para quem', '2009:7646'],
        ['solucoes', '2009:7653'],
      ];
      const section = sections.find(([title]) => label.includes(title));
      if (section) {
        prevent();
        document
          .querySelector('[data-node-id="' + section[1] + '"]')
          ?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (/acessar|explorar|demonstracao|vamos conhecer|perfil/.test(label)) {
        prevent();
        navigate('login');
        return;
      }
    }

    if (page === 'login') {
      if (label.includes('direcao') || label.includes('diretor')) {
        setRole('director');
        return;
      }
      if (label.includes('professor')) {
        setRole('teacher');
        return;
      }
      if (label.includes('estudante') || label.includes('aluno')) {
        setRole('student');
        return;
      }
      if (label.includes('entrar') || label.includes('explorar sem preencher')) {
        prevent();
        navigate(role);
        return;
      }
      if (label.includes('voltar ao inicio') || label.includes('voltar a pagina')) {
        prevent();
        navigate('home');
        return;
      }
    }

    if (page.startsWith('carometro')) {
      const names = [
        ['ana beatriz', 'AnaBeatriz'],
        ['lucas', 'Lucas'],
        ['camila', 'Camila'],
        ['isabela', 'Isabela'],
        ['eduardo', 'Eduardo'],
        ['yasmin', 'Yasmin'],
        ['livia', 'Livia'],
        ['heitor', 'Heitor'],
      ];
      const entry = names.find(([name]) => label.includes(name));
      if (entry && profiles[entry[1]] && element.matches('[data-name="Ver perfil"]')) {
        const teacherView = shellRole === 'teacher' && profiles[entry[1]].length === 4;
        returnPage.current = page;
        returnScroll.current = window.scrollY;
        navigate('Profile' + entry[1] + (teacherView ? 'Teacher' : 'Management'));
        return;
      }
    }

    if (isProfile && /voltar|← carometro/.test(label)) {
      navigate(
        returnPage.current || (shellRole === 'teacher' ? 'carometroTeacher' : 'carometroManagement')
      );
      window.requestAnimationFrame(() =>
        window.scrollTo({ top: returnScroll.current, behavior: 'auto' })
      );
      return;
    }

    if (label.includes('sair')) {
      prevent();
      navigate('login');
      return;
    }
    if (label.includes('painel da escola') || label.includes('painel da direcao')) {
      navigate('director');
      return;
    }
    if (label.includes('minhas turmas')) {
      setRole('teacher');
      navigate('teacher');
      return;
    }
    if (label.includes('meu painel')) {
      setRole('student');
      navigate('student');
      return;
    }
    if (label.includes('meu espaco')) {
      navigate('studentSpace');
      return;
    }
    if (label.includes('carometro')) {
      navigate(role === 'teacher' ? 'carometroTeacher' : 'carometroManagement');
      return;
    }
    if (
      label.includes('acompanhamento') &&
      !label.includes('ativo') &&
      !label.includes('regular')
    ) {
      navigate(role === 'teacher' ? 'teacherFollowup' : 'directorFollowup');
      return;
    }
    if (label.includes('notificacoes')) {
      navigate(role === 'teacher' ? 'teacherNotifications' : 'directorNotifications');
      return;
    }
    if (label.includes('relatorios')) {
      navigate('reports');
      return;
    }
    if (label.includes('configuracoes')) {
      navigate(
        role === 'teacher'
          ? 'teacherSettings'
          : role === 'student'
            ? 'studentSpace'
            : 'directorSettings'
      );
      return;
    }

    if (page.startsWith('carometro') && label.includes('cartoes')) {
      setViewMode('cards');
      return;
    }
    if (page.startsWith('carometro') && actionName === 'lista') {
      setViewMode('list');
      return;
    }
    if (page.startsWith('carometro') && actionName.includes('exibir todos')) {
      setShowAllStudents(true);
      return;
    }
    if (page.startsWith('carometro') && element.closest('[data-name="Páginas"]')) {
      if (actionName.includes('exibir todos')) {
        setShowAllStudents(true);
        return;
      }
      if (actionName === '1' || actionName === '2') {
        setShowAllStudents(false);
        setListPage(Number(actionName));
        return;
      }
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
      return;
    }

    if (label.includes('faltou') || label.includes('presenca')) {
      const student = (element.getAttribute('data-name') || '').replace(/^Faltou ·\s*/, '').trim();
      const checked = !attendance[student];
      setAttendance((previous) => {
        const next = { ...previous, [student]: checked };
        try {
          localStorage.setItem('permaneo-demo-attendance', JSON.stringify(next));
        } catch {}
        return next;
      });
      notify(checked ? 'Falta marcada e salva nesta demonstração' : 'Falta desmarcada');
      return;
    }

    if (
      label.includes('salvar frequencia') ||
      label.includes('salvar configuracoes') ||
      label.includes('salvar alteracoes')
    ) {
      prevent();
      try {
        localStorage.setItem('permaneo-demo-' + page, new Date().toISOString());
      } catch {}
      notify('Alterações salvas nesta demonstração');
      return;
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
          return [
            name,
            texts.find((value) => /\d+º\s*[A-Z]/.test(value)) || '',
            texts.find((value) => /\d+%/.test(value)) || '',
          ];
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
      const url = URL.createObjectURL(
        new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
      );
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
      try {
        localStorage.setItem('permaneo-demo-notifications-read', 'true');
      } catch {}
      notify('Notificações marcadas como lidas nesta demonstração');
      return;
    }

    if (element.matches('button, [role="button"], [tabindex]') && label) {
      prevent();
      if (label.includes('adicionar estudante'))
        notify('Cadastro disponível apenas como demonstração front end');
      else if (label.includes('buscar') || label.includes('filtrar'))
        notify('Use os campos da tela para refinar a visualização');
      else notify('Ação demonstrativa: ' + rawLabel.replace(/\s+/g, ' ').trim().slice(0, 60));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && modal) {
      setModal('');
      return;
    }
    if (event.key === 'Tab' && modal) {
      const dialog = document.querySelector('[role="dialog"]');
      const controls = [
        ...(dialog?.querySelectorAll(
          'button, input, select, [href], [tabindex]:not([tabindex="-1"])'
        ) || []),
      ].filter((item) => !item.disabled);
      if (controls.length) {
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target instanceof Element ? event.target : null;
    const interactive = target?.closest(
      '[role="button"]:not(button), [role="tab"], a[role="link"]:not([href])'
    );
    if (!interactive) return;
    event.preventDefault();
    interactive.click();
  };

  return (
    <div
      className={styles.canvas + ' ' + utilityStyles.marker}
      data-theme={dark ? 'dark' : 'light'}
      data-selected-role={role}
      data-notifications-read={notificationsRead}
      onClickCapture={handleHomeBrandClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Suspense fallback={<div className={styles.loading}>Carregando Permaneo…</div>}>
        {page === 'login' ? (
          <LoginPage
            role={role}
            onSelectRole={setRole}
            onNavigate={navigate}
            dark={dark}
            onToggleTheme={() => setDark((value) => !value)}
            photo={loginPhoto}
            logo={logo}
            frequenciaIntegrada={frequenciaIntegrada}
          />
        ) : page === 'frequencia' ? (
          <FrequenciaIntegrada onVoltar={() => navigate('login')} dark={dark} onToggleTheme={() => setDark(value => !value)} />
        ) : page === 'home' ? (
          <HomeRevamp dark={dark} onToggleTheme={() => setDark((value) => !value)} />
        ) : (
          <AppShell
            role={shellRole}
            dark={dark}
            notificationsRead={notificationsRead}
            onToggleTheme={() => setDark((value) => !value)}
          >
            {localStudent ? (
              <LocalProfile
                student={localStudent}
                records={records.filter((r) => r.student === localStudent.name)}
                onBack={() => setLocalStudent(null)}
                onRecord={() => setModal('record')}
              />
            ) : isProfile ? (
              <StudentProfile
                key={profileName + shellRole}
                studentKey={profileName}
                records={records.filter((record) => record.student === profileName)}
                onBack={() => {
                  navigate(
                    returnPage.current ||
                      (shellRole === 'teacher' ? 'carometroTeacher' : 'carometroManagement')
                  );
                }}
                onRecord={() => setModal('record')}
              />
            ) : (
              <ActiveScreen />
            )}
          </AppShell>
        )}
      </Suspense>
      {page.startsWith('carometro') && !localStudent && (
        <LocalStudents students={localStudents} onOpen={setLocalStudent} page={page} />
      )}
      {modal && (
        <Modal labelledBy="dialog-title" onClose={() => setModal('')}>
          {modal === 'record' && (
            <DemoForm
              title="Registrar acompanhamento"
              student={localStudent?.name || profileName || 'Demonstração'}
              records={records.filter(
                (r) => r.student === (localStudent?.name || profileName || 'Demonstração')
              )}
              onSave={(record) => {
                setRecords((list) => [...list, { ...record, createdAt: new Date().toISOString() }]);
                setModal('');
                notify('Registro demonstrativo salvo neste navegador.');
              }}
            />
          )}
          {['privacy', 'solution', 'contact'].includes(modal) && (
            <>
              <h2 id="dialog-title">
                {modal === 'privacy'
                  ? 'Privacidade na proposta'
                  : modal === 'contact'
                    ? 'Contato acolhedor'
                    : 'Soluções Permaneo'}
              </h2>
              <p>
                {modal === 'contact'
                  ? 'Este canal não envia mensagens. Na aplicação, estará disponível somente quando autorizado e configurado.'
                  : modal === 'privacy'
                    ? 'Cuidado com as pessoas. Respeito aos dados. Os dados deste ambiente são fictícios. Os pedidos de apoio são destinados à equipe autorizada da escola.'
                    : 'Permaneo Plataforma: assinatura por escola, mensal ou anual. Permaneo Inteligente: plataforma completa com câmeras integradas. Investimento sob consulta conforme o porte da escola.'}
              </p>
            </>
          )}
          {modal === 'choice' && (
            <>
              <h2 id="dialog-title">Filtrar por {filterType.toLowerCase()}</h2>
              <p>Selecione uma opção. Os filtros são combinados.</p>
              <div className={styles.choices}>
                {[
                  'Todos',
                  ...{
                    Turma: ['6º A', '7º B', '8º A', '9º A', '1º EM A', '2º EM B'],
                    Série: ['6º ano', '7º ano', '8º ano', '9º ano'],
                    Frequência: ['Em atenção', 'Regular'],
                    Alertas: ['Com alertas', 'Sem alertas'],
                    Acompanhamento: ['Ativo', 'Regular'],
                    Período: ['Ano letivo (Fev–Set)', 'Últimos 30 dias'],
                    Situação: ['Precisa de atenção', 'Em acompanhamento', 'Regular'],
                  }[filterType],
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (filterType === 'Turma')
                        setClassFilter(option === 'Todos' ? 'Todas as turmas' : option);
                      else
                        setExtraFilters((f) => ({
                          ...f,
                          [filterType]: option === 'Todos' ? '' : option,
                        }));
                      setListPage(1);
                      setModal('');
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
          {modal === 'search' && (
            <>
              <h2 id="dialog-title">Buscar estudante</h2>
              <p>Pesquise nos perfis demonstrativos do carômetro.</p>
              <TextField
                label="Nome do estudante"
                autoFocus
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setListPage(1);
                }}
                placeholder="Digite um nome"
              />
              <ul className={styles.searchResults}>
                {visibleStudents.map((student) => (
                  <li key={student.key || student.id}>
                    <button
                      type="button"
                      onClick={() => {
                        returnPage.current = page;
                        returnScroll.current = window.scrollY;
                        const teacherView =
                          shellRole === 'teacher' && profiles[student.key]?.length === 4;
                        setModal('');
                        if (student.id) {
                          setLocalStudent(student);
                          return;
                        }
                        navigate(
                          'Profile' + student.key + (teacherView ? 'Teacher' : 'Management')
                        );
                      }}
                    >
                      <span>
                        <b>{student.name}</b>
                        <small>{student.className}</small>
                      </span>
                      <span aria-hidden="true">›</span>
                    </button>
                  </li>
                ))}
                {!visibleStudents.length && (
                  <li className={styles.emptyResult}>Nenhum estudante encontrado.</li>
                )}
              </ul>
              <div className={styles.dialogActions}>
                <button type="button" onClick={() => setModal('')}>
                  Fechar
                </button>
              </div>
            </>
          )}
          {modal === 'filters' && (
            <>
              <h2 id="dialog-title">Filtros do carômetro</h2>
              <p>
                Refine a lista demonstrativa por turma. Sua seleção fica ativa ao abrir um perfil.
              </p>
              <TextField
                as="select"
                label="Turma"
                value={classFilter}
                onChange={(event) => {
                  setClassFilter(event.target.value);
                  setListPage(1);
                }}
              >
                <option>Todas as turmas</option>
                <option>6º A</option>
                <option>7º B</option>
                <option>8º A</option>
                <option>9º A</option>
                <option>1º EM A</option>
                <option>2º EM B</option>
              </TextField>
              {Object.entries({
                Série: ['6º ano', '7º ano', '8º ano', '9º ano'],
                Frequência: ['Em atenção', 'Regular'],
                Alertas: ['Com alertas', 'Sem alertas'],
                Acompanhamento: ['Ativo', 'Regular'],
              }).map(([name, options]) => (
                <TextField
                  key={name}
                  as="select"
                  label={name}
                  value={extraFilters[name] || ''}
                  onChange={(event) => {
                    setExtraFilters((f) => ({ ...f, [name]: event.target.value }));
                    setListPage(1);
                  }}
                >
                  <option value="">Todos</option>
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </TextField>
              ))}
              <div className={styles.dialogActions}>
                <button
                  type="button"
                  onClick={() => {
                    setExtraFilters({});
                    setClassFilter('Todas as turmas');
                    setSearchQuery('');
                    setListPage(1);
                    setModal('');
                  }}
                >
                  Limpar filtros
                </button>
                <button className={styles.primaryAction} type="button" onClick={() => setModal('')}>
                  Aplicar filtros
                </button>
              </div>
            </>
          )}
          {modal === 'add-student' && (
            <AddStudentForm
              onCancel={() => setModal('')}
              onSave={(student) => {
                setLocalStudents((list) => [
                  ...list,
                  { ...student, id: Date.now(), createdAt: new Date().toISOString() },
                ]);
                setShowAllStudents(true);
                setModal('');
                notify('Aluno demonstrativo salvo neste navegador.');
              }}
            />
          )}
        </Modal>
      )}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
