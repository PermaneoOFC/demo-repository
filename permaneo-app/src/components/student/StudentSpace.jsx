import StudentPortrait from '../students/StudentPortrait.jsx';
import { useState } from 'react';
import { Aperture, Mountain, Orbit, Waves } from 'lucide-react';
import styles from '../../pages/Dashboard/Estudante/StudentArea.module.css';

export const avatars = { Órbita: Orbit, Onda: Waves, Serra: Mountain, Prisma: Aperture };
export const widgets = {
  calendar: 'Meu calendário', attendance: 'Minha frequência', work: 'Próximas atividades',
  progress: 'Meu progresso', notices: 'Comunicados', goals: 'Minhas metas',
  grades: 'Últimas notas', subjects: 'Minhas matérias', support: 'Apoio',
};
export const defaultWidgets = ['work', 'calendar', 'attendance', 'progress', 'notices', 'goals', 'subjects', 'grades', 'support'];
export const defaultPreferences = {
  avatar: 'Órbita', accent: 'oceano', cover: 'horizonte', phrase: '',
  density: 'confortavel', scale: 'normal', motion: true, reminders: true,
  order: defaultWidgets, hidden: [], onboarded: false,
};

export function Avatar({ name, className = '' }) {
  const Icon = avatars[name] || Orbit;
  return <span className={styles.heroAvatar + ' ' + className}><StudentPortrait student={{ id: 'Camila', name: 'Camila Rocha' }} className={styles.heroPortrait} loading="eager" /><span className={styles.avatarBadge} title={`Símbolo pessoal: ${name}`}><Icon size={20} aria-hidden="true" /></span></span>;
}

export default function StudentSpace({ preferences, update, settings, onboarding, onFinish }) {
  const [draft, setDraft] = useState(preferences);
  const [step, setStep] = useState(0);
  const change = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }));
  const save = () => {
    update({ ...draft, onboarded: true });
    onFinish?.();
  };
  const move = (index, offset) => {
    const order = [...draft.order];
    [order[index], order[index + offset]] = [order[index + offset], order[index]];
    change('order', order);
  };
  const select = (label, key, options) => (
    <label>{label}<select value={draft[key]} onChange={(event) => change(key, event.target.value)}>
      {Object.entries(options).map(([value, name]) => <option value={value} key={value}>{name}</option>)}
    </select></label>
  );

  return <section className={styles.section} aria-label={onboarding ? 'Primeiros passos' : undefined}>
    {onboarding && <h2>{['Escolha seu avatar', 'Escolha seu visual', 'Organize o início', 'Explore o portal'][step]}</h2>}
    {(!settings && (!onboarding || step < 2)) && <>
      <div className={styles.hero} data-cover={draft.cover} data-accent={draft.accent}>
        <div><h2>Camila Rocha</h2><p>{draft.phrase || 'Seu espaço de aprendizagem'}</p></div>
        <Avatar name={draft.avatar} />
      </div>
      <div className={styles.card + ' ' + styles.form}>
        {(!onboarding || step === 0) && select('Avatar ilustrado', 'avatar', Object.fromEntries(Object.keys(avatars).map((name) => [name, name])))}
        {(!onboarding || step === 1) && <>
          {select('Cor de destaque', 'accent', { oceano: 'Oceano', floresta: 'Floresta', violeta: 'Violeta' })}
          {select('Capa', 'cover', { horizonte: 'Horizonte', ondas: 'Ondas', lisa: 'Lisa' })}
        </>}
        {!onboarding && <label>Frase privada do perfil<input maxLength={90} value={draft.phrase} onChange={(event) => change('phrase', event.target.value)} /></label>}
      </div>
    </>}
    {settings && <div className={styles.card + ' ' + styles.form}>
      {select('Tema da interface', 'theme', { light: 'Claro', dark: 'Escuro', auto: 'Automático' })}
      {select('Densidade', 'density', { confortavel: 'Confortável', compacto: 'Compacto' })}
      {select('Tamanho do texto', 'scale', { normal: 'Normal', grande: 'Grande' })}
      <label className={styles.check}><input type="checkbox" checked={draft.motion} onChange={(event) => change('motion', event.target.checked)} /> Permitir animações</label>
      <label className={styles.check}><input type="checkbox" checked={draft.reminders} onChange={(event) => change('reminders', event.target.checked)} /> Mostrar lembretes pessoais</label>
    </div>}
    {(!settings && (!onboarding || step === 2)) && <section className={styles.card}>
      <h2>Organização do início</h2>
      {draft.order.map((id, index) => <div className={styles.row} key={id}>
        <label className={styles.check}><input type="checkbox" checked={!draft.hidden.includes(id)} onChange={() => change('hidden', draft.hidden.includes(id) ? draft.hidden.filter((key) => key !== id) : [...draft.hidden, id])} />{widgets[id]}</label>
        <div className={styles.controls}>
          <button className={styles.secondary} disabled={index === 0} onClick={() => move(index, -1)} aria-label={'Subir ' + widgets[id]}>↑</button>
          <button className={styles.secondary} disabled={index === draft.order.length - 1} onClick={() => move(index, 1)} aria-label={'Descer ' + widgets[id]}>↓</button>
        </div>
      </div>)}
      <button className={styles.secondary} onClick={() => setDraft({ ...draft, order: defaultWidgets, hidden: [] })}>Restaurar organização padrão</button>
    </section>}
    {onboarding && step === 3 && <p>Use o Calendário para planejar sua semana, Minha Jornada para acompanhar seu progresso e Apoio quando precisar conversar.</p>}
    <div className={styles.controls}>
      {onboarding && step > 0 && <button className={styles.secondary} onClick={() => setStep(step - 1)}>Voltar</button>}
      {onboarding && step < 3
        ? <button className={styles.primary} onClick={() => setStep(step + 1)}>Continuar</button>
        : <button className={styles.primary} onClick={save}>{onboarding ? 'Concluir apresentação' : 'Salvar preferências'}</button>}
      {onboarding && <button className={styles.secondary} onClick={onFinish}>Pular apresentação</button>}
    </div>
  </section>;
}
