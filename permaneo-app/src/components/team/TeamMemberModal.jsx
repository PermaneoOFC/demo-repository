import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Code2, Linkedin, ArrowUpRight, X } from 'lucide-react';
import { TechList } from './TeamCard.jsx';
import { members } from './team-data.js';
import { memberIndex, PAGE_HALF_MS } from './team-motion.js';

export function TeamMemberModal({ theme, initialIndex, reducedMotion, onClose, onRestoreFocus }) {
  const [index, setIndex] = useState(initialIndex);
  const [phase, setPhase] = useState("idle");
  const [direction, setDirection] = useState(1);
  const closeRef = useRef(null);
  const timers = useRef([]);
  const locked = useRef(false);
  const member = members[index];
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const dialogRef = useRef(null);
  const restoreFocus = useRef(onRestoreFocus);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      restoreFocus.current();
    };
  }, []);
  const turn = (delta) => {
    if (locked.current) return;
    if (reducedMotion) { setIndex(value => memberIndex(value + delta)); return; }
    locked.current = true; setDirection(delta); setPhase("out");
    timers.current = [setTimeout(() => { setIndex(value => memberIndex(value + delta)); setPhase("in"); }, PAGE_HALF_MS),
      setTimeout(() => { setPhase("idle"); locked.current = false; }, PAGE_HALF_MS * 2)];
  };
  return createPortal(
    <dialog ref={dialogRef} className="team-modal-overlay" data-team-theme={theme}
      aria-labelledby="team-book-title" aria-describedby="team-book-description"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          turn(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
    <div className="team-book" data-reduced-motion={reducedMotion} data-turn={phase} data-direction={direction}>
    <div className="team-book-spread">
      <div className="team-book-left">
        <div className="team-book-masthead"><span>Permaneo / Pessoas</span><span>0{index + 1}</span></div>
        <img src={member.photo} alt={member.name} className="team-book-photo" width={800} height={800} />
        <div className="team-book-identity">
          <h2 id="team-book-title" className="team-book-name">{member.name}</h2>
          <p id="team-book-description" className="team-book-role">{member.role}</p>
          <span className="team-specialty"><Code2 aria-hidden="true" />{member.specialty}</span>
          <a className="team-book-link" href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /> Ver LinkedIn <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="team-book-right">
        <div className="team-book-chapter">Nossa equipe / 0{index + 1}</div>
        <h2>Sobre o integrante</h2>
        <p className="team-book-intro">{member.highlights}.</p>
        <h3>Responsabilidades no Permaneo</h3><p>{member.responsibilities}</p>
        <h3>Área de atuação</h3><p>{member.specialty}</p>
        {member.related.length > 0 && <><h3>Tecnologias relacionadas</h3><TechList only={member.related} /></>}
        <h3>Stack compartilhada do projeto</h3><TechList />
        <div className="team-book-return"><button type="button" onClick={onClose}><ArrowLeft aria-hidden="true" /> Voltar ao tambor</button></div>
      </div>
    </div>
    <div className="team-book-footer">
      <button type="button" onClick={() => turn(-1)} aria-label="Integrante anterior no livro" aria-disabled={phase !== "idle"}><ArrowLeft aria-hidden="true" /> Anterior</button>
      <span className="team-book-page" aria-live="polite" aria-atomic="true">0{index + 1} / 05<span className="sr-only">: {member.name}</span></span>
      <button type="button" onClick={() => turn(1)} aria-label="Próximo integrante no livro" aria-disabled={phase !== "idle"}>Próximo <ArrowRight aria-hidden="true" /></button>
    </div>
    <button type="button" ref={closeRef} onClick={onClose} className="team-book-close" aria-label="Fechar perfil"><X aria-hidden="true" /></button>
  </div>
    </dialog>, document.body
  );
}
