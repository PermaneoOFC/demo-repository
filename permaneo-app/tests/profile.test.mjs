import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { browserServer } from './browser-server.mjs';
import { demoStudents } from '../src/data/students.js';
import { getStudentProfile } from '../src/data/studentProfiles.js';

for (const student of demoStudents) {
  const profile = getStudentProfile(student.key);
  assert.equal(profile.months.reduce((sum, month) => sum + month.present, 0), profile.attendance);
  assert.equal(profile.attendance + profile.absences, profile.totalLessons);
}

const { baseURL, close } = await browserServer(5179);
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const tab = (name) => page.getByRole('tab', { name, exact: true });
  const panel = page.getByRole('tabpanel');
  const note = 'Teste de acompanhamento: combinar revisão na próxima aula.';
  async function visit(route, theme = 'light') {
    await page.goto(baseURL);
    await page.evaluate((theme) => localStorage.setItem('permaneo-theme', theme), theme);
    await page.goto(baseURL + '/#/' + route);
    await page.reload();
    await expect(tab('Visão geral')).toBeVisible();
  }

  await visit('ProfileLucasTeacher');
  await expect(page.getByRole('heading', { name: 'Lucas Gomes', exact: true })).toBeVisible();
  await tab('Frequência').click();
  await expect(panel.getByText('Chamadas registradas')).toBeVisible();
  await expect(panel.locator('[data-status="ausente"]')).toHaveCount(2);
  await expect(panel.locator('[data-status="justificada"]')).toHaveCount(1);
  await tab('Desempenho').click();
  await expect(panel.getByText('História', { exact: true })).toBeVisible();
  await tab('Desempenho').focus();
  await page.keyboard.press('ArrowRight');
  const observations = page.getByRole('tab', { name: /^Observações/ });
  await expect(observations).toBeFocused();
  await expect(observations).toHaveAttribute('aria-selected', 'true');

  await panel.getByRole('button', { name: 'Nova observação' }).click();
  const dialog = page.getByRole('dialog', { name: 'Adicionar observação' });
  await dialog.getByLabel('Assunto').fill('Revisão de teste');
  await dialog.getByLabel('Descrição').fill(note);
  await dialog.getByRole('button', { name: 'Salvar observação' }).click();
  await expect(panel.getByText('Revisão de teste', { exact: true })).toBeVisible();
  await page.reload();
  await tab('Histórico').click();
  const saved = panel.getByRole('listitem').filter({ hasText: 'Revisão de teste' });
  await saved.getByText('Consultar contexto').click();
  await expect(saved.getByText(note, { exact: true })).toBeVisible();

  await visit('ProfileCamilaTeacher');
  await page.getByRole('tab', { name: /^Observações/ }).click();
  await expect(panel.getByText('Revisão de teste', { exact: true })).toHaveCount(0);
  await visit('ProfileLucasManagement');
  await expect(page.getByRole('button', { name: 'Iniciar acompanhamento' }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Voltar ao Carômetro', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Carômetro', exact: true })).toBeVisible();

  for (const theme of ['light', 'dark']) for (const width of [390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await visit('ProfileLucasTeacher', theme);
    for (const name of [/^Frequência$/, /^Desempenho$/, /^Histórico$/, /^Observações/, /^Acompanhamento$/]) {
      await tab(name).click();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), String(name) + ' at ' + width);
    }
    await tab('Frequência').click();
    await page.screenshot({ path: 'test-results/profile-' + theme + '-' + width + '.png', fullPage: true });
  }
  assert.deepEqual(errors, []);
  console.log('PASS: profile tabs, keyboard, history, persistent observations, student isolation, totals and responsive layout.');
} finally {
  await browser?.close();
  await close();
}
