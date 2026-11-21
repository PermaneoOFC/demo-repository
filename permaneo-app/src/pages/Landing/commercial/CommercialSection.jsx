import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Camera, Check, ChevronDown, Cpu, ShieldCheck, UsersRound } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CommercialDialog from './CommercialDialog.jsx';
import InvestmentCalculator from './InvestmentCalculator.jsx';
import ProposalForm from './ProposalForm.jsx';
import { PLANS, estimateInvestment, money } from './pricing.js';
import { features } from './features.js';
import styles from './CommercialSection.module.css';

gsap.registerPlugin(ScrollTrigger);
const sample = estimateInvestment(100);

export function scrollToCommercial(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

function PlanCard({ plan, onSelect }) {
  const annual = plan === 'annual';
  const data = PLANS[plan];
  return <article className={`${styles.planCard} ${annual ? styles.annualCard : ''}`} data-plan={plan}>
    <div className={styles.cardHeader}><h3>{data.name}</h3>{annual && <span className={styles.badge}>Melhor custo-benefício</span>}</div>
    <div className={styles.planPrice}><span>Plataforma</span><p><strong>{money(data.fixed).replace(',00', '')}</strong><span>/mês</span></p></div>
    <p className={styles.studentPrice}>+ <strong>{money(data.student)}</strong> por aluno/mês</p>
    <ul className={styles.checkList}>
      <li><Check size={18} aria-hidden="true" /> {data.term}</li>
    </ul>
    <div className={styles.planNote}><p>Para 100 alunos <strong>{money(annual ? sample.annualEquivalent : sample.monthly)}/mês</strong>{annual ? ' em valor equivalente' : ''}.</p></div>
    <button type="button" className={annual ? styles.primary : styles.secondary} onClick={() => onSelect(plan)}>Ver detalhes do plano <ArrowUpRight size={19} aria-hidden="true" /></button>
  </article>;
}

function FutureVision() {
  const [expanded, setExpanded] = useState(false);
  const future = useRef(null);
  useEffect(() => {
    const trigger = ScrollTrigger.create({ trigger: future.current, start: 'top 85%', once: true,
      onEnter: () => future.current?.setAttribute('data-flow-active', 'true') });
    return () => trigger.kill();
  }, []);
  return <section ref={future} className={styles.future} id="visao-futura" tabIndex={-1} aria-labelledby="future-title">
    <div className={styles.sectionHeading}>
      <h2 id="future-title">O futuro da gestão escolar começa com a prevenção.</h2>
      <p>Estamos explorando novas tecnologias para tornar o acompanhamento escolar mais eficiente, sem perder o olhar humano.</p>
    </div>
    <div className={styles.futureCard}>
      <div className={styles.flow} aria-hidden="true">
        <Camera /><span className={styles.flowLine} /><Cpu /><span className={styles.flowLine} /><UsersRound /><span className={styles.flowLine} /><ShieldCheck />
      </div>
      <button className={styles.futureToggle} type="button" aria-expanded={expanded} aria-controls="future-details" onClick={() => setExpanded(!expanded)}>
        <span className={styles.futureIntro}><span className={styles.futureBadge}>Em estudo</span><span className={styles.futureTitle}>Integração com câmeras e inteligência artificial</span><span>A pesquisa considera a privacidade de estudantes, a base legal para uso de imagens e a validação humana do registro de presença.</span></span>
        <span className={styles.expandLabel}>{expanded ? 'Recolher possibilidades' : 'Conhecer possibilidades'}<ChevronDown size={22} aria-hidden="true" /></span>
      </button>
      <div id="future-details" className={styles.futureDetails} hidden={!expanded}>
        <div className={styles.futurePossibilities}>
          <article><h3>01 — Monitoramento de presença</h3><p>Explorar a integração de câmeras com sistemas de registro de presença, visando apoiar a chamada escolar.</p></article>
          <article><h3>02 — Automatização da chamada</h3><p>Estudar mecanismos de IA que auxiliem o registro da frequência, reduzindo tarefas manuais dos professores e exigindo validação humana.</p></article>
          <article><h3>03 — Identificação de ausências prolongadas</h3><p>Explorar formas de identificar possíveis períodos prolongados fora da sala de aula para auxiliar o acompanhamento escolar, com salvaguardas de privacidade.</p></article>
        </div>
        <div className={styles.safeguards}><ShieldCheck size={24} aria-hidden="true" /><div><h3>Tecnologia a serviço do cuidado</h3><p>Qualquer implementação futura dependerá de avaliação jurídica e técnica: LGPD, proteção dos dados de crianças e adolescentes, segurança, necessidade e proporcionalidade do tratamento de imagens, transparência e supervisão humana.</p><p>Reconhecimento facial e vigilância individual não são pressupostos da solução. Esta página não acessa câmeras, não coleta imagens e não realiza reconhecimento facial.</p></div></div>
      </div>
    </div>
  </section>;
}

export default function CommercialSection() {
  const root = useRef(null);
  const [students, setStudents] = useState('100');
  const [plan, setPlan] = useState('annual');
  const [modal, setModal] = useState(null);
  const selectedFeature = modal?.type === 'feature' ? features.find((feature) => feature.id === modal.id) : null;
  const openContact = () => setModal({ type: 'contact' });
  const close = () => setModal(null);
  const calculatorProps = { students, onStudentsChange: setStudents, plan, onPlanChange: setPlan, onContact: openContact };

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(root.current.querySelectorAll('[data-plan]'), {
        y: 24, opacity: 0.65, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: root.current.querySelector('[data-plan]'), start: 'top 88%', once: true },
        clearProps: 'transform,opacity',
      });
    }, root);
    return () => media.revert();
  }, []);

  return <div ref={root} className={styles.commercial} data-local-content>
    <section className={styles.plans} id="modelo-de-negocio" tabIndex={-1} aria-labelledby="plans-title">
      <div className={styles.sectionHeading}>
        <h2 id="plans-title">Planos para instituições de ensino</h2>
        <p>Compare o valor fixo da plataforma e o custo por aluno. As duas modalidades incluem os mesmos recursos.</p>
      </div>
      <div className={styles.planGrid} aria-label="Planos Permaneo" id="planos">
        {Object.keys(PLANS).map((key) => <PlanCard key={key} plan={key} onSelect={(value) => { setPlan(value); setModal({ type: 'plan' }); }} />)}
      </div>
      <div className={styles.planFootnote}><p>Para 100 alunos, o anual representa <strong>{money(sample.savings)} de economia em 12 meses.</strong></p><button type="button" className={styles.textButton} onClick={() => scrollToCommercial('calculadora-investimento')}>Simular investimento <ArrowDown size={18} aria-hidden="true" /></button></div>
    </section>

    <section id="calculadora-investimento" className={styles.calculatorSection} tabIndex={-1} aria-label="Calculadora de investimento"><InvestmentCalculator {...calculatorProps} /></section>

    <section id="funcionalidades-incluidas" className={styles.features} tabIndex={-1} aria-labelledby="features-title">
      <div className={styles.sectionHeading}><h2 id="features-title">Recursos da plataforma</h2><p>Veja o que já pode ser experimentado na demonstração e o que está planejado.</p></div>
      <div className={styles.featureGrid}>
        {features.map(({ id, icon: Icon, title, status, summary }) => <button key={id} type="button" className={styles.featureCard} onClick={() => setModal({ type: 'feature', id })}>
          <span className={styles.featureTop}><Icon size={25} aria-hidden="true" /><ArrowUpRight size={18} aria-hidden="true" /></span>
          <strong>{title}</strong><span>{summary}</span><span className={styles.featureStatus}>{status}</span>
        </button>)}
      </div>
      <p className={styles.availability}>O produto apresentado é demonstrativo. A disponibilidade em produção e as integrações serão confirmadas na proposta comercial. Nenhum recurso em estudo é cobrado nesta simulação.</p>
    </section>

    <FutureVision />

    <section id="contato-comercial" tabIndex={-1} className={styles.contact} aria-labelledby="contact-title"><div><h2 id="contact-title">Proposta para sua escola</h2><p>Prepare um resumo com os dados da instituição e a modalidade desejada para baixar e compartilhar.</p></div><button className={styles.primary} type="button" onClick={openContact}>Solicitar proposta <ArrowRight size={20} aria-hidden="true" /></button></section>

    {modal && <CommercialDialog key={modal.type} title={modal.type === 'plan' ? PLANS[plan].name : modal.type === 'contact' ? 'Solicitar proposta' : selectedFeature.title} onClose={close}>
      {modal.type === 'plan' && <div className={styles.planDetails}>
        <p>{PLANS[plan].term}. Contratação por instituição (B2B/B2G), com os mesmos recursos essenciais nas duas modalidades.</p>
        <div className={styles.modalPrices}><p>Plataforma<strong>{money(PLANS[plan].fixed)}<small>/mês</small></strong></p><p>Por estudante<strong>{money(PLANS[plan].student)}<small>/mês</small></strong></p></div>
        {plan === 'annual' && <p>{money(PLANS.annual.fixed * 12)} pela plataforma ao ano + {money(PLANS.annual.student * 12)} por estudante ao ano. Economia anual de {money((PLANS.monthly.fixed - PLANS.annual.fixed) * 12)} na plataforma + {money((PLANS.monthly.student - PLANS.annual.student) * 12)} por estudante, comparada a 12 meses do mensal.</p>}
        <h3>Benefícios incluídos nos dois planos</h3>
        <ul className={styles.benefitList}>{features.map((feature) => <li key={feature.id}>{feature.title} <span>· {feature.status}</span></li>)}</ul>
        <InvestmentCalculator {...calculatorProps} compact />
        <p className={styles.contract}>{plan === 'annual' ? 'Contrato de 12 meses. Os preços mensais exibidos são equivalentes mensais; a forma de pagamento será acordada na proposta.' : 'Modalidade mensal sem fidelidade. A projeção de 12 meses é apenas comparativa e não representa compromisso anual.'} O total reúne a plataforma e os alunos da instituição. Disponibilidade dos recursos e condições contratuais serão confirmadas na proposta. A simulação não realiza contratação ou cobrança.</p>
        <button className={styles.primary} type="button" onClick={openContact}>Solicitar proposta <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>}
      {modal.type === 'contact' && <ProposalForm students={students} plan={plan} />}
      {selectedFeature && <div className={styles.featureDetails}>
        <span className={styles.featureStatus}>{selectedFeature.status}</span><p>{selectedFeature.summary}</p><p>{selectedFeature.detail}</p>
        {selectedFeature.preview && <figure><img src={`${import.meta.env.BASE_URL}previews/${selectedFeature.preview}.webp`} width="1440" height="1000" alt={`Prévia real de ${selectedFeature.title.toLowerCase()} na demonstração do Permaneo`} /><figcaption>Interface da demonstração atual. Todos os dados são fictícios.</figcaption></figure>}
        <a className={styles.secondary} href={`#/${selectedFeature.route}`}>Abrir demonstração <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>}
    </CommercialDialog>}
  </div>;
}
