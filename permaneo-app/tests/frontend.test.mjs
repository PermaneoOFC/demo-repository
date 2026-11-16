import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';
import { demoStudents } from '../src/data/students.js';
import { getStudentProfile } from '../src/data/studentProfiles.js';

for (const student of demoStudents) {
  const profile = getStudentProfile(student.key);
  assert.equal(profile.attendance + profile.absences, profile.totalLessons, `${student.key} frequency total`);
}

const server = await createServer({ server: { host: '127.0.0.1', port: 5174, strictPort: true } });
await server.listen();
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const base = 'http://127.0.0.1:5174/#/';
  const openStudent = async (route = 'carometroTeacher') => {
    await page.goto(base + route);
    await page.getByRole('heading', { name: 'Carômetro', exact: true }).waitFor();
    await page.getByRole('button', { name: /Lucas Gomes/ }).first().click();
    await expect(page.getByRole('heading', { name: 'Lucas Gomes', exact: true })).toBeVisible();
  };

  await page.goto(base + 'carometroTeacher');
  await expect(page.getByRole('heading', { name: 'Carômetro', exact: true })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Modo de visualização' }).getByRole('button')).toHaveCount(3);
  for (const [label, mode] of [['Cartões', 'cards'], ['Lista', 'list'], ['Compacto', 'compact']]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator('[data-view]')).toHaveAttribute('data-view', mode);
  }
  await page.getByLabel('Buscar estudante').fill('Lucas');
  await expect(page.getByRole('button', { name: /Camila Rocha/ })).toHaveCount(0);
  await page.getByLabel('Buscar estudante').fill('');
  await page.getByLabel('Turma').selectOption('8º A');
  await expect(page.getByRole('button', { name: /Lucas Gomes/ })).toHaveCount(0);
  await page.getByLabel('Turma').selectOption('');
  await page.getByRole('button', { name: /Lucas Gomes/ }).first().click();
  await expect(page.getByRole('tab', { name: 'Visão geral' })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: 'Desempenho' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Matemática');
  await page.getByRole('tab', { name: 'Observações' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Acompanhamento' })).toBeFocused();
  await expect(page.getByRole('tab', { name: 'Acompanhamento' })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('button', { name: 'Voltar ao Carômetro' }).first().click();

  await openStudent();
  await page.getByRole('tab', { name: 'Observações' }).click();
  await page.getByRole('button', { name: 'Adicionar observação' }).first().click();
  const note = page.getByRole('dialog', { name: 'Adicionar observação' });
  await note.getByLabel('Categoria').selectOption('FREQUENCIA');
  await note.getByLabel('Assunto').fill('Conversa de acompanhamento');
  await note.getByLabel('Nível de atenção').selectOption('ACOMPANHAMENTO');
  await note.getByLabel('Descrição').fill('Combinamos uma conversa com a família e revisão das atividades.');
  await expect(note.locator('[name="visibilidade"] option[value="RESTRITA"]')).toHaveCount(0);
  await note.getByRole('button', { name: 'Salvar observação' }).click();
  await expect(page.getByText('Conversa de acompanhamento', { exact: true })).toBeVisible();

  await page.goto(base + 'carometroManagement');
  await page.getByRole('button', { name: /Lucas Gomes/ }).first().click();
  await page.getByRole('tab', { name: 'Observações' }).click();
  await page.getByRole('button', { name: 'Nova observação' }).click();
  const restricted = page.getByRole('dialog', { name: 'Adicionar observação' });
  await restricted.getByLabel('Categoria').selectOption('ACOMPANHAMENTO');
  await restricted.getByLabel('Assunto').fill('Registro reservado da coordenação');
  await restricted.getByLabel('Descrição').fill('Contexto restrito à equipe de direção e coordenação.');
  await restricted.getByLabel('Visibilidade').selectOption('RESTRITA');
  await restricted.getByRole('button', { name: 'Salvar observação' }).click();
  await expect(page.getByText('Registro reservado da coordenação', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Iniciar acompanhamento' }).first()).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + 'carometroManagement');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Carômetro mobile has no horizontal overflow');
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  assert.deepEqual(errors, []);
  console.log('PASS: Carômetro views, filters, profile tabs, observations, visibility, theme, and mobile layout.');
} finally {
  await browser?.close();
  await server.close();
}
