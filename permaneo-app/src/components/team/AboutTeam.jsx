import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TeamCard } from "./TeamCard";
import { members as teamMembers } from "./team-data.js";
import "./AboutTeam.css";
import { memberIndex, nearestPosition, POSITION_ANGLE, TEAM_POSITIONS, snapPosition, wheelIntent } from "./team-motion.js";

export default function AboutTeam({ theme = "light" }) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stage = useRef(null);
  const rotor = useRef(null);
  const position = useRef(0);
  const target = useRef(0);
  const animation = useRef(0);
  const activeRef = useRef(0);
  const suppressClick = useRef(false);
  const wheelTime = useRef(-Infinity);
  const drag = useRef(null);

  const paint = useCallback((value) => {
    position.current = value;
    rotor.current?.style.setProperty("--drum-angle", `${-value * POSITION_ANGLE}deg`);
    const index = memberIndex(value);
    if (activeRef.current !== index) { activeRef.current = index; setActive(index); }
  }, []);

  const settle = useCallback((value) => {
    cancelAnimationFrame(animation.current);
    target.current = value;
    if (reducedMotion) { paint(value); return; }
    let last = 0;
    const step = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      const gap = target.current - position.current;
      if (Math.abs(gap) < 0.0015) { paint(target.current); return; }
      paint(position.current + gap * (1 - Math.exp(-14 * dt)));
      animation.current = requestAnimationFrame(step);
    };
    animation.current = requestAnimationFrame(step);
  }, [paint, reducedMotion]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update(); preference.addEventListener("change", update);
    return () => { preference.removeEventListener("change", update); cancelAnimationFrame(animation.current); };
  }, []);
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const wheel = (event) => {
      if (event.ctrlKey || !wheelIntent(event.deltaX, event.deltaY, event.shiftKey)) return;
      event.preventDefault();
      if (Math.abs(event.deltaX || event.deltaY) < 12 || performance.now() - wheelTime.current < 550) return;
      wheelTime.current = performance.now();
      settle(target.current + Math.sign(event.deltaX || event.deltaY));
    };
    node.addEventListener("wheel", wheel, { passive: false });
    return () => node.removeEventListener("wheel", wheel);
  }, [settle]);

  const endDrag = (cancelled = false) => {
    const current = drag.current;
    if (!current) return;
    drag.current = null;
    stage.current?.removeAttribute("data-dragging");
    if (current.horizontal) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 80);
      const moved = Math.abs(position.current - current.start) > 0.04;
      const velocity = performance.now() - current.time < 120 ? current.velocity : 0;
      settle(cancelled && !moved ? Math.round(position.current) : snapPosition(position.current, velocity));
    }
  };

  return (
    <>
      <section id="equipe" tabIndex={-1} data-team-theme={theme} className="team-section" aria-labelledby="team-heading">
        <div className="team-heading-row team-reveal">
          <div>
            <h2 id="team-heading" className="team-heading">A equipe do <span>Permaneo</span></h2>
            <p className="team-subtitle">Escolha uma foto para conhecer a contribuição de cada integrante.</p>
          </div>
        </div>
        <div className="team-divider team-reveal" />
        <div className="team-portraits" role="group" aria-label="Selecionar integrante">
          {teamMembers.map((member, index) => <button key={member.id} type="button" aria-label={`Mostrar ${member.name}`}
            aria-pressed={active === index} onClick={() => settle(nearestPosition(Math.round(target.current), index))}>
            <img src={member.photo} alt="" width="64" height="64" loading="lazy" />
            <span>{member.name.split(' ')[0]}</span>
          </button>)}
        </div>
        <div className="team-drum-region" data-reduced-motion={reducedMotion}>
          <div ref={stage} className="team-drum-stage" role="region" tabIndex={0} aria-label="Integrantes da equipe" aria-roledescription="roda de perfis" data-scene-ready="true"
            onKeyDown={event => {
              suppressClick.current = false;
              if (event.altKey || event.ctrlKey || event.metaKey) return;
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); settle(target.current + (event.key === "ArrowRight" ? 1 : -1)); }
            }}
            onPointerDown={event => {
              if ((event.pointerType === "mouse" && event.button !== 0) || (event.target instanceof Element && event.target.closest("a, button"))) return;
              suppressClick.current = false;
              drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, start: position.current, last: position.current, time: performance.now(), velocity: 0, horizontal: false };
            }}
            onPointerMove={event => {
              const current = drag.current;
              if (!current || current.id !== event.pointerId) return;
              const dx = event.clientX - current.x;
              const dy = event.clientY - current.y;
              if (!current.horizontal) {
                if (Math.abs(dy) > Math.abs(dx) * 1.25 && Math.abs(dy) > 10) { drag.current = null; return; }
                if (Math.abs(dx) < 6) return;
                current.horizontal = true;
                cancelAnimationFrame(animation.current);
                event.currentTarget.setPointerCapture?.(event.pointerId);
                event.currentTarget.setAttribute("data-dragging", "true");
              }
              const stepWidth = Math.max(150, Math.min(240, event.currentTarget.clientWidth * 0.42));
              const value = current.start - dx / stepWidth;
              const now = performance.now();
              current.velocity = (value - current.last) / Math.max(1, now - current.time);
              current.time = now; current.last = value;
              paint(value);
            }}
            onPointerUp={() => endDrag()} onPointerCancel={() => endDrag(true)} onLostPointerCapture={() => endDrag(true)}>
            <div ref={rotor} className="team-drum-rotor">
              {teamMembers.map((member, index) => <div className="team-drum-face" key={member.id} data-index={index} data-distance={(index - active + TEAM_POSITIONS) % TEAM_POSITIONS} data-active={active === index} aria-hidden={active !== index}
                onClick={(event) => {
                  if (suppressClick.current) { suppressClick.current = false; return; }
                  if (event.target instanceof Element && event.target.closest("a, button")) return;
                  if (active !== index) settle(nearestPosition(Math.round(target.current), index));
                }}>
                <TeamCard member={member} index={index} active={active === index} />
              </div>)}
            </div>
          </div>
          <div className="team-drum-controls">
            <button type="button" aria-label="Integrante anterior" onClick={() => settle(target.current - 1)}><ArrowLeft /></button>
            <div className="team-drum-pagination">
              <span className="team-drum-counter" aria-hidden="true">0{active + 1}<span> / 05</span></span>
            </div>
            <button type="button" aria-label="Próximo integrante" onClick={() => settle(target.current + 1)}><ArrowRight /></button>
          </div>
          <p className="sr-only" role="status" aria-live="polite">{active + 1} de 5: {teamMembers[active]?.name}</p>
        </div>
      </section>
    </>
  );
}
