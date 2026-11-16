import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173';
const baseline = process.argv.includes('--baseline');
const errors = [];
const failures = [];
const routes = ['home','login','director','directorFollowup','directorNotifications','reports','directorSettings','teacher','teacherFollowup','teacherNotifications','teacherSettings','student','studentSpace','carometroManagement','carometroTeacher'];
routes.push('studentActivities','studentCalendar','studentSubjects','studentNotices','studentPlan','studentSupport');
for (const name of ['Lucas','Camila','Isabela','Eduardo','Yasmin','Livia']) routes.push(`Profile${name}Management`, `Profile${name}Teacher`);
routes.push('ProfileAnaBeatrizManagement', 'ProfileHeitorManagement');
const selectedRoutes = process.env.ROUTES ? process.env.ROUTES.split(',') : routes;
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', error => errors.push(error.message));
try {
  for (const width of [1440, 900, 390]) {
  await page.setViewportSize({width, height: 1000});
  for (const dark of [false, true]) {
  await page.goto(baseURL);
  await page.evaluate(dark => localStorage.setItem('permaneo-theme', dark ? 'dark' : 'light'), dark);
  await page.reload();
  for (const route of (baseline ? ['home','director','teacher','student','carometroManagement','reports'] : selectedRoutes)) {
    await page.goto(`${baseURL}/#${route}`);
    await page.getByText('Carregando Permaneo', { exact: false }).waitFor({ state: 'hidden' });
    await page.waitForTimeout(800);
    const result = await page.evaluate(() => ({
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
      heading: document.body.innerText.slice(0, 100),
      cta: (() => { const e = document.querySelector('[data-name="CTA / Acessar"]'); return e && getComputedStyle(e).backgroundColor; })(),
      grid: (() => { const e = document.querySelector('[data-name="Indicadores"]'); return e && getComputedStyle(e).display; })(),
    }));
    if (['home','director','student'].includes(route)) await page.screenshot({ path: `test-results/${baseline ? 'before' : 'after'}-${route}-${width}-${dark ? 'dark' : 'light'}.png`, fullPage: true });
    if (!baseline) {
      assert.equal(result.brokenImages.length, 0, `${route}: broken images`);
      if (result.scrollWidth > result.width + 1) failures.push(`${width} ${route}: horizontal overflow ${result.scrollWidth}`);
      if (route === 'home') assert.ok(result.cta && result.cta !== 'rgba(0, 0, 0, 0)', 'styled homepage CTA');
      if (route === 'director') assert.equal(result.grid, 'grid');
    }
  }
  console.log(`Checked ${width}px, ${dark ? 'dark' : 'light'}: ${selectedRoutes.length} routes`);
  }
  }
  console.log('Layout failures:', failures);
  assert.deepEqual(failures, [], 'layout regressions');
  assert.deepEqual(errors, [], 'browser errors');
} finally {
  await browser.close();
}
