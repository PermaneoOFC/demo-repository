import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';

const server = await createServer({ server: { host: '127.0.0.1', port: 5181, strictPort: true } });
await server.listen();
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(20000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const visit = async (route) => {
    console.log('Checking student flow:', route);
    await page.goto('http://127.0.0.1:5181/#' + route);
    await page.getByRole('heading', { level: 1 }).waitFor();
  };
  await page.goto('http://127.0.0.1:5181/#login');
  await page.getByRole('link', {name: 'Acessar área do aluno (demonstração)', exact: true}).click();
  await expect(page.getByRole('heading', {name: 'Meu dia', exact: true})).toBeVisible();
  await page.getByRole('link', {name: 'Atividades', exact: true}).click();
  await page.goBack();
  await expect(page.getByRole('heading', {name: 'Meu dia', exact: true})).toBeVisible();
  await visit('student');
  await page.getByRole('link', { name: 'Atividades', exact: true }).click();
  await page
    .getByRole('button', { name: 'Abrir atividade: Revisão de frações', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Entregar atividade demonstrativa' })
  ).toBeDisabled();
  await page.getByLabel('Sua resposta', { exact: true }).fill('   ');
  await expect(
    page.getByRole('button', { name: 'Entregar atividade demonstrativa' })
  ).toBeDisabled();
  await page
    .getByLabel('Sua resposta', { exact: true })
    .fill('1/2 + 1/4 = 3/4; 2/3 − 1/6 = 1/2. Usei o denominador comum.');
  await page.getByRole('button', { name: 'Entregar atividade demonstrativa' }).click();
  await expect(page.getByRole('status')).toContainText('Atividade entregue');
  await page.reload();
  await page.getByLabel('Situação', { exact: true }).selectOption('Entregues');
  await expect(
    page.getByRole('button', { name: 'Ver resposta: Revisão de frações' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Ver resposta: Revisão de frações' }).click();
  await expect(
    page.getByText('1/2 + 1/4 = 3/4; 2/3 − 1/6 = 1/2. Usei o denominador comum.', { exact: true })
  ).toBeVisible();
  await page.getByLabel('Disciplina', { exact: true }).selectOption('Português');
  await expect(page.getByText('Nenhuma atividade com esses filtros.')).toBeVisible();
  await visit('student');
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '1');

  await visit('studentCalendar');
  const month = await page.getByRole('heading', { level: 2 }).first().textContent();
  await page.getByRole('button', { name: 'Próximo mês', exact: true }).click();
  assert.notEqual(await page.getByRole('heading', { level: 2 }).first().textContent(), month);
  await page.getByRole('button', { name: 'Mês anterior', exact: true }).click();
  await page.getByLabel('Tipo de evento').selectOption('Entrega');
  await page
    .getByRole('button', { name: /: [1-9]\d* eventos/ })
    .first()
    .click();
  await expect(page.getByRole('heading', { name: /Agenda de / })).toBeVisible();

  await visit('studentSubjects');
  await page.getByRole('button', { name: 'Material de revisão: Matemática' }).click();
  await expect(page.getByText(/Revise frações:/)).toBeVisible();
  await visit('studentPlan');
  await page.getByLabel('Nova meta').fill('Revisar frações por 20 minutos');
  await page.getByRole('button', { name: 'Adicionar meta' }).click();
  await page.getByRole('checkbox', { name: 'Revisar frações por 20 minutos' }).check();
  await page.reload();
  await expect(
    page.getByRole('checkbox', { name: 'Revisar frações por 20 minutos' })
  ).toBeChecked();
  await page.getByRole('button', { name: 'Excluir meta: Revisar frações por 20 minutos' }).click();
  await expect(page.getByRole('checkbox')).toHaveCount(0);

  await visit('studentNotices');
  await page
    .getByRole('button', { name: 'Marcar como lido: Organize sua semana', exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Marcar como não lido: Organize sua semana', exact: true })
  ).toHaveAttribute('aria-pressed', 'true');
  await visit('studentSupport');
  await page.getByLabel('Assunto', { exact: true }).selectOption('Frequência');
  await page
    .getByLabel('Como podemos ajudar?', { exact: true })
    .fill('Quero organizar minha rotina de estudos.');
  await page.getByRole('button', { name: 'Enviar pedido demonstrativo' }).click();
  await page.reload();
  await expect(
    page.getByText('Quero organizar minha rotina de estudos.', { exact: true })
  ).toBeVisible();
  await expect(page.getByText(/Ainda não há responsável/)).toBeVisible();

  fs.mkdirSync('test-results', { recursive: true });
  const routes = [
    'student',
    'studentActivities',
    'studentCalendar',
    'studentSubjects',
    'studentNotices',
    'studentPlan',
    'studentSupport',
    'studentSpace',
  ];
  for (const theme of ['light', 'dark']) {
    await page.evaluate((theme) => localStorage.setItem('permaneo-theme', theme), theme);
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        console.log('Checking layout:', route, theme, width);
        await page.goto('http://127.0.0.1:5181/#' + route);
        await page.reload();
        await page.locator('[data-app-shell]').waitFor();
        await page.waitForFunction(() => !document.body.innerText.includes('Carregando Permaneo'));
        await expect(
          page
            .getByRole('navigation', { name: 'Menu da plataforma' })
            .locator('[aria-current="page"]')
        ).toHaveCount(1);
        const size = await page.evaluate(() => ({
          view: innerWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        assert.ok(
          size.scroll <= size.view + 1,
          `${route} ${theme} ${width}: overflow ${size.scroll}`
        );
        if (['student', 'studentCalendar'].includes(route) && width !== 768) {
          await page.screenshot({
            path: `test-results/${route}-${theme}-${width}.png`,
            fullPage: true,
          });
        }
      }
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    'PASS: entregas, filtros, persistência, progresso, calendário, materiais, metas, avisos e apoio; 48 combinações de tela/tema/largura.'
  );
} finally {
  await browser?.close();
  await server.close();
}
