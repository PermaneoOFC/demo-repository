import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch({channel: 'chrome', headless: true});
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173';
try {
  for (const widgetsAvailable of [true, false]) {
    const context = await browser.newContext({viewport: {width: 1440, height: 1000}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    if (!widgetsAvailable) await page.route(/https:\/\/(?:cdn\.userway\.org|vlibras\.gov\.br)\//, route => route.abort());
    await page.goto(baseURL + '/#/home');
    await expect(page.getByRole('heading', {name: /Toda trajetória merece continuar/})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Conhecer na prática'})).toBeVisible();
    const hero = page.locator('img[src*="school-0"]');
    await expect(hero).toBeVisible();
    await expect.poll(() => hero.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    if (widgetsAvailable) {
      await expect(page.locator('#userwayAccessibilityIcon')).toBeVisible({timeout: 20000});
      await expect(page.locator('#vlibras-access-wrapper button')).toBeVisible({timeout: 20000});
      await page.locator('#userwayAccessibilityIcon').click();
      await expect(page.locator('iframe[title="UserWay Menu Acessibilidade"]')).toBeVisible({timeout: 20000});
      // Both launchers must remain present after the menu has been requested.
      await expect(page.locator('#userwayAccessibilityIcon')).toHaveCount(1);
      await page.keyboard.press('Escape');
      await page.reload();
      await expect(page.locator('#vlibras-access-wrapper button')).toBeVisible({timeout: 20000});
      await page.evaluate(() => document.addEventListener('load', event => {
        if (event.target instanceof HTMLScriptElement && event.target.src.includes('vlibras-plugin-app.js')) window.__vlibrasModuleLoaded = true;
      }, true));
      await page.locator('#vlibras-access-wrapper button').click();
      await page.waitForFunction(() => window.__vlibrasModuleLoaded, null, {timeout: 20000});
      await page.getByRole('button', {name: 'Fechar', exact: true}).click({timeout: 20000});
      await page.waitForFunction(() => JSON.parse(localStorage.getItem('@vlibras-widget') || '{}').state?.isOpen === false);
      assert.ok(await page.evaluate(() => !!window.VLibrasWidget), 'VLibras initialized');
      await page.reload();
    }
    // Enter each profile through the real login controls, without backend credentials.
    for (const [index, route] of ['director','teacher','student'].entries()) {
      await page.goto(baseURL + '/#/home');
      await page.getByRole('link', {name: 'Conhecer na prática'}).click();
      await expect(page.getByRole('radiogroup')).toBeVisible();
      await page.getByRole('radio').nth(index).click();
      await page.getByRole('button', {name: 'Explorar sem preencher', exact: true}).click();
      await expect(page).toHaveURL(new RegExp('#/?' + route + '$'));
      await expect(page.locator('[data-app-shell] aside')).toBeVisible();
      if (route === 'director') {
        await page.getByRole('navigation', {name: 'Menu da plataforma'}).getByRole('link', {name:'Carômetro',exact:true}).click();
        await expect(page).toHaveURL(/#\/?carometroManagement$/);
        await page.locator('[data-name^="Buscar por nome"]').click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.getByRole('button', {name: 'Fechar janela', exact: true}).click();
        await page.locator('[data-name="Ver perfil"]').first().click();
        await expect(page).toHaveURL(/#\/?ProfileLucasManagement$/);
      }
      if (route === 'student') {
        await page.getByRole('link', {name: 'Meu espaço', exact: true}).click();
        await expect(page).toHaveURL(/#\/?studentSpace$/);
      }
      if (widgetsAvailable) {
        await expect(page.locator('#permaneo-userway')).toHaveCount(1);
        await expect(page.locator('#permaneo-vlibras')).toHaveCount(1);
        await expect(page.locator('#vlibras-access-wrapper')).toHaveCount(1);
      }
    }
    assert.deepEqual(errors, [], 'No application errors');
    console.log(`PASS: login/navigation in three profiles, widgets ${widgetsAvailable ? 'available' : 'unavailable'}.`);
    await context.close();
  }
} finally {
  await browser.close();
}
