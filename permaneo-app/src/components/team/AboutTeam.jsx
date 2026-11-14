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
    id: 'gabriel', name: 'Gabriel Rodrigues Gomes', photo: '/images/equipe/gabriel.webp',
    role: 'Documentarista / IA', specialty: 'Front-end & Inteligência Artificial',
    highlights: 'React, JavaScript, interfaces e IA',
    responsibilities: 'Desenvolvimento de interfaces, documentação do projeto e iniciativas de inteligência artificial no Permaneo.',
    related: ['React', 'JavaScript'],
    linkedin: 'https://br.linkedin.com/in/gabriel-rodrigues-rgg',
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
  {
    id: 'iago', name: 'Iago Santos', photo: '/images/equipe/iago.webp',
    role: 'Desenvolvedor / IA', specialty: 'Front-end & Inteligência Artificial',
    highlights: 'React, JavaScript, interfaces e IA',
    responsibilities: 'Desenvolvimento de interfaces e funcionalidades de inteligência artificial no Permaneo.',
    related: ['React', 'JavaScript'],
    linkedin: 'https://www.linkedin.com/in/iagosm-oliveira/',
  },
  {
    id: 'joao', name: 'João Victor Torres Pereira', photo: '/images/equipe/joao.webp',
    role: 'Product Owner / Vendas', specialty: 'Back-end',
    highlights: 'APIs, lógica de servidor e desenvolvimento back-end',
    responsibilities: 'Priorização do produto, participação em vendas e desenvolvimento de APIs e lógica de servidor do Permaneo.',
    related: [],
    linkedin: 'https://br.linkedin.com/in/jo%C3%A3o-victortorrespereira',
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

function TeamModal({ member, onClose }) {
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
    <div className="team-modal-overlay" onMouseDown={onClose}>
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

export default function AboutTeam() {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(0);
  const carouselRef = useRef(null);
  const moveTo = (index) => {
    const element = carouselRef.current;
    if (!element) return;
    const slides = element.querySelectorAll('.team-slide');
    slides[Math.max(0, Math.min(slides.length - 1, index))]?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
    setActive(Math.max(0, Math.min(slides.length - 1, index)));
  };
  const onScroll = () => {
    const element = carouselRef.current;
    if (!element || window.innerWidth > 640) return;
    const step = element.querySelector('.team-slide')?.getBoundingClientRect().width || 1;
    setActive(Math.min(members.length - 1, Math.max(0, Math.round(element.scrollLeft / step))));
  };
  return <section id="equipe" className="team-section" aria-labelledby="team-heading">
    <div className="team-eyebrow team-reveal">Nossa equipe</div>
    <div className="team-heading-row team-reveal">
      <div>
        <h2 id="team-heading" className="team-heading">As pessoas por trás<br />do <span>Permaneo.</span></h2>
        <p className="team-subtitle">Diferentes habilidades, um mesmo propósito: transformar tecnologia em oportunidades para que mais estudantes continuem suas trajetórias.</p>
      </div>
      <div className="team-count"><strong>05</strong><span>pessoas,<br />um propósito.</span></div>
    </div>
    <div className="team-divider team-reveal" />
    <div ref={carouselRef} className="team-carousel" aria-label="Integrantes da equipe" onScroll={onScroll}>
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
        <button type="button" aria-label="Próximo integrante" disabled={active === members.length - 1} onClick={() => moveTo(active + 1)}><ArrowRight size={18} /></button>
      </div>
    </div>
    <div className="team-bottom"><HeartHandshake aria-hidden="true" size={17} /><span>Construindo oportunidades, juntos.</span></div>
    <TeamModal member={selected} onClose={() => setSelected(null)} />
  </section>;
}
