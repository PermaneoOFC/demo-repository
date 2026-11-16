import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';

const server = await createServer({ server: { host: '127.0.0.1', port: 5185, strictPort: true } });
await server.listen();
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 980 } });
  const errors = [];
  const requests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => { if (new URL(request.url()).pathname.startsWith('/api/')) requests.push(request.url()); });
  const base = 'http://127.0.0.1:5185/#/';
  await page.goto(base + 'login');
  await page.getByRole('radio', { name: /Professor/ }).click();
  await page.getByRole('button', { name: 'Explorar sem preencher' }).click();
  await expect(page.getByRole('heading', { name: 'Minhas Turmas', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Minha Sala/ })).toHaveCount(0);

  await page.getByRole('button', { name: 'Realizar chamada' }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Realizar chamada' });
  await expect(dialog.locator('[aria-pressed="true"]')).toHaveCount(0);
  const attendanceButtons = [
    dialog.getByRole('button', { name: 'Lucas Gomes: Presente' }),
    dialog.getByRole('button', { name: 'Camila Rocha: Falta justificada' }),
  ];
  for (const control of attendanceButtons) await expect(control).toHaveAttribute('aria-pressed', 'false');
  await attendanceButtons[0].click();
  await dialog.getByRole('button', { name: 'Camila Rocha: Falta justificada' }).click();
  const reviewButton = dialog.getByRole('button', { name: /Revisar chamada · 2\/2/ });
  await expect(reviewButton).toBeEnabled();
  await reviewButton.click();
  const review = page.getByRole('dialog', { name: 'Revisar chamada' });
  await expect(review).toContainText('Lucas Gomes');
  await expect(review).toContainText('Camila Rocha');
  await expect(review).toContainText('Falta justificada');
  await review.getByRole('button', { name: 'Confirmar e salvar' }).click();
  await expect(dialog.getByRole('status')).toContainText('Chamada salva com sucesso');
  await page.getByRole('button', { name: 'Concluir' }).click();

  await page.getByRole('button', { name: 'Realizar chamada' }).first().click();
  const reopened = page.getByRole('dialog', { name: 'Realizar chamada' });
  await expect(reopened.getByText(/chamadas anteriores/i)).toBeVisible();
  await expect(reopened.getByText(/registros concluídos/).first()).toBeVisible();
  await reopened.getByRole('button', { name: 'Fechar chamada' }).click();

  await page.getByRole('link', { name: 'Abrir sala virtual 9º A' }).click();
  await expect(page.getByRole('heading', { name: 'Turma 9º A' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Fazer chamada|Realizar chamada/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Lucas Gomes', exact: true }).click();
  await page.getByRole('dialog', { name: 'Lucas Gomes' }).getByRole('button', { name: 'Ver perfil completo' }).click();
  await expect(page.getByRole('heading', { name: 'Lucas Gomes', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Frequência' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Chamadas registradas');
  await expect(page.getByRole('tabpanel')).toContainText('Presente');

  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 850 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `profile fits ${width}px`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(requests, [], 'local demonstration does not make API requests');
  console.log('PASS: calls in Minhas Turmas, manual attendance, review, history, profile frequency integration, and responsive layouts.');
} finally {
  await browser?.close();
  await server.close();
}
