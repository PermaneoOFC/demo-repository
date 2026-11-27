import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { browserServer } from './browser-server.mjs';

const server = await browserServer(4178);
let browser;
try {
  browser = await chromium.launch({ headless: true });
  await mkdir('public/previews', { recursive: true });
  for (const [name, route, heading] of [
    ['profile-director', 'director', 'Visão geral da escola'],
    ['profile-teacher', 'teacherRoom', 'Minha Sala'],
    ['profile-student', 'student', 'Meu dia'],
  ]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', colorScheme: 'light', deviceScaleFactor: 1 });
    try {
      await context.route(/userway|vlibras/, route => route.abort());
      const page = await context.newPage();
      await page.goto(server.baseURL + '/#/' + route, { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: heading, exact: true }).first().waitFor();
      await page.locator('[data-app-shell]').waitFor();
      await page.evaluate(async () => {
        for (const img of document.images) img.loading = 'eager';
        await document.fonts.ready;
      });
      await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
      await page.screenshot({ path: 'public/previews/' + name + '.png', animations: 'disabled' });
    } finally { await context.close(); }
  }
} finally {
  await browser?.close();
  await server.close();
}
