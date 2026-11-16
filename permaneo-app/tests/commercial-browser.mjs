import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:5173';
const capture = '../.impeccable/review';
await mkdir(capture, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [1440, 390]) {
    for (const dark of [false, true]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.route(/userway|vlibras/, (route) => route.abort());
      await page.goto(baseURL + '/#/home', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#modelo-de-negocio')).toBeVisible({ timeout: 30000 });
      if (dark) {
        await page.getByLabel('Ativar tema escuro', { exact: true }).click();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
        await expect(page.locator('[data-name^="01 · Home"][data-name*="Escuro"]')).toBeVisible({ timeout: 30000 });
        await expect(page.locator('#modelo-de-negocio')).toBeVisible();
      }
      await expect(page.locator('[data-plan]')).toHaveCount(2);
      await page.evaluate(() => document.fonts.ready);
      const prefix = `${width === 1440 ? 'desktop' : 'mobile'}${dark ? '-dark' : ''}`;
      for (const [id, suffix] of [['modelo-de-negocio', ''], ['calculadora-investimento', '-calculator'], ['funcionalidades-incluidas', '-features']]) {
        const section = page.locator('#' + id);
        await section.scrollIntoViewIfNeeded();
        await section.focus();
        await section.screenshot({ path: `${capture}/${prefix}${suffix}.png`, style: '.skip-link:not(:focus) { visibility: hidden; } [role="status"] { visibility: hidden; }' });
        const overflowing = await section.evaluate((element) => [...element.querySelectorAll('*')].filter(child => {
          const box = child.getBoundingClientRect();
          return box.width && (box.right > document.documentElement.clientWidth + 1 || box.left < -1);
        }).map(child => child.tagName));
        assert.deepEqual(overflowing, [], `${prefix}/${id}: no horizontal overflow`);
        assert.ok(await section.evaluate(el => el.scrollWidth <= el.clientWidth + 1), `${prefix}/${id}: content stays inside its section`);
      }
      const calculator = page.locator('#calculadora-investimento');
      await calculator.getByLabel('Quantidade de alunos', { exact: true }).fill('100');
      await expect(calculator).toContainText('R$ 800,00');
      await expect(calculator).toContainText('R$ 1.428,00');
      await calculator.getByRole('button', { name: 'Mensal', exact: true }).click();
      await expect(calculator.getByText('Custo mensal · Plano Mensal', { exact: true })).toBeVisible();
      await calculator.getByLabel('Quantidade de alunos', { exact: true }).fill('1001');
      await expect(calculator).toContainText('Uma proposta sob medida.');
      assert.ok(!/R\$/.test(await calculator.innerText()), 'No closed price above 1,000 students');
      await calculator.getByLabel('Quantidade de alunos', { exact: true }).fill('');
      await expect(calculator.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
      await calculator.getByRole('spinbutton').fill('1.5');
      await expect(calculator.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
      await calculator.getByRole('spinbutton').fill('100');
      const opener = page.locator('[data-plan="annual"]').getByRole('button', { name: 'Conhecer plano' });
      await opener.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { name: 'Plano Anual', exact: true })).toBeVisible();
      await expect(dialog.getByRole('spinbutton')).toHaveValue('100');
      await dialog.screenshot({ path: `${capture}/${prefix}-modal.png` });
      await dialog.getByRole('button', { name: 'Mensal', exact: true }).click();
      await expect(dialog.getByRole('heading', { name: 'Plano Mensal', exact: true })).toBeVisible();
      await expect(dialog).toContainText('Sem fidelidade');
      await dialog.getByRole('spinbutton').fill('200');
      await expect(dialog).toContainText('R$ 1.589,00');
      // Native dialog keeps keyboard focus inside and returns it to the opener.
      for (let index = 0; index < 12; index++) {
        await page.keyboard.press('Tab');
        assert.ok(await dialog.evaluate(el => el.contains(document.activeElement)), 'Modal traps focus');
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await expect(calculator.getByRole('spinbutton')).toHaveValue('200');
      await opener.click();
      await dialog.getByRole('button', { name: 'Solicitar proposta', exact: true }).click();
      await expect(dialog.getByRole('heading', { name: 'Solicitar proposta', exact: true })).toBeVisible();
      await dialog.getByRole('button', { name: 'Preparar solicitação' }).click();
      assert.equal(await dialog.locator('form').evaluate(el => el.checkValidity()), false);
      await expect(dialog.getByRole('status')).toHaveCount(0);
      await dialog.getByLabel('Instituição', { exact: true }).fill('Escola de teste');
      await dialog.getByLabel('Seu nome').fill('Pessoa de teste');
      await dialog.getByLabel('E-mail de contato').fill('invalido');
      assert.equal(await dialog.locator('form').evaluate(el => el.checkValidity()), false);
      await dialog.getByLabel('E-mail de contato').fill('teste@example.com');
      await dialog.getByRole('button', { name: 'Preparar solicitação' }).click();
      await expect(dialog.getByRole('status')).toContainText('Nada foi enviado');
      await dialog.screenshot({ path: `${capture}/${prefix}-proposal.png` });
      const downloadEvent = page.waitForEvent('download');
      await dialog.getByRole('button', { name: 'Baixar resumo' }).click();
      assert.equal((await downloadEvent).suggestedFilename(), 'solicitacao-permaneo.txt');
      await page.keyboard.press('Escape');
      const featureButtons = page.locator('#funcionalidades-incluidas button');
      for (let index = 0; index < 8; index++) {
        await featureButtons.nth(index).click();
        await expect(dialog).toBeVisible();
        const image = dialog.locator('img');
        if (await image.count()) await expect(image).toHaveJSProperty('naturalWidth', 1440);
        await page.keyboard.press('Escape');
      }
      const future = page.locator('#visao-futura');
      await future.getByRole('button').click();
      await expect(future.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
      await expect(future).toContainText('LGPD');
      await future.screenshot({ path: `${capture}/${prefix}-future.png` });
      await future.getByRole('button').click();
      await expect(page.locator('#future-details')).toBeHidden();
      await page.locator('[data-name="Menu"]').getByRole('button', { name: 'Planos', exact: true }).click();
      await expect(page).toHaveURL(/#\/home$/);
      await expect(page.locator('#modelo-de-negocio')).toBeFocused();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, 'No page overflow');
      assert.deepEqual(errors, [], `${prefix}: no runtime errors`);
      console.log(`PASS ${prefix}: pricing, thresholds, modal, keyboard, proposal, 8 features, future, navigation, overflow`);
      await context.close();
    }
  }
  // Regular motion path: GSAP initializes and content remains visible after entering view.
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await page.route(/userway|vlibras/, route => route.abort());
  await page.goto(baseURL + '/#/home', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-plan="monthly"]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-plan="monthly"]')).toHaveCSS('opacity', '1');
  console.log('PASS regular motion: GSAP scroll entrance completes');
} finally {
  await browser.close();
}
