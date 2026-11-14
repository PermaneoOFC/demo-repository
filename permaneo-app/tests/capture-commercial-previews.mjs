import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const baseURL = process.env.BASE_URL || 'http://localhost:5173';
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  await page.route(/userway|vlibras/, (route) => route.abort());
  await mkdir('public/previews', { recursive: true });
  for (const route of ['director', 'carometroManagement', 'studentCalendar']) {
    await page.goto(baseURL + '/#/' + route, { waitUntil: 'domcontentloaded' });
    if (route === 'director') await page.getByText('Painel da escola', { exact: true }).last().waitFor();
    if (route === 'carometroManagement') await page.locator('[data-name="Carômetro · Gestão · Claro"]').waitFor();
    if (route === 'studentCalendar') await page.getByRole('heading', { name: 'Calendário escolar', exact: true }).waitFor();
    await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: 'public/previews/' + route + '.webp', type: 'webp' });
  }
} finally {
  await browser.close();
}

