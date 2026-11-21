import { useId } from 'react';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { estimateInvestment, money, PLANS } from './pricing.js';
import styles from './CommercialSection.module.css';

export function PlanSwitch({ plan, onChange }) {
  return <div className={styles.planSwitch} role="group" aria-label="Modalidade de contratação">
    <button type="button" aria-pressed={plan === 'monthly'} onClick={() => onChange('monthly')}>Mensal</button>
    <button type="button" aria-pressed={plan === 'annual'} onClick={() => onChange('annual')}>Anual</button>
  </div>;
}

export default function InvestmentCalculator({ students, onStudentsChange, plan, onPlanChange, onContact, compact = false }) {
  const id = useId();
  const estimate = estimateInvestment(students);
  const invalid = estimate.status === 'invalid';
  const annual = plan === 'annual';
  return <div className={`${styles.calculator} ${compact ? styles.compact : ''}`}>
    <div className={styles.calculatorControls}>
      <h3>{compact ? 'Sua simulação' : 'Quanto sua escola investiria?'}</h3>
      <p>Informe o número de alunos e encontre a modalidade que faz sentido para sua instituição.</p>
      <label htmlFor={id}>Quantidade de alunos</label>
      <input id={id} type="number" inputMode="numeric" min="1" step="1" value={students}
        aria-invalid={invalid} aria-describedby={`${id}-hint`}
        onChange={(event) => onStudentsChange(event.target.value)} />
      <p id={`${id}-hint`} className={invalid ? styles.error : styles.small}>
        {invalid ? 'Informe uma quantidade inteira de alunos, a partir de 1.' : 'Acima de 1.000 alunos, preparamos uma proposta sob medida.'}
      </p>
      <PlanSwitch plan={plan} onChange={onPlanChange} />
    </div>
    <div className={styles.calculatorResult} aria-live="polite" aria-atomic="true">
      {invalid ? <p>Preencha a quantidade de alunos para ver sua estimativa.</p> : estimate.status === 'custom' ? <div className={styles.custom}>
        <Building2 size={32} aria-hidden="true" />
        <h3>Uma escola maior. Uma proposta sob medida.</h3>
        <p>Para mais de 1.000 alunos, vamos entender a sua instituição antes de definir o investimento.</p>
        <button type="button" className={styles.primary} onClick={onContact}>Contato comercial <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div> : <>
        <p>{annual ? 'Custo mensal equivalente · Plano Anual' : 'Custo mensal · Plano Mensal'}</p>
        <p className={styles.resultPrice}>{money(annual ? estimate.annualEquivalent : estimate.monthly)}<span>/mês</span></p>
        <p className={styles.breakdown}>{money(PLANS[plan].fixed)} de plataforma + {students} × {money(PLANS[plan].student)} por aluno</p>
        <dl className={styles.totals}>
          <div><dt>Total estimado em 12 meses</dt><dd>{money(annual ? estimate.annualYear : estimate.monthlyYear)}</dd></div>
        </dl>
        <table className={styles.comparison}>
          <caption>Compare as modalidades</caption>
          <thead><tr><th scope="col">Plano</th><th scope="col">Por mês</th><th scope="col">Em 12 meses</th></tr></thead>
          <tbody>
            <tr aria-selected={!annual}><th scope="row">Mensal</th><td>{money(estimate.monthly)}</td><td>{money(estimate.monthlyYear)}</td></tr>
            <tr aria-selected={annual}><th scope="row">Anual</th><td>{money(estimate.annualEquivalent)}</td><td>{money(estimate.annualYear)}</td></tr>
          </tbody>
        </table>
        <p className={styles.savings}>Economia no plano anual <strong>{money(estimate.savings)} por ano</strong></p>
        <p className={styles.small}>Estimativa em reais por instituição. No anual, o valor mensal é equivalente a um contrato de 12 meses; as condições de pagamento serão definidas na proposta.</p>
      </>}
    </div>
  </div>;
}
