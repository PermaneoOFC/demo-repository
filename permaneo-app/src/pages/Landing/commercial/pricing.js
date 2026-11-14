// Keep all arithmetic in integer centavos; format only at the presentation boundary.
export const PLANS = Object.freeze({
  monthly: Object.freeze({ name: 'Plano Mensal', fixed: 24900, student: 670, term: 'Sem fidelidade' }),
  annual: Object.freeze({ name: 'Plano Anual', fixed: 21000, student: 590, term: 'Contrato de 12 meses' }),
});

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const money = (centavos) => currency.format(centavos / 100);

export function estimateInvestment(value) {
  if (!/^[0-9]+$/.test(String(value))) return { status: 'invalid' };
  const students = Number(value);
  if (!Number.isSafeInteger(students) || students < 1) return { status: 'invalid' };
  // Deliberately return no prices, comparisons or savings above this threshold.
  if (students > 1000) return { status: 'custom', students };
  const monthly = PLANS.monthly.fixed + PLANS.monthly.student * students;
  const annualEquivalent = PLANS.annual.fixed + PLANS.annual.student * students;
  return {
    status: 'priced', students, monthly, annualEquivalent,
    monthlyYear: monthly * 12, annualYear: annualEquivalent * 12,
    savings: (monthly - annualEquivalent) * 12,
  };
}
