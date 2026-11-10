import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch({channel:'chrome',headless:true});
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173';
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({width,height:900});
    await page.goto(baseURL + '/#/login');
    const userway = page.locator('#userwayAccessibilityIcon');
    const vlibras = page.locator('#vlibras-access-wrapper button');
    await expect(userway).toBeVisible({timeout:20000});
    await expect(vlibras).toBeVisible({timeout:20000});
    await page.mouse.move(0,0);
    await page.waitForTimeout(600);
    const u = await userway.boundingBox(), v = await vlibras.boundingBox();
    console.log('Widget positions',width,{userway:u,vlibras:v});
    assert.ok(Math.abs((u.x+u.width/2)-(v.x+v.width/2))<=8,'launchers aligned at right');
    assert.ok(u.y>=v.y+v.height+8 && u.y<=v.y+v.height+24,'UserWay below VLibras with a gap');
    assert.ok(u.x>=0 && u.x+u.width<=width && u.y+u.height<900,'launcher inside viewport');
    await userway.click();
    await expect(page.locator('iframe[title="UserWay Menu Acessibilidade"]')).toBeVisible({timeout:20000});
    await page.keyboard.press('Escape');
    await page.reload();
    await page.getByRole('link',{name:'Acessar área do aluno (demonstração)',exact:true}).click();
    await expect(page.getByRole('heading',{name:'Meu dia',exact:true})).toBeVisible();
    await page.getByRole('link',{name:'Atividades',exact:true}).click();
    await expect(page.getByRole('heading',{name:'Minhas atividades',exact:true})).toBeVisible();
    await expect(page.locator('#permaneo-userway')).toHaveCount(1);
    await expect(page.locator('#permaneo-vlibras')).toHaveCount(1);
    await page.screenshot({path:`test-results/accessibility-${width}.png`,fullPage:true});
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: widget positioning, menu and navigation at desktop/mobile widths.');
} finally {
  await browser.close();
}
