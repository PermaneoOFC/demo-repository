import { ArrowUpRight, Code2, Linkedin } from 'lucide-react';
import { technologies } from './team-data.js';

export function TechList({ only }) {
  return <div className="tech-list">
    {technologies.filter((tech) => !only || only.includes(tech.name)).map((tech) =>
      <span className="tech-symbol" key={tech.name} title={tech.name} aria-label={tech.name}>
        <img src={tech.icon} alt={tech.name} width="20" height="20" loading="lazy" />
      </span>
    )}
  </div>;
}

export function TeamCard({ member, index, active, onSelect }) {
  return (
    <article className="team-card" onClick={() => onSelect(member)} aria-label={member.name}>
      <div className="team-photo-wrap">
        <img className="team-photo" src={member.photo} alt={member.name} width={800} height={800} loading="eager" draggable={false} />
        <span className="team-number" aria-hidden="true">0{index + 1}</span>
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
          <button type="button" className="team-profile-button" tabIndex={active ? 0 : -1} onClick={event => { event.stopPropagation(); onSelect(member); }} aria-label={`Conhecer ${member.name}`}>Clique para conhecer <ArrowUpRight aria-hidden="true" /></button>
          <a className="team-linkedin" tabIndex={active ? 0 : -1} href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${member.name}`} onClick={event => event.stopPropagation()}><Linkedin aria-hidden="true" /></a>
        </div>
      </div>
    </article>
  );
}
