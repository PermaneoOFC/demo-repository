import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  Clock,
  FileText,
  HeartHandshake,
  Info,
  RotateCcw,
  Search,
  TrendingDown,
  UserRound,
} from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { normalizar } from '../../data/sala.js';
import styles from './NotificationsView.module.css';

const categories = [
  'Todas',
  'Faltas consecutivas',
  'Frequência abaixo da meta',
  'Pendência de acompanhamento',
  'Atualização de registros',
];

const directorNotifications = [
  {
    id: 'dir-ana-faltas',
    category: 'Faltas consecutivas',
    tone: 'warn',
    title: 'Ana Beatriz · 8º A',
    studentKey: 'AnaBeatriz',
    studentName: 'Ana Beatriz',
    description: 'Registrou faltas seguidas em acompanhamento recente. Que tal um contato acolhedor para entender como podemos ajudar?',
    date: '09/10/2026',
  },
  {
    id: 'dir-lucas-faltas',
    category: 'Faltas consecutivas',
    tone: 'danger',
    title: 'Lucas Gomes · 9º A',
    studentKey: 'Lucas',
    studentName: 'Lucas Gomes',
    description: 'Registrou 5 faltas seguidas nos registros demonstrativos. Que tal um contato acolhedor para entender o contexto atual?',
    date: '08/10/2026',
  },
  {
    id: 'dir-conversas-pendentes',
    category: 'Pendência de acompanhamento',
    tone: 'warn',
    title: 'Conversas agendadas pendentes',
    route: '/directorFollowup',
    routeLabel: 'Abrir acompanhamento',
    description: 'Há conversas combinadas com estudantes aguardando registro de retorno na aba de acompanhamento.',
    date: '08/10/2026',
  },
  {
    id: 'dir-heitor-faltas',
    category: 'Faltas consecutivas',
    tone: 'warn',
    title: 'Heitor · 8º A',
    studentKey: 'Heitor',
    studentName: 'Heitor',
    description: 'Sinal de atenção para acompanhamento de frequência. Avalie o histórico de aulas antes de definir o próximo passo.',
    date: '07/10/2026',
  },
  {
    id: 'dir-yasmin-meta',
    category: 'Frequência abaixo da meta',
    tone: 'warn',
    title: 'Yasmin Costa · 8º A',
    studentKey: 'Yasmin',
    studentName: 'Yasmin Costa',
    description: 'Frequência atual de 82% nos registros demonstrativos. Vale acompanhar as justificativas e combinar apoio com a turma.',
    date: '07/10/2026',
  },
  {
    id: 'dir-eduardo-meta',
    category: 'Atualização de registros',
    tone: 'info',
    title: 'Notas do 3º bimestre consolidadas',
    route: '/reports',
    routeLabel: 'Ver relatórios',
    description: 'As notas demonstrativas do 3º bimestre foram atualizadas para 8º A e 9º A.',
    date: '05/10/2026',
  },
  {
    id: 'dir-isabela-acompanhamento',
    category: 'Frequência abaixo da meta',
    tone: 'info',
    title: 'Isabela Santos · 8º A',
    studentKey: 'Isabela',
    studentName: 'Isabela Santos',
    description: 'Acompanhamento de retorno agendado com a equipe. Confira as observações antes da próxima conversa.',
    date: '04/10/2026',
  },
];

const teacherNotifications = [
  {
    id: 'prof-lucas-faltas',
    category: 'Faltas consecutivas',
    tone: 'danger',
    title: 'Lucas Gomes · 9º A',
    studentKey: 'Lucas',
    studentName: 'Lucas Gomes',
    description: 'Registrou 5 faltas seguidas na demonstração. Que tal uma conversa acolhedora para entender como podemos apoiar?',
    date: '08/10/2026',
  },
  {
    id: 'prof-conversas-pendentes',
    category: 'Pendência de acompanhamento',
    tone: 'warn',
    title: 'Conversas agendadas pendentes',
    route: '/teacherFollowup',
    routeLabel: 'Abrir acompanhamento',
    description: 'Há conversas combinadas com estudantes aguardando registro de retorno.',
    date: '08/10/2026',
  },
  {
    id: 'prof-yasmin-meta',
    category: 'Frequência abaixo da meta',
    tone: 'warn',
    title: 'Yasmin Costa · 8º A',
    studentKey: 'Yasmin',
    studentName: 'Yasmin Costa',
    description: 'Frequência demonstrativa em 82%. Avalie com a coordenação se cabe revisão de atividades ou contato acolhedor.',
    date: '07/10/2026',
  },
  {
    id: 'prof-camila-retorno',
    category: 'Atualização de registros',
    tone: 'info',
    title: 'Camila Rocha · 9º A',
    studentKey: 'Camila',
    studentName: 'Camila Rocha',
    description: 'Registrou novas metas pessoais de estudo e atualizações na demonstração da área do estudante.',
    date: '06/10/2026',
  },
  {
    id: 'prof-notas-publicadas',
    category: 'Atualização de registros',
    tone: 'info',
    title: 'Notas do 3º bimestre',
    route: '/teacher',
    routeLabel: 'Abrir Minhas Turmas',
    description: 'Os lançamentos demonstrativos do 3º bimestre estão disponíveis para consulta em 8º A e 9º A.',
    date: '05/10/2026',
  },
];

function CategoryIcon({ category }) {
  if (category === 'Faltas consecutivas') return <AlertTriangle size={20} aria-hidden="true" />;
  if (category === 'Frequência abaixo da meta') return <TrendingDown size={20} aria-hidden="true" />;
  if (category === 'Pendência de acompanhamento') return <Clock size={20} aria-hidden="true" />;
  return <FileText size={20} aria-hidden="true" />;
}

export default function NotificationsView({
  role = 'director',
  notificationsRead = false,
  onSetNotificationsRead,
  onOpenProfile,
  onStartFollowup,
  onNotify,
}) {
  const isTeacher = role === 'teacher';
  const items = isTeacher ? teacherNotifications : directorNotifications;
  const [readIds, setReadIds] = useLocalStorage(`permaneo-demo-notifications-items-${role}`, null);
  const [category, setCategory] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('Todas');
  const [search, setSearch] = useState('');

  const resolvedReadIds = useMemo(() => {
    if (Array.isArray(readIds)) return readIds;
    return notificationsRead ? items.map((item) => item.id) : [];
  }, [readIds, notificationsRead, items]);

  useEffect(() => {
    if (!Array.isArray(readIds)) return;
    const allRead = items.length > 0 && items.every((item) => readIds.includes(item.id));
    if (allRead !== notificationsRead) onSetNotificationsRead?.(allRead);
  }, [readIds, items, notificationsRead, onSetNotificationsRead]);

  const unreadCount = items.filter((item) => !resolvedReadIds.includes(item.id)).length;
  const priorityCount = items.filter((item) => item.tone !== 'info' && !resolvedReadIds.includes(item.id)).length;

  const filtered = useMemo(() => {
    const query = normalizar(search);
    return items.filter((item) => {
      const isRead = resolvedReadIds.includes(item.id);
      const matchesCategory = category === 'Todas' || item.category === category;
      const matchesStatus =
        statusFilter === 'Todas' ||
        (statusFilter === 'Não lidas' && !isRead) ||
        (statusFilter === 'Lidas' && isRead);
      const matchesSearch =
        !query ||
        normalizar(`${item.title} ${item.description} ${item.category}`).includes(query);
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [items, resolvedReadIds, category, statusFilter, search]);

  const toggleRead = (id) => {
    const isRead = resolvedReadIds.includes(id);
    const next = isRead
      ? resolvedReadIds.filter((entry) => entry !== id)
      : [...resolvedReadIds, id];
    setReadIds(next);
    const allRead = items.every((item) => next.includes(item.id));
    onSetNotificationsRead?.(allRead);
    onNotify?.(isRead ? 'Notificação marcada como não lida.' : 'Notificação marcada como lida nesta demonstração.');
  };

  const toggleAllRead = () => {
    if (unreadCount === 0) {
      setReadIds([]);
      onSetNotificationsRead?.(false);
      onNotify?.('Notificações reabertas nesta demonstração.');
      return;
    }
    setReadIds(items.map((item) => item.id));
    onSetNotificationsRead?.(true);
    onNotify?.('Notificações marcadas como lidas nesta demonstração.');
  };

  return (
    <main className={styles.page} data-local-content>
      <header className={styles.intro}>
        <div>
          <p className={styles.context}>
            Escola Estadual Horizonte <span>· Demonstração {isTeacher ? 'docente' : 'da coordenação'}</span>
          </p>
          <h1>Notificações</h1>
          <p>Mensagens e sinais para apoiar a equipe, com linguagem respeitosa e acolhedora.</p>
        </div>
        <button type="button" className={unreadCount ? styles.primaryAction : styles.secondaryAction} onClick={toggleAllRead}>
          {unreadCount ? <CheckCheck size={17} aria-hidden="true" /> : <RotateCcw size={17} aria-hidden="true" />}
          {unreadCount ? 'Marcar todas como lidas' : 'Reabrir todas'}
        </button>
      </header>

      <section className={styles.summaryGrid} aria-label="Resumo das notificações">
        <article className={styles.summaryCard}>
          <div className={styles.summaryTop}>
            <span>Não lidas</span>
            <Bell size={17} aria-hidden="true" />
          </div>
          <strong>{unreadCount}</strong>
          <small>{unreadCount === 0 ? 'Tudo revisado nesta visualização' : 'Aguardando leitura ou encaminhamento'}</small>
        </article>
        <article className={styles.summaryCard}>
          <div className={styles.summaryTop}>
            <span>Sinais de atenção</span>
            <AlertTriangle size={17} aria-hidden="true" />
          </div>
          <strong>{priorityCount}</strong>
          <small>Faltas seguidas, meta ou retorno pendente</small>
        </article>
        <article className={styles.summaryCard}>
          <div className={styles.summaryTop}>
            <span>Exibidas na lista</span>
            <FileText size={17} aria-hidden="true" />
          </div>
          <strong>{filtered.length}</strong>
          <small>De {items.length} registros demonstrativos</small>
        </article>
      </section>

      <section className={styles.toolbar} aria-label="Filtros de notificações">
        <div className={styles.searchRow}>
          <label className={styles.searchField}>
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              aria-label="Buscar notificações"
              placeholder="Buscar por estudante, turma ou mensagem"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className={styles.statusPills} role="group" aria-label="Filtrar por leitura">
            {['Todas', 'Não lidas', 'Lidas'].map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={statusFilter === option}
                onClick={() => setStatusFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.categoryTabs} role="tablist" aria-label="Filtrar por categoria">
          {categories.map((name) => {
            const count = name === 'Todas'
              ? items.length
              : items.filter((item) => item.category === name).length;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={category === name}
                onClick={() => setCategory(name)}
              >
                <span>{name}</span>
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {filtered.length ? (
        <ul className={styles.list} aria-label="Lista de notificações">
          {filtered.map((item) => {
            const isRead = resolvedReadIds.includes(item.id);
            return (
              <li key={item.id} className={styles.item} data-unread={!isRead}>
                <div className={styles.itemIcon} data-tone={item.tone}>
                  <CategoryIcon category={item.category} />
                </div>
                <div className={styles.itemBody}>
                  <div className={styles.itemMeta}>
                    <span className={styles.categoryLabel}>{item.category}</span>
                    <span className={isRead ? styles.readBadge : styles.unreadBadge}>
                      {isRead ? 'Lida' : 'Nova'}
                    </span>
                    <span className={styles.date}>{item.date}</span>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <div className={styles.itemActions}>
                    {item.studentKey && onOpenProfile && (
                      <button
                        type="button"
                        className={styles.secondaryAction}
                        onClick={() => onOpenProfile(item.studentKey)}
                      >
                        <UserRound size={15} aria-hidden="true" />
                        Ver perfil
                      </button>
                    )}
                    {item.studentKey && onStartFollowup && (
                      <button
                        type="button"
                        className={styles.secondaryAction}
                        onClick={() => onStartFollowup({ key: item.studentKey, name: item.studentName })}
                      >
                        <HeartHandshake size={15} aria-hidden="true" />
                        Registrar apoio
                      </button>
                    )}
                    {item.route && (
                      <Link className={styles.secondaryAction} to={item.route}>
                        {item.routeLabel}
                      </Link>
                    )}
                    <button
                      type="button"
                      className={`${styles.ghostAction} ${styles.readToggle}`}
                      onClick={() => toggleRead(item.id)}
                    >
                      <Check size={15} aria-hidden="true" />
                      {isRead ? 'Marcar como não lida' : 'Marcar como lida'}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <section className={styles.emptyState}>
          <h2>Nenhuma notificação encontrada</h2>
          <p>Ajuste a busca ou os filtros para visualizar outros alertas demonstrativos.</p>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={() => {
              setCategory('Todas');
              setStatusFilter('Todas');
              setSearch('');
            }}
          >
            Limpar filtros
          </button>
        </section>
      )}

      <aside className={styles.notice}>
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Ambiente demonstrativo · Sem envio externo</strong>
          <p>
            Nenhum e-mail, SMS ou alerta institucional é enviado de fato. O estado de leitura fica salvo apenas neste navegador.{' '}
            <Link to={isTeacher ? '/teacherSettings' : '/directorSettings'}>Ajustar preferências em Configurações</Link>
          </p>
        </div>
      </aside>
    </main>
  );
}
