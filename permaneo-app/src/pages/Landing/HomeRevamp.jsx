import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BookOpen, CalendarCheck2, Check,
  ChevronRight, ClipboardCheck, GraduationCap, HeartHandshake,
  LayoutDashboard, Menu, Moon, ShieldCheck, Sun, UsersRound, X
} from 'lucide-react';
import logo from '../../images/logo.svg';
import schoolPhoto from '../../images/school-0.jpg';
import styles from './HomeRevamp.module.css';

const profiles = [
  {
    key: 'director',
    label: 'Direção e coordenação',
    icon: LayoutDashboard,
    title: 'Uma visão mais clara da escola.',
    description: 'Acompanhe sinais de atenção, organize encaminhamentos e entenda o que precisa de cuidado.',
    items: ['Panorama da escola', 'Acompanhamento por estudante', 'Relatórios demonstrativos'],
    route: '/director'
  },
  {
    key: 'teacher',
    label: 'Professores',
    icon: BookOpen,
    title: 'Quem está perto percebe primeiro.',
    description: 'Visualize turmas, registre presença e identifique situações que merecem uma conversa.',
    items: ['Turmas e frequência', 'Visão dos estudantes', 'Acompanhamento próximo'],
    route: '/teacher'
  },
  {
    key: 'student',
    label: 'Estudantes',
    icon: GraduationCap,
    title: 'Um espaço para seguir em frente.',
    description: 'Consulte sua jornada escolar e encontre caminhos para solicitar apoio quando precisar.',
    items: ['Minha jornada', 'Atividades e calendário', 'Espaço de apoio'],
    route: '/student'
  }
];

const steps = [
  { number: '01', title: 'Perceber', description: 'A escola visualiza sinais de frequência e acompanhamento em um só lugar.', icon: CalendarCheck2 },
  { number: '02', title: 'Compreender', description: 'Professores e coordenação conectam informações ao contexto do estudante.', icon: UsersRound },
  { number: '03', title: 'Acompanhar', description: 'A equipe organiza próximos passos e registra o cuidado ao longo do tempo.', icon: HeartHandshake }
];

export default function HomeRevamp({ dark = false, onToggleTheme, onSelectRole, onPrivacy, onSolution }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(0);
  const profile = profiles[selectedProfile];
  const ProfileIcon = profile.icon;
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={styles.landing} data-local-content data-name="Permaneo / Home">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/home" className={styles.brand} onClick={closeMenu} aria-label="Permaneo, início">
            <img src={logo} alt="" width="42" height="34" />
            <span>Permane<strong>o</strong></span>
          </Link>
          <nav className={styles.desktopNav} aria-label="Navegação principal">
            <a href="#proposta">A proposta</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#perfis">Para quem</a>
            <a href="#solucao">A plataforma</a>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.themeButton} type="button" onClick={onToggleTheme} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} title={dark ? 'Tema claro' : 'Tema escuro'}>
              {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
            </button>
            <Link className={styles.headerCta} to="/login">Explorar demonstração <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <button className={styles.mobileToggle} type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="permaneo-home-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className={styles.mobileNav} aria-label="Navegação para celular" id="permaneo-home-menu">
            <a href="#proposta" onClick={closeMenu}>A proposta</a>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#perfis" onClick={closeMenu}>Para quem</a>
            <a href="#solucao" onClick={closeMenu}>A plataforma</a>
            <Link to="/login" onClick={closeMenu}>Explorar demonstração <ArrowUpRight size={17} /></Link>
          </nav>
        )}
      </header>

      <div id="home-main" className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroText}>
            <h1 id="hero-title">Toda trajetória merece <em>continuar.</em></h1>
            <p>Uma escola que percebe cedo, se aproxima e caminha junto. O Permaneo conecta informações e pessoas para apoiar a permanência de cada estudante.</p>
            <div className={styles.heroActions}>
              <Link to="/login" className={styles.primaryButton}>Conhecer na prática <ArrowUpRight size={20} aria-hidden="true" /></Link>
              <a href="#proposta" className={styles.textButton}>Entenda a proposta <ArrowRight size={19} aria-hidden="true" /></a>
            </div>
            <p className={styles.demoDisclaimer}><ShieldCheck size={17} aria-hidden="true" /> Experiência demonstrativa com dados fictícios</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.photoFrame}>
              <img src={schoolPhoto} alt="Ambiente escolar com estudantes em convivência" width="832" height="518" fetchPriority="high" />
              <div className={styles.photoCaption}>
                <span className={styles.captionMark}><HeartHandshake size={22} aria-hidden="true" /></span>
                <p>A permanência se constrói <strong>com presença e cuidado.</strong></p>
              </div>
            </div>
            <div className={styles.heroAccent} aria-hidden="true"><span>presença</span><span>escuta</span><span>futuro</span></div>
          </div>
        </section>
        <div className={styles.valueBar} aria-label="Pilares do Permaneo">
          <span><Check size={17} aria-hidden="true" /> Sinais mais visíveis</span>
          <span><Check size={17} aria-hidden="true" /> Apoio mais próximo</span>
          <span><Check size={17} aria-hidden="true" /> Trajetórias acompanhadas</span>
        </div>

        <section id="proposta" className={styles.proposal} aria-labelledby="proposta-title">
          <div className={styles.sectionHeading}>
            <h2 id="proposta-title">Os dados mostram um sinal. <em>O cuidado muda a história.</em></h2>
            <p>Quando frequência, desempenho e acompanhamento se encontram, a equipe escolar ganha mais clareza para entender o contexto e agir antes que a distância aumente.</p>
          </div>
          <div className={styles.proposalGrid}>
            <div className={styles.proposalStatement}>
              <span className={styles.largeQuote}>“</span>
              <p>Por trás de cada falta, existe uma história que merece ser ouvida.</p>
              <span className={styles.quoteFooter}>Acreditamos na escola que acolhe.</span>
            </div>
            <div className={styles.proposalList}>
              <div><span className={styles.itemIcon}><CalendarCheck2 size={24} aria-hidden="true" /></span><div><h3>Mais contexto, menos achismo</h3><p>Observe frequência e histórico para compreender sinais de afastamento.</p></div></div>
              <div><span className={styles.itemIcon}><HeartHandshake size={24} aria-hidden="true" /></span><div><h3>O vínculo vem primeiro</h3><p>Transforme a informação em conversas e ações de apoio.</p></div></div>
              <div><span className={styles.itemIcon}><ClipboardCheck size={24} aria-hidden="true" /></span><div><h3>Acompanhamento contínuo</h3><p>Organize registros e próximos passos entre os diferentes perfis.</p></div></div>
            </div>
          </div>
        </section>

        <section className={styles.platformSection} id="solucao" aria-labelledby="plataforma-title">
          <div className={styles.platformIntro}>
            <div>
              <h2 id="plataforma-title">Uma visão conectada. Decisões mais humanas.</h2>
              <p>Da visão geral da escola aos detalhes de cada estudante, o Permaneo organiza o que importa para o acompanhamento.</p>
              <Link to="/login" className={styles.lightButton}>Entrar na demonstração <ArrowUpRight size={19} aria-hidden="true" /></Link>
              <button type="button" className={styles.solutionLink} onClick={onSolution}>Conhecer as modalidades da solução <ArrowRight size={16} aria-hidden="true" /></button>
            </div>
            <div className={styles.mockDashboard} aria-label="Exemplo ilustrativo do painel do Permaneo">
              <div className={styles.mockTop}><span><img src={logo} alt="" width="26" height="22" /> Permaneo</span><span>Demonstração</span></div>
              <div className={styles.mockBody}>
                <div className={styles.mockHeading}><span>Visão da escola</span><span className={styles.mockDot}>Dados fictícios</span></div>
                <div className={styles.mockTiles}>
                  <div><small>Frequência</small><strong>Acompanhar</strong><span>Visão por turma</span></div>
                  <div><small>Estudantes</small><strong>Perceber</strong><span>Sinais de atenção</span></div>
                  <div><small>Apoio</small><strong>Agir</strong><span>Próximos passos</span></div>
                </div>
                <div className={styles.mockRows}>
                  <div><span className={styles.rowAvatar}>C</span><span><b>Camila R.</b><small>Exemplo de acompanhamento</small></span><i>Em acompanhamento</i></div>
                  <div><span className={styles.rowAvatar}>L</span><span><b>Lucas M.</b><small>Exemplo de acompanhamento</small></span><i>Acompanhamento ativo</i></div>
                </div>
              </div>
              <div className={styles.mockFoot}>Prévia conceitual · Não representa dados reais</div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className={styles.howSection} aria-labelledby="como-title">
          <div className={styles.sectionHeading}>
            <h2 id="como-title">Da atenção à ação, sem perder ninguém de vista.</h2>
            <p>Uma jornada simples para apoiar o trabalho de quem cuida da permanência escolar todos os dias.</p>
          </div>
          <div className={styles.steps}>
            {steps.map(({ number, title, description, icon: Icon }) => (
              <article className={styles.step} key={number}>
                <div className={styles.stepTop}><span>{number}</span><Icon size={29} strokeWidth={1.6} aria-hidden="true" /></div>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="perfis" className={styles.rolesSection} aria-labelledby="perfis-title">
          <div className={styles.sectionHeading}>
            <h2 id="perfis-title">Uma escola. Três perspectivas. O mesmo propósito.</h2>
            <p>O cuidado acontece em conjunto — mas cada pessoa precisa de uma visão que faça sentido para sua rotina.</p>
          </div>
          <div className={styles.rolesLayout}>
            <div className={styles.roleChooser} aria-label="Explorar perfis de acesso">
              {profiles.map((item, index) => {
                const Icon = item.icon;
                return <button className={index === selectedProfile ? styles.roleActive : styles.roleOption} key={item.key} type="button" onClick={() => setSelectedProfile(index)} aria-pressed={index === selectedProfile}>
                  <span><Icon size={23} aria-hidden="true" /></span><strong>{item.label}</strong><ChevronRight size={21} aria-hidden="true" />
                </button>;
              })}
              <p>Selecione um perfil para descobrir sua experiência.</p>
            </div>
            <div className={styles.roleDetail} aria-live="polite">
              <ProfileIcon size={34} strokeWidth={1.5} aria-hidden="true" />
              <h3>{profile.title}</h3>
              <p>{profile.description}</p>
              <ul>{profile.items.map(item => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
              <Link to={profile.route} onClick={() => onSelectRole?.(profile.key)} className={styles.roleLink}>Explorar este perfil <ArrowUpRight size={19} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div>
            <h2 id="closing-title">Permanecer também é poder contar com alguém.</h2>
            <p>Conheça um jeito mais claro e acolhedor de acompanhar a jornada escolar.</p>
          </div>
          <Link to="/login" className={styles.closingCta}>Explorar o Permaneo <ArrowUpRight size={20} aria-hidden="true" /></Link>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}><img src={logo} alt="" width="38" height="31" /><strong>Permaneo</strong><p>Toda trajetória merece continuar.</p></div>
          <div><h3>Explore</h3><a href="#proposta">A proposta</a><a href="#como-funciona">Como funciona</a><a href="#perfis">Para quem</a></div>
          <div><h3>Demonstração</h3><Link to="/login">Acessar plataforma</Link><Link to="/student" onClick={() => onSelectRole?.('student')}>Espaço do estudante</Link><p>Ambiente com dados fictícios.</p></div>
        </div>
        <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Permaneo · Feito para apoiar a permanência escolar.</span><button type="button" className={styles.privacyLink} onClick={onPrivacy}>Privacidade e cuidado com as pessoas</button></div>
      </footer>
    </div>
  );
}
