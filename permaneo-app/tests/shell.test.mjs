import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const server = await createServer({ server: { host: '127.0.0.1', port: 5178, strictPort: true } });
await server.listen();
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const routes = ['director', 'directorFollowup', 'directorNotifications', 'reports', 'directorSettings', 'teacher', 'teacherFollowup', 'teacherNotifications', 'teacherSettings', 'student', 'studentSpace', 'carometroManagement', 'carometroTeacher', 'ProfileLucasManagement', 'ProfileLucasTeacher'];
  async function visit(route, theme) {
    await page.goto('http://127.0.0.1:5178/');
    await page.evaluate(theme => localStorage.setItem('permaneo-theme', theme), theme);
    await page.goto('http://127.0.0.1:5178/#/' + route);
    await page.reload();
    await page.locator('[data-app-shell]').waitFor();
    await page.waitForFunction(() => !document.body.innerText.includes('Carregando Permaneo'));
    await page.evaluate(() => document.fonts.ready);
  }
  for (const theme of ['light', 'dark']) {
    for (const route of routes) {
      await visit(route, theme);
      assert.equal(await page.locator('header[data-shell-controls]:visible').count(), 1, route);
      const brand = page.getByRole('link', { name: 'Permaneo — painel inicial' });
      const image = brand.locator('img');
      const box = await image.boundingBox();
      assert.equal(box.width, 35, route);
      assert.ok(Math.abs(box.width / box.height - 40 / 31) < .01, route);
      await page.mouse.move(1400, 900);
      const links = page.getByRole('navigation', { name: 'Menu da plataforma' }).locator('a');
      assert.ok(await links.evaluateAll(items => items.every(link => getComputedStyle(link).textDecorationLine === 'none')));
      const active = page.getByRole('navigation', { name: 'Menu da plataforma' }).locator('a[aria-current="page"]');
      if (await active.count()) assert.equal(await active.evaluate(link => getComputedStyle(link).backgroundColor), 'rgba(0, 0, 0, 0)');
      await page.getByRole('button', { name: theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro', exact: true }).click();
      await page.waitForFunction(theme => document.documentElement.dataset.theme !== theme, theme);
      console.log('PASS shell', route, theme);
    }
  }
  for (const route of ['director', 'teacher', 'student']) {
    await visit(route, 'light');
    const nav = page.getByRole('navigation', { name: 'Menu da plataforma' });
    const hrefs = await nav.locator('a').evaluateAll(items => items.map(item => item.getAttribute('href')));
    for (const href of hrefs) {
      await nav.locator(`a[href="${href}"]`).click();
      await page.waitForURL(url => url.hash === href);
      await nav.locator(`a[href="${href}"][aria-current="page"]`).waitFor();
      assert.equal(await nav.locator('[aria-current="page"]').getAttribute('href'), href);
    }
    await page.getByRole('link', { name: 'Sair', exact: true }).click();
    await page.waitForURL('**/#/login');
  }
  await visit('carometroTeacher', 'light');
  await page.locator('[data-name="Ver perfil"]').first().click();
  await page.waitForURL('**/#/ProfileLucasTeacher');
  await page.getByRole('button', { name: 'Carômetro', exact: true }).click();
  await page.waitForURL('**/#/carometroTeacher');
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['director', 'teacher', 'student', 'carometroManagement']) {
      await visit(route, 'light');
      const size = await page.evaluate(() => ({ view: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert.ok(size.scroll <= size.view + 1, `${route} at ${width}: ${size.scroll}`);
    }
  }
  assert.deepEqual(errors, []);
  console.log('PASS navigation, theme switching and responsive layouts');
} finally {
  await browser?.close();
  await server.close();
}
