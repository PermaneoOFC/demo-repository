import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';

const server = await createServer({ server: { host: '127.0.0.1', port: 5183, strictPort: true } });
await server.listen();
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const home = 'http://127.0.0.1:5183/#/home';

  await page.goto(home);
  await expect(page.getByRole('heading', { name: /Toda trajetória merece continuar/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Conhecer na prática' })).toBeVisible();
  await page.getByRole('button', { name: 'Para quem' }).first().click();
  await expect(page.locator('#perfis')).toBeInViewport();
  assert.ok((await page.url()).includes('#/home'), 'Scrolling does not break HashRouter');
  await page.getByRole('button', { name: 'Professores' }).click();
  await expect(page.getByRole('button', { name: 'Professores' })).toHaveAttribute('aria-pressed','true');
  await page.getByRole('link', { name: 'Explorar este perfil' }).click();
  await expect(page).toHaveURL(/#\/teacher$/);

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(home);
    await expect(page.getByRole('heading', { name: /Toda trajetória merece continuar/ })).toBeVisible();
    const widthInfo = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(widthInfo.scroll <= widthInfo.viewport + 1, 'No horizontal overflow at ' + width);
    await expect.poll(() => page.locator('img[src*="school-0"]').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    if (width <= 768) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      await expect(page.getByRole('navigation', { name: 'Navegação para celular' })).toBeVisible();
      await page.getByRole('navigation', { name: 'Navegação para celular' }).getByRole('button', { name: 'Como funciona' }).click();
      await expect(page.locator('#como-funciona')).toBeInViewport();
      assert.ok((await page.url()).includes('#/home'), 'Mobile navigation keeps the current route');
    }
  }

  await page.goto(home);
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
  await page.getByRole('button', { name: 'Ativar tema claro' }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('light');
  assert.deepEqual(errors, []);
  console.log('PASS: landing navigation, roles, image, light/dark mode and 390/768/1440 layouts');
} finally {
  await browser?.close();
  await server.close();
}
