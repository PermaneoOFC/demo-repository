import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, HeartHandshake, Linkedin, X } from 'lucide-react';
import './AboutTeam.css';

const technologies = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Git/GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
];

const members = [
  {
    id: 'joao', name: 'João Victor Torres Pereira', photo: '/images/equipe/joao.webp',
    role: 'Product Owner / Vendas', specialty: 'Back-end',
    highlights: 'APIs, lógica de servidor e desenvolvimento back-end',
    responsibilities: 'Priorização do produto, participação em vendas e desenvolvimento de APIs e lógica de servidor do Permaneo.',
    related: [],
    linkedin: 'https://br.linkedin.com/in/jo%C3%A3o-victortorrespereira',
  },
  {
    id: 'gabriel', name: 'Gabriel Rodrigues Gomes', photo: '/images/equipe/gabriel.webp',
    role: 'Documentarista / IA', specialty: 'Front-end & Inteligência Artificial',
    highlights: 'React, JavaScript, interfaces e IA',
    responsibilities: 'Desenvolvimento de interfaces, documentação do projeto e iniciativas de inteligência artificial no Permaneo.',
    related: ['React', 'JavaScript'],
    linkedin: 'https://br.linkedin.com/in/gabriel-rodrigues-rgg',
  },
  {
    id: 'iago', name: 'Iago Santos', photo: '/images/equipe/iago.webp',
    role: 'Desenvolvedor / IA', specialty: 'Front-end & Inteligência Artificial',
    highlights: 'React, JavaScript, interfaces e IA',
    responsibilities: 'Desenvolvimento de interfaces e funcionalidades de inteligência artificial no Permaneo.',
    related: ['React', 'JavaScript'],
    linkedin: 'https://www.linkedin.com/in/iagosm-oliveira/',
  },
  {
    id: 'caique', name: 'Caique Vinicius', photo: '/images/equipe/caique.webp',
    role: 'Scrum Master / Financeiro', specialty: 'Desenvolvimento & Gestão',
    highlights: 'Desenvolvimento, Scrum e gestão financeira',
    responsibilities: 'Desenvolvimento do projeto, organização das entregas com Scrum e gestão financeira do Permaneo.',
    related: [],
    linkedin: 'https://www.linkedin.com/in/caique-vinicius-5150b643b/',
  },
  {
    id: 'diego', name: 'Diego Armando', photo: '/images/equipe/diego.webp',
    role: 'Desenvolvedor / Financeiro', specialty: 'Desenvolvimento',
    highlights: 'Programação, implementação e financeiro',
    responsibilities: 'Programação e implementação de funcionalidades, com participação nas atividades financeiras do Permaneo.',
    related: [],
    linkedin: 'https://www.linkedin.com/in/diego-armando-698142316/',
  },
];

function TechList({ only }) {
  return <div className="tech-list">
    {technologies.filter((tech) => !only || only.includes(tech.name)).map((tech) =>
      <span className="tech-symbol" key={tech.name} tabIndex={0} title={tech.name} aria-label={tech.name}>
        <img src={tech.icon} alt={tech.name} width="20" height="20" loading="lazy" />
      </span>
    )}
  </div>;
}

function TeamModal({ member, onClose, theme }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!member) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const modal = document.getElementById('permaneo-team-modal');
        if (!modal) return;
        const elements = [...modal.querySelectorAll('a[href],button:not([disabled])')];
        if (!elements.length) return;
        if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); elements[elements.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) { event.preventDefault(); elements[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [member, onClose]);
  if (!member) return null;
  return createPortal(
    <div className="team-modal-overlay" data-team-theme={theme} onClick={(event) => { event.stopPropagation(); if (event.target === event.currentTarget) onClose(); }}>
      <div id="permaneo-team-modal" className="team-modal" role="dialog" aria-modal="true" aria-labelledby="team-modal-title" aria-describedby="team-modal-description" onMouseDown={(event) => event.stopPropagation()}>
        <img src={member.photo} alt={'Foto de ' + member.name} className="team-modal-photo" width="800" height="800" />
        <div className="team-modal-body">
          <h2 className="team-modal-name" id="team-modal-title">{member.name}</h2>
          <p className="team-modal-role">{member.role}</p>
          <span className="team-specialty"><Code2 aria-hidden="true" />{member.specialty}</span>
          <h3>Responsabilidades no Permaneo</h3>
          <p id="team-modal-description">{member.responsibilities}</p>
          <h3>Destaques</h3><p>{member.highlights}</p>
          {member.related.length > 0 && <><h3>Tecnologias relacionadas</h3><TechList only={member.related} /></>}
          <h3>Stack compartilhada do projeto</h3><TechList />
          <a className="team-modal-link" href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" size={17} /> Ver LinkedIn <ArrowUpRight size={16} /></a>
        </div>
        <button ref={closeRef} className="team-modal-close" onClick={onClose} aria-label="Fechar perfil"><X size={19} /></button>
      </div>
    </div>,
    document.body
  );
}

function TeamCard({ member, index, onSelect }) {
  return <article className="team-card">
    <div className="team-photo-wrap">
      <img className="team-photo" src={member.photo} alt={'Foto de ' + member.name} width="350" height="350" loading="lazy" />
      <span className="team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="team-card-body">
      <h3 className="team-name">{member.name}</h3>
      <p className="team-role">{member.role}</p>
      <span className="team-specialty"><Code2 aria-hidden="true" />{member.specialty}</span>
      <p className="team-details">{member.highlights}</p>
      <div className="team-stack">
        <span className="team-stack-label">Stack do projeto</span>
        <TechList />
      </div>
      <div className="team-card-actions">
        <button type="button" className="team-profile-button" onClick={() => onSelect(member)}>
          Conhecer integrante <ArrowUpRight size={14} aria-hidden="true" />
        </button>
        <a className="team-linkedin" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={'LinkedIn de ' + member.name}><Linkedin size={19} /></a>
      </div>
    </div>
  </article>;
}

export default function AboutTeam({ theme = 'light' }) {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const carouselRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const getMaxIndex = () => members.length - (window.matchMedia('(max-width: 640px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3);
  const getSlides = () => carouselRef.current?.querySelectorAll('.team-slide') || [];
  const moveTo = (index) => {
    const element = carouselRef.current;
    if (!element) return;
    const next = Math.max(0, Math.min(getMaxIndex(), index));
    const slide = getSlides()[next];
    if (!slide) return;
    const left = slide.getBoundingClientRect().left - getSlides()[0].getBoundingClientRect().left;
    element.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    activeRef.current = next;
    setActive(next);
  };
  const onScroll = () => {
    const element = carouselRef.current;
    const slides = getSlides();
    if (!element || slides.length < 2) return;
    const step = slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
    if (step > 0) {
      const next = Math.min(getMaxIndex(), Math.max(0, Math.round(element.scrollLeft / step)));
      activeRef.current = next;
      setActive(next);
    }
  };
  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return undefined;
    const observer = new ResizeObserver(() => {
      const slides = getSlides();
      if (!slides.length) return;
      const next = Math.min(activeRef.current, getMaxIndex());
      element.scrollLeft = slides[next].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
      activeRef.current = next;
      setActive(next);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragRef.current = { id: event.pointerId, x: event.clientX, left: event.currentTarget.scrollLeft, dragging: false };
  };
  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!drag.dragging && Math.abs(distance) < 6) return;
    if (!drag.dragging) {
      drag.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add('is-dragging');
    }
    event.preventDefault();
    event.currentTarget.scrollLeft = drag.left - distance;
  };
  const onPointerEnd = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.dragging) {
      suppressClickRef.current = true;
      event.currentTarget.classList.remove('is-dragging');
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      window.setTimeout(() => { suppressClickRef.current = false; }, 100);
    }
    dragRef.current = null;
  };
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      moveTo(event.key === 'Home' ? 0 : event.key === 'End' ? getMaxIndex() : active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  };
  return <section id="equipe" className="team-section" data-team-theme={theme} aria-labelledby="team-heading">
    <div className="team-eyebrow team-reveal">Nossa equipe</div>
    <div className="team-heading-row team-reveal">
      <div>
        <h2 id="team-heading" className="team-heading">As pessoas por trás<br />do <span>Permaneo.</span></h2>
        <p className="team-subtitle">Diferentes habilidades, um mesmo propósito: transformar tecnologia em oportunidades para que mais estudantes continuem suas trajetórias.</p>
      </div>
      <div className="team-count"><strong>05</strong><span>pessoas,<br />um propósito.</span></div>
    </div>
    <div className="team-divider team-reveal" />
    <div ref={carouselRef} className="team-carousel" role="region" tabIndex={0} aria-roledescription="carrossel" aria-label="Integrantes da equipe" onScroll={onScroll} onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onDragStart={(event) => event.preventDefault()} onClickCapture={(event) => { if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation(); suppressClickRef.current = false; } }}>
      <div className="team-grid">
        {members.map((member, index) =>
          <div className="team-slide team-reveal" key={member.id}><TeamCard member={member} index={index} onSelect={setSelected} /></div>
        )}
      </div>
    </div>
    <div className="team-carousel-controls">
      <div className="team-dots">{members.map((member, index) =>
        <button key={member.id} type="button" className="team-dot" aria-label={'Mostrar ' + member.name} aria-current={active === index} onClick={() => moveTo(index)} />
      )}</div>
      <div className="team-arrows">
        <button type="button" aria-label="Integrante anterior" disabled={active === 0} onClick={() => moveTo(active - 1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label="Próximo integrante" disabled={active >= getMaxIndex()} onClick={() => moveTo(active + 1)}><ArrowRight size={18} /></button>
      </div>
    </div>
    <div className="team-bottom"><HeartHandshake aria-hidden="true" size={17} /><span>Construindo oportunidades, juntos.</span></div>
    <TeamModal member={selected} onClose={() => setSelected(null)} theme={theme} />
  </section>;
}
