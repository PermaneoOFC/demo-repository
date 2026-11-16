import { useState } from 'react';
import schoolGif from '../../images/hero-school.gif';
import schoolPhoto from '../../images/school-0.jpg';
import styles from './SchoolJourney.module.css';

const steps = [
  ['Perceber o sinal', 'Três faltas em Matemática', 'No exemplo, uma estudante faltou a três aulas de Matemática e continuou presente nas demais disciplinas.'],
  ['Entender o contexto', 'Conferir datas e disciplinas', 'A professora consulta os registros por aula antes de conversar com a estudante.'],
  ['Combinar o apoio', 'Definir quem acompanha', 'Nesta simulação, a coordenação combina uma conversa e marca uma data para retomar o assunto.'],
  ['Rever a evolução', 'Consultar os próximos registros', 'Na revisão, a equipe confere se a estudante voltou às aulas e decide se precisa ajustar o apoio.'],
];

export function SchoolMedia({ className }) {
  const [playing, setPlaying] = useState(() =>
    !window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  );
  return <>
    <img alt="" className={className} src={playing ? schoolGif : schoolPhoto} />
    <button type="button" className={styles.mediaToggle} data-local-content onClick={() => setPlaying(!playing)}>
      {playing ? 'Pausar animação' : 'Reproduzir animação'}
    </button>
  </>;
}

export default function SchoolJourney() {
  const [active, setActive] = useState(0);
  const [, title, description] = steps[active];
  return (
    <section className={styles.journey} aria-labelledby="school-journey-title" data-local-content>
      <h2 id="school-journey-title">Da falta registrada ao apoio</h2>
      <p>Experimente um caso fictício de acompanhamento escolar.</p>
      <div className={styles.layout}>
        <div className={styles.controls} role="group" aria-label="Etapas do acompanhamento">
          {steps.map(([label], index) => (
            <button type="button" key={label} aria-controls="school-journey-example"
              aria-pressed={active === index} onClick={() => setActive(index)}>
              {index + 1}. {label}
            </button>
          ))}
        </div>
        <div className={styles.example} id="school-journey-example" aria-live="polite">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
