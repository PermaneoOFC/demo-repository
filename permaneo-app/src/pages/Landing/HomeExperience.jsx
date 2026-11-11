import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronRight, GraduationCap, HeartHandshake, LayoutDashboard, Menu, Moon, ShieldCheck, Sparkles, Sun, TrendingUp, Users, X } from 'lucide-react';
import logo from '../../images/logo.svg';
import schoolPhoto from '../../images/hero-school-home.webp';
import styles from './HomeExperience.module.css';

const stages = [
  { number: '01', title: 'Perceber cedo', short: 'Um sinal aparece', description: 'A frequência é acompanhada com contexto. Quando as faltas se repetem, a equipe recebe um sinal para olhar mais de perto.', icon: TrendingUp, tag: 'Sinal de atenção', cardTitle: 'Faltas consecutivas', cardBody: 'Lucas Gomes · 9º A', detail: '3 faltas registradas nesta semana' },
  { number: '02', title: 'Acolher de perto', short: 'A escola se aproxima', description: 'Professor e gestão organizam o contato com o estudante e sua família. Cada tentativa de apoio pode ser registrada.', icon: HeartHandshake, tag: 'Acompanhamento', cardTitle: 'Contato iniciado', cardBody: 'Conversa com a família', detail: 'Próximo passo definido pela equipe' },
  { number: '03', title: 'Caminhar juntos', short: 'A trajetória continua', description: 'A equipe acompanha o retorno, observa a evolução e ajusta o apoio conforme a necessidade de cada estudante.', icon: Users, tag: 'Evolução', cardTitle: 'Presença em recuperação', cardBody: 'Lucas Gomes · 9º A', detail: 'Acompanhamento em andamento' },
];

const roles = [
  { title: 'Direção e coordenação', description: 'Uma visão da escola para organizar as ações de apoio.', icon: LayoutDashboard, route: 'director', label: 'Explorar a gestão' },
  { title: 'Professor(a)', description: 'Frequência, turma e observações em um só lugar.', icon: BookOpen, route: 'teacher', label: 'Explorar a sala de aula' },
  { title: 'Estudante', description: 'Um espaço para acompanhar a jornada e pedir apoio.', icon: GraduationCap, route: 'student', label: 'Explorar o espaço do aluno' },
];

export default function HomeExperience({ dark, onToggleTheme, onNavigate }) {
  const root = useRef(null);
  const [stage, setStage] = useState(0);
  const [role, setRole] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeStage = stages[stage];
  const selectedRole = roles[role];
  const RoleIcon = selectedRole.icon;
  const StageIcon = activeStage.icon;

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    const element = root.current;
    if (!element || typeof requestAnimationFrame !== 'function' || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo('[data-hero-reveal]', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power2.out', clearProps: 'all' });
      gsap.utils.toArray('[data-reveal]').forEach((node) => {
        gsap.fromTo(node, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all',
          scrollTrigger: { trigger: node, start: 'top 90%', once: true },
        });
      });
      gsap.fromTo('[data-progress-fill]', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '#como-funciona', start: 'top 55%', end: 'bottom 45%', scrub: true },
      });
      gsap.to('[data-hero-image]', {
        yPercent: 9, ease: 'none',
        scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.utils.toArray('[data-stage-index]').forEach((node) => {
        ScrollTrigger.create({
          trigger: node, start: 'top 58%', end: 'bottom 42%',
          onEnter: () => setStage(Number(node.dataset.stageIndex)),
          onEnterBack: () => setStage(Number(node.dataset.stageIndex)),
        });
      });
    }, element);
    return () => context.revert();
  }, []);

  return <div className={styles.home} ref={root} data-name="Home Permaneo">
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <button className={styles.brand} onClick={() => goTo('inicio')} aria-label="Permaneo, voltar ao início"><img src={logo} alt="" /><span>Permane<span>o</span></span></button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Navegação principal">
          <button onClick={() => goTo('proposta')}>A proposta</button>
          <button onClick={() => goTo('como-funciona')}>Como funciona</button>
          <button onClick={() => goTo('para-quem')}>Para quem</button>
          <button onClick={() => goTo('solucoes')}>Soluções</button>
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.themeButton} onClick={onToggleTheme} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} title={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}>{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button className={`${styles.button} ${styles.headerCta}`} onClick={() => onNavigate('login')}>Acessar plataforma <ArrowRight size={17} /></button>
          <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>

    <main>
      <section id="inicio" className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-hero-reveal><span className={styles.eyebrowDot} /> TECNOLOGIA COM UM OLHAR HUMANO</p>
            <h1 data-hero-reveal>Toda trajetória merece <em>continuar.</em></h1>
            <p className={styles.heroLead} data-hero-reveal>Mais presença. Mais vínculos. Uma escola que percebe cedo e caminha junto com cada estudante.</p>
            <div className={styles.heroActions} data-hero-reveal>
              <button className={styles.button} onClick={() => onNavigate('login')}>Explorar a plataforma <ArrowRight size={19} /></button>
              <button className={styles.secondaryButton} onClick={() => goTo('proposta')}>Conhecer a proposta <ArrowDown size={18} /></button>
            </div>
            <p className={styles.careNote} data-hero-reveal><ShieldCheck size={17} /> Cuidado com as pessoas. Respeito aos dados.</p>
          </div>
          <div className={styles.heroVisual} data-hero-reveal>
            <div className={styles.imageFrame}><img data-hero-image src={schoolPhoto} alt="Estudantes no cotidiano escolar" /></div>
            <div className={styles.floatingAlert}><span className={styles.alertIcon}><TrendingUp size={19} /></span><span><strong>Perceber é o primeiro passo.</strong><small>Um olhar atento pode mudar uma história.</small></span></div>
            <div className={styles.imageCaption}><span className={styles.captionIcon}><HeartHandshake size={19} /></span> Presença é vínculo. Cuidar é perceber.</div>
          </div>
        </div>
        <button className={styles.scrollCue} onClick={() => goTo('proposta')} aria-label="Descer até a proposta"><span>DESCUBRA O PERMANEO</span><ArrowDown size={16} /></button>
      </section>

      <section id="proposta" className={styles.proposal}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro} data-reveal><p className={styles.kicker}>01 / A PROPOSTA</p><h2>Uma informação pode abrir caminho para uma conversa.</h2><p>Faltas e mudanças na rotina escolar ganham contexto quando a escola consegue perceber, acolher e acompanhar cada estudante.</p></div>
          <div className={styles.pillarGrid}>
            {stages.map(({ title, description, icon: Icon, number }) => <article className={styles.pillar} key={number} data-reveal><div className={styles.pillarTop}><span className={styles.pillarIcon}><Icon size={24} /></span><span className={styles.pillarNumber}>{number} / 03</span></div><h3>{title}</h3><p>{description}</p><span className={styles.pillarArrow}><ArrowRight size={19} /></span></article>)}
          </div>
        </div>
      </section>

      <section id="como-funciona" className={styles.story}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro} data-reveal><p className={styles.kicker}>02 / COMO FUNCIONA</p><h2>Do primeiro sinal ao apoio contínuo.</h2><p>Acompanhe uma situação ilustrativa. Desça a página para ver como a equipe pode agir em cada etapa.</p></div>
          <div className={styles.storyGrid}>
            <div className={styles.storySteps}>
              {stages.map((item, index) => <article key={item.number} className={`${styles.storyStep} ${stage === index ? styles.storyStepActive : ''}`} data-stage-index={index}>
                <span className={styles.stepNumber}>{item.number}</span><div><span className={styles.stepShort}>{item.short}</span><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>)}
            </div>
            <div className={styles.storySticky}>
              <div className={styles.demoWindow} aria-live="polite">
                <div className={styles.windowBar}><span className={styles.windowDots}><i /><i /><i /></span><span>Permaneo · Demonstração</span><span className={styles.livePill}>EXEMPLO</span></div>
                <div className={styles.windowBody} key={stage}>
                  <div className={styles.demoHeading}><span className={styles.demoIcon}><StageIcon size={25} /></span><span><small>ACOMPANHAMENTO ESCOLAR</small><strong>{activeStage.title}</strong></span></div>
                  <div className={styles.demoCard}><span className={styles.demoTag}><span />{activeStage.tag}</span><h4>{activeStage.cardTitle}</h4><p>{activeStage.cardBody}</p><div className={styles.demoDivider} /><small><Check size={16} /> {activeStage.detail}</small></div>
                  <div className={styles.demoFooter}><span>Uma ação de cada vez.</span><span>{activeStage.number} / 03</span></div>
                </div>
              </div>
              <div className={styles.storyProgress}><span data-progress-fill /></div>
              <p className={styles.fictionNote}>Prévia ilustrativa com dados fictícios.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="para-quem" className={styles.roles}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro} data-reveal><p className={styles.kicker}>03 / PARA QUEM</p><h2>Três olhares. Um propósito.</h2><p>Cada pessoa tem seu espaço para fazer a diferença na permanência escolar.</p></div>
          <div className={styles.rolesGrid} data-reveal>
            <div className={styles.roleTabs} role="tablist" aria-label="Escolha um perfil">
              {roles.map((item, index) => { const Icon = item.icon; return <button key={item.route} id={`role-tab-${index}`} role="tab" aria-selected={role === index} aria-controls="role-panel" className={`${styles.roleTab} ${role === index ? styles.roleTabActive : ''}`} onClick={() => setRole(index)}><span className={styles.roleTabIcon}><Icon size={23} /></span><span><strong>{item.title}</strong><small>{item.description}</small></span><ChevronRight size={19} /></button>; })}
            </div>
            <div className={styles.rolePanel} role="tabpanel" id="role-panel" aria-labelledby={`role-tab-${role}`}><div className={styles.rolePanelIcon}><RoleIcon size={31} /></div><p className={styles.kicker}>UM ESPAÇO PARA CADA PESSOA</p><h3>{selectedRole.title}</h3><p>{selectedRole.description}</p><div className={styles.roleMiniCard}><span className={styles.miniAvatar}><RoleIcon size={22} /></span><span><strong>{selectedRole.title}</strong><small>Uma escola mais conectada.</small></span><Check size={18} /></div><button className={styles.button} onClick={() => onNavigate('login')}>{selectedRole.label} <ArrowRight size={18} /></button><small className={styles.panelNote}>Acesse a demonstração e escolha seu perfil.</small></div>
          </div>
        </div>
      </section>

      <section id="solucoes" className={styles.solutions}><div className={styles.sectionInner}><div className={styles.sectionIntro} data-reveal><p className={styles.kicker}>04 / SOLUÇÕES</p><h2>Tecnologia para perceber. Pessoas para acolher.</h2><p>O Permaneo conecta informações e pessoas para que a escola organize o acompanhamento com cuidado.</p></div><div className={styles.solutionGrid}><article data-reveal><span className={styles.solutionIcon}><LayoutDashboard size={26} /></span><h3>Plataforma Permaneo</h3><p>Painéis, frequência, alertas e registros de acompanhamento em uma experiência para a equipe escolar.</p><button onClick={() => onNavigate('login')}>Ver a demonstração <ArrowRight size={17} /></button></article><article data-reveal><span className={styles.solutionIcon}><Sparkles size={26} /></span><h3>Permaneo Inteligente</h3><p>Uma proposta de integração para ampliar as formas de registrar presença e apoiar a tomada de decisão.</p><button onClick={() => goTo('contato')}>Conhecer a proposta <ArrowRight size={17} /></button></article></div></div></section>

      <section id="contato" className={styles.finalCta}><div className={styles.finalInner} data-reveal><span className={styles.finalMark}><HeartHandshake size={28} /></span><h2>Cada estudante que permanece é uma história que continua.</h2><p>Explore a demonstração nos perfis de gestão, professor e estudante.</p><button onClick={() => onNavigate('login')}>Vamos conhecer? <ArrowRight size={19} /></button></div></section>
    </main>
    <footer className={styles.footer}><div className={styles.footerInner}><div className={styles.brandStatic}><img src={logo} alt="" /><strong>Permane<span>o</span></strong></div><span>Tecnologia para perceber. Pessoas para acolher.</span><span>Permaneo · Projeto · 2026</span></div></footer>
  </div>;
}
