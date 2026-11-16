import { useEffect, useState } from 'react';
import { Link, useHref, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowDownRight, ArrowRight, Armchair, BookOpen, CalendarDays, Moon, School, Sun } from 'lucide-react';
import logo from '../../images/logo.svg';
import AboutTeam from '../../components/team/AboutTeam.jsx';
import CommercialSection from './commercial/CommercialSection.jsx';
import SchoolJourney, { SchoolMedia } from './SchoolJourney.jsx';
import styles from './Home.module.css';

const sections = [
  ['problema', 'Problema'], ['como-funciona', 'Como funciona'], ['perfis', 'Perfis'],
  ['modelo-de-negocio', 'Planos'], ['equipe', 'Equipe'],
];

const profiles = [
  { label: 'Direção e coordenação', icon: School, route: 'director', preview: 'director', title: 'Combine o próximo passo de apoio', text: 'Cruze frequência e alertas para organizar intervenções e acompanhar os retornos da equipe.' },
  { label: 'Professor', icon: BookOpen, route: 'teacher', title: 'Organize a turma e faça a chamada', text: 'Visualize as carteiras, registre presença e abra o perfil de um estudante a partir da sala virtual.' },
  { label: 'Estudante', icon: CalendarDays, route: 'student', preview: 'studentCalendar', title: 'Planeje sua semana no seu ritmo', text: 'Consulte atividades e prazos, organize metas pessoais e conheça o espaço de apoio.' },
];

function SectionLink({ id, children, className }) {
  const href = useHref('/home#' + id);
  return <a href={href} className={className} onClick={(event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }}>{children}</a>;
}

export default function Home({ dark, onToggleTheme }) {
  const [selected, setSelected] = useState(0);
  const [privacy, setPrivacy] = useState(false);
  const profile = profiles[selected];
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(hash.slice(1));
      section?.focus({ preventScroll: true });
      section?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  return <div className={styles.home} data-local-content data-name={'01 · Home | ' + (dark ? 'Escuro' : 'Claro')}>
    <header className={styles.header}>
      <div className={styles.bar}>
        <SectionLink id="inicio" className={styles.brand}><img src={logo} alt="" width="38" height="32" /><span>Permane<b>o</b></span></SectionLink>
        <div className={styles.headerActions}>
          <button type="button" className={styles.theme} onClick={onToggleTheme} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/login" className={styles.secondary} data-name="CTA / Acessar">Acessar plataforma</Link>
          <SectionLink id="contato-comercial" className={styles.primary}>Solicitar proposta</SectionLink>
        </div>
        <nav className={styles.nav} aria-label="Seções da Home" data-name="Menu">
          {sections.map(([id, label]) => <SectionLink key={id} id={id}>{label}</SectionLink>)}
        </nav>
      </div>
    </header>
    <section id="inicio" tabIndex={-1} className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1>Toda trajetória merece <em>continuar.</em></h1>
          <p>Para escolas que querem prevenir a evasão. Acompanhe a frequência, entenda o contexto das faltas e organize o apoio a cada estudante.</p>
          <div className={styles.actions}>
            <SectionLink id="perfis" className={styles.primary}>Explorar a demonstração <ArrowRight size={18} /></SectionLink>
            <SectionLink id="como-funciona" className={styles.secondary}>Como funciona <ArrowDown size={16} /></SectionLink>
          </div>
          <Link to="/login" className={styles.mobileLogin}>Acessar plataforma</Link>
          <small>Demonstração interativa com dados fictícios.</small>
        </div>
        <SchoolMedia />
      </div>
    </section>
    <section id="problema" tabIndex={-1} className={styles.problem}>
      <h2>A evasão começa antes da ausência.</h2>
      <p>Quando as faltas se repetem, a escola precisa entender o que mudou. O Permaneo reúne registros que ajudam professores e coordenação a iniciar uma conversa e acompanhar o apoio combinado.</p>
    </section>
    <SchoolJourney />
    <section id="perfis" tabIndex={-1} className={styles.profiles}>
      <h2>Conheça os três ambientes</h2>
      <p>Escolha um perfil para ver o que ele pode fazer na demonstração.</p>
      <div className={styles.profileControls} role="group" aria-label="Perfis da demonstração">
        {profiles.map(({ label, icon: Icon }, index) => <button type="button" key={label} aria-pressed={index === selected}
          aria-controls="profile-preview" onClick={() => setSelected(index)}><Icon size={19} aria-hidden="true" />{label}</button>)}
      </div>
      <div className={styles.profilePanel} id="profile-preview">
        <div className={styles.profileCopy}>
          <h3>{profile.title}</h3>
          <p>{profile.text}</p>
          <Link to={'/' + profile.route} className={styles.primary}>Ver demonstração <ArrowDownRight size={19} aria-hidden="true" /></Link>
        </div>
        <figure className={styles.preview}>
          {profile.preview ? <img src={`${import.meta.env.BASE_URL}previews/${profile.preview}.webp`} width="1440" height="1000"
            alt={`Captura da demonstração do perfil ${profile.label}`} loading="lazy" /> :
            <div className={styles.roomPreview}>
              <div><Armchair size={20} aria-hidden="true" /><strong>Sala Virtual · 9º A</strong></div>
              <p>Quadro</p>
              <div className={styles.desks}><span>Lucas Gomes</span><span>Camila Rocha</span></div>
              <Link to="/teacherRoom?turma=9a" className={styles.secondary}>Abrir sala virtual <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>}
          <figcaption>{profile.preview ? 'Captura da demonstração com dados fictícios.' : 'Prévia esquemática com dados fictícios.'}</figcaption>
        </figure>
      </div>
    </section>
    <CommercialSection />
    <AboutTeam theme={dark ? 'dark' : 'light'} />
    <footer className={styles.footer}>
      <span className={styles.brand}><img src={logo} alt="" width="38" height="32" /><span>Permane<b>o</b></span></span>
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} aria-expanded={privacy} aria-controls="home-privacy" onClick={() => setPrivacy(!privacy)}>Privacidade da demonstração</button>
        <SectionLink id="contato-comercial" className={styles.primary}>Solicitar proposta</SectionLink>
      </div>
      <p id="home-privacy" hidden={!privacy}>A demonstração usa registros fictícios. Alterações como chamadas, metas e observações ficam neste navegador. Use apenas exemplos ao experimentar os formulários.</p>
    </footer>
  </div>;
}
