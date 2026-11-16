import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, ClipboardCheck, MessageCircle, Pause, Play, TriangleAlert } from 'lucide-react';
import schoolVideo from '../../images/hero-school.mp4';
import schoolPhoto from '../../images/school-0.jpg';
import styles from './SchoolJourney.module.css';

const steps = [
  { label: 'Perceber o sinal', title: 'Três faltas em Matemática', description: 'A professora identifica a repetição de faltas em uma disciplina.', icon: TriangleAlert, facts: [['Disciplina', 'Matemática'], ['Faltas registradas', '3 aulas']] },
  { label: 'Entender o contexto', title: 'Conferir datas e disciplinas', description: 'A professora consulta os registros antes de conversar com a estudante.', icon: ClipboardCheck, facts: [['Outras disciplinas', 'Presença registrada'], ['Próximo passo', 'Escutar a estudante']] },
  { label: 'Combinar o apoio', title: 'Definir quem acompanha', description: 'A coordenação combina uma conversa e define quando retomar o assunto.', icon: MessageCircle, facts: [['Responsável', 'Coordenação'], ['Retorno', 'Na próxima semana']] },
  { label: 'Rever a evolução', title: 'Consultar os próximos registros', description: 'A equipe verifica o retorno às aulas e decide se precisa ajustar o apoio.', icon: CalendarCheck, facts: [['Últimas duas aulas', 'Presença registrada'], ['Apoio', 'Retorno combinado']] },
];

export function SchoolMedia({ className }) {
  const video = useRef(null);
  const [source, setSource] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData) {
      setSource(schoolVideo);
    }
  }, []);
  return <figure className={styles.media}>
    <video ref={video} className={className} src={source || undefined} poster={schoolPhoto} width="720" height="404"
      autoPlay={Boolean(source)} muted loop playsInline aria-hidden="true"
      onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { setSource(null); setFailed(true); setPlaying(false); }} />
    {!failed && <button type="button" className={styles.mediaToggle}
      aria-label={playing ? 'Pausar animação' : 'Reproduzir animação'}
      onClick={() => {
        if (!source) setSource(schoolVideo);
        else if (playing) video.current.pause();
        else video.current.play().catch(() => {});
      }}>{playing ? <Pause size={19} /> : <Play size={19} />}</button>}
    <figcaption>Cenas ilustrativas do cotidiano escolar.</figcaption>
  </figure>;
}

export default function SchoolJourney() {
  const [active, setActive] = useState(0);
  const { title, description, icon: Icon, facts } = steps[active];
  return (
    <section id="como-funciona" tabIndex={-1} className={styles.journey} aria-labelledby="school-journey-title" data-local-content>
      <h2 id="school-journey-title">Da falta registrada ao apoio</h2>
      <p>Experimente um caso fictício de acompanhamento escolar.</p>
      <div className={styles.layout}>
        <div className={styles.controls} role="group" aria-label="Etapas do acompanhamento">
          {steps.map(({ label }, index) => (
            <button type="button" key={label} aria-controls="school-journey-example"
              aria-pressed={active === index} onClick={() => setActive(index)}>
              {index + 1}. {label}
            </button>
          ))}
        </div>
        <div className={styles.example} id="school-journey-example" aria-live="polite">
          <Icon size={27} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
          <dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </div>
    </section>
  );
}
