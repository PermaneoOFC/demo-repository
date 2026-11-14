import { useId, useState } from 'react';
import { Download } from 'lucide-react';
import { estimateInvestment, money, PLANS } from './pricing.js';
import styles from './CommercialSection.module.css';

export default function ProposalForm({ students, plan }) {
  const id = useId();
  const [summary, setSummary] = useState('');
  function prepare(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const estimate = estimateInvestment(data.get('students'));
    const investment = estimate.status === 'priced'
      ? `${money(plan === 'annual' ? estimate.annualEquivalent : estimate.monthly)}/mês${plan === 'annual' ? ' (equivalente mensal)' : ''}`
      : 'Sob medida, sem preço definido';
    setSummary(`Solicitação de proposta · Permaneo\nInstituição: ${data.get('school').trim()}\nResponsável: ${data.get('name').trim()}\nE-mail: ${data.get('email').trim()}\nAlunos: ${data.get('students')}\nModalidade: ${PLANS[plan].name}\nInvestimento estimado: ${investment}\n\nResumo preparado localmente. Não enviado. Não constitui contratação.`);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'solicitacao-permaneo.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <form className={styles.proposalForm} onSubmit={prepare} onChange={() => setSummary('')}>
    <p>Prepare uma solicitação para sua instituição. O canal de envio comercial ainda não está configurado: este formulário não envia nem armazena seus dados.</p>
    <div className={styles.formFields}>
      <label htmlFor={`${id}-school`}>Instituição<input id={`${id}-school`} name="school" required maxLength={160} pattern=".*\S.*" autoComplete="organization" /></label>
      <label htmlFor={`${id}-name`}>Seu nome<input id={`${id}-name`} name="name" required maxLength={120} pattern=".*\S.*" autoComplete="name" /></label>
      <label htmlFor={`${id}-email`}>E-mail de contato<input id={`${id}-email`} name="email" required type="email" maxLength={254} autoComplete="email" /></label>
      <label htmlFor={`${id}-students`}>Quantidade de alunos<input id={`${id}-students`} name="students" required type="number" min="1" max="9007199254740991" step="1" defaultValue={estimateInvestment(students).status === 'invalid' ? '' : students} /></label>
    </div>
    <p><strong>{PLANS[plan].name}</strong> · {PLANS[plan].term}. Contratação por instituição (B2B/B2G).</p>
    <button className={styles.primary} type="submit">Preparar solicitação</button>
    {summary && <div className={styles.prepared} role="status">
      <h3>Resumo preparado. Nada foi enviado.</h3>
      <p>Você pode baixar o resumo para encaminhá-lo quando o contato comercial estiver disponível.</p>
      <pre>{summary}</pre>
      <button className={styles.secondary} type="button" onClick={download}><Download size={18} aria-hidden="true" /> Baixar resumo</button>
    </div>}
  </form>;
}
