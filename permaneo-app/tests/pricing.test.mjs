import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimateInvestment, money, PLANS } from '../src/pages/Landing/commercial/pricing.js';

test('preços e compromissos anuais correspondem ao briefing', () => {
  assert.equal(PLANS.monthly.fixed, 24900);
  assert.equal(PLANS.monthly.student, 670);
  assert.equal(PLANS.annual.fixed * 12, 252000);
  assert.equal(PLANS.annual.student * 12, 7080);
  assert.equal((PLANS.monthly.fixed - PLANS.annual.fixed) * 12, 46800);
  assert.equal((PLANS.monthly.student - PLANS.annual.student) * 12, 960);
});
test('uma escola com 100 alunos tem os totais exatos e economia de R$ 1.428', () => {
  assert.deepEqual(estimateInvestment('100'), {
    status: 'priced', students: 100, monthly: 91900, annualEquivalent: 80000,
    monthlyYear: 1102800, annualYear: 960000, savings: 142800,
  });
});
test('limites de 1 e 1.000 alunos', () => {
  assert.equal(estimateInvestment(1).monthly, 25570);
  assert.equal(estimateInvestment(1).annualEquivalent, 21590);
  assert.equal(estimateInvestment(1000).monthly, 694900);
  assert.equal(estimateInvestment(1000).annualEquivalent, 611000);
  assert.equal(estimateInvestment(1000).savings, 1006800);
});
test('toda a faixa pública calcula em centavos sem arredondamentos acumulados', () => {
  for (let students = 1; students <= 1000; students++) {
    const result = estimateInvestment(students);
    assert.equal(result.monthly, 24900 + 670 * students);
    assert.equal(result.annualEquivalent, 21000 + 590 * students);
    assert.equal(result.monthlyYear, result.monthly * 12);
    assert.equal(result.annualYear, result.annualEquivalent * 12);
    assert.equal(result.savings, 46800 + 960 * students);
    assert.equal(result.monthlyYear - result.annualYear, result.savings);
    assert.ok(Object.values(result).filter(v => typeof v === 'number').every(Number.isSafeInteger));
  }
});
test('acima de 1.000 alunos retorna apenas atendimento sob medida, sem preços', () => {
  for (const students of [1001, 10000, Number.MAX_SAFE_INTEGER]) {
    assert.deepEqual(estimateInvestment(students), { status: 'custom', students });
  }
});
test('rejeita entradas vazias, não inteiras, não positivas e não seguras', () => {
  for (const value of ['', ' ', 0, -1, '1.5', '1,5', 'abc', '1e3', NaN, Infinity, null, undefined, Number.MAX_SAFE_INTEGER + 1]) {
    assert.deepEqual(estimateInvestment(value), { status: 'invalid' }, String(value));
  }
});
test('moeda brasileira preserva vírgula, milhar e centavos', () => {
  assert.equal(money(670).replace(/\s/g, ' '), 'R$ 6,70');
  assert.equal(money(252000).replace(/\s/g, ' '), 'R$ 2.520,00');
});
