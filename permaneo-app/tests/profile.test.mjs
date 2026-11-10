import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';
import { getStudentProfile } from '../src/data/studentProfiles.js';
for (const key of ['Lucas','Camila','Isabela','Eduardo','Yasmin','Livia','AnaBeatriz','Heitor']) {
  const profile = getStudentProfile(key);
  assert.equal(profile.months.reduce((sum, row) => sum + row.present, 0), profile.attendance);
  assert.equal(profile.attendance + profile.absences, profile.totalLessons);
}
const server = await createServer({ server: { host: '127.0.0.1', port: 5179, strictPort: true } });
await server.listen();
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  async function visit(route, theme='light') {
    await page.goto('http://127.0.0.1:5179/');
    await page.evaluate(theme=>localStorage.setItem('permaneo-theme',theme),theme);
    await page.goto('http://127.0.0.1:5179/#/'+route); await page.reload();
    await page.getByRole('tab', {name:'Frequência e faltas',exact:true}).waitFor();
  }
  const tab = name => page.getByRole('tab',{name,exact:true});
  await visit('ProfileLucasTeacher');
  await expect(page.getByRole('heading',{name:'Lucas Gomes',exact:true})).toBeVisible();
  assert.equal(await page.getByRole('tabpanel').locator('tbody tr').count(),10);
  await page.getByLabel('Exibir',{exact:true}).selectOption('absent');
  assert.equal(await page.getByRole('tabpanel').locator('tbody tr').count(),3);
  await tab('Notas').click();
  assert.equal(await page.getByRole('tabpanel').locator('tbody tr').count(),5);
  await expect(page.getByText('O 4º bimestre ainda não foi lançado.',{exact:false})).toBeVisible();
  await tab('Notas').focus(); await page.keyboard.press('ArrowRight');
  await expect(tab('Histórico')).toBeFocused();
  await expect(tab('Histórico')).toHaveAttribute('aria-selected','true');
  await tab('Observações').click();
  await page.getByLabel('Observação',{exact:true}).fill('Teste de acompanhamento: combinar revisão na próxima aula.');
  await page.getByRole('button',{name:'Salvar observação',exact:true}).click();
  await expect(page.getByRole('status')).toContainText('Observação salva');
  await page.reload(); await tab('Observações').click();
  await expect(page.getByText('Teste de acompanhamento: combinar revisão na próxima aula.',{exact:true})).toBeVisible();
  await visit('ProfileCamilaTeacher'); await tab('Observações').click();
  assert.equal(await page.getByText('Teste de acompanhamento: combinar revisão na próxima aula.',{exact:true}).count(),0);
  await visit('ProfileLucasTeacher');
  await page.getByRole('button',{name:'Registrar acompanhamento',exact:true}).click();
  await page.getByLabel('Registro de acompanhamento',{exact:true}).fill('Retorno de teste com o estudante.');
  await page.getByLabel('Próximo retorno',{exact:true}).fill('2026-10-28');
  await page.getByRole('button',{name:'Salvar registro demonstrativo',exact:true}).click();
  await tab('Histórico').click();
  await expect(page.getByText('Retorno de teste com o estudante.',{exact:true})).toBeVisible();
  await page.reload(); await tab('Histórico').click();
  await expect(page.getByText('Retorno de teste com o estudante.',{exact:true})).toBeVisible();
  await tab('Contatos').click();
  await expect(page.getByRole('heading',{name:'Adriana Gomes'})).toBeVisible();
  await expect(page.getByText('(11) 9XXXX-0101',{exact:true})).toBeVisible();
  await page.getByRole('tab',{name:/^Alertas/}).click();
  await page.getByRole('button',{name:'Conferir frequência e faltas'}).click();
  await expect(tab('Frequência e faltas')).toHaveAttribute('aria-selected','true');
  await page.getByRole('button',{name:'Carômetro',exact:true}).click();
  await page.waitForURL('**/#/carometroTeacher');
  fs.mkdirSync('test-results',{recursive:true});
  for(const theme of ['light','dark']) for(const width of [390,768,1440,1920]) {
    await page.setViewportSize({width,height:1000}); await visit('ProfileLucasTeacher',theme);
    for(const name of ['Frequência e faltas','Notas','Histórico','Observações','Contatos']) {
      await tab(name).click();
      const size=await page.evaluate(()=>({view:innerWidth,scroll:document.documentElement.scrollWidth}));
      assert.ok(size.scroll<=size.view+1,`${name} ${theme} ${width}: overflow ${size.scroll}`);
      const overlap=await page.getByRole('tabpanel').locator('section').evaluateAll(items=>{
        if(items.length!==2) return false;
        const [a,b]=items.map(item=>item.getBoundingClientRect());
        return a.left<b.right && b.left<a.right && a.top<b.bottom && b.top<a.bottom;
      });
      assert.equal(overlap,false,`${name} cards overlap at ${width}`);
    }
    await tab('Frequência e faltas').click();
    await page.screenshot({path:`test-results/profile-${theme}-${width}.png`,fullPage:true});
    console.log('PASS profile',theme,width);
  }
  assert.deepEqual(errors,[]);
  console.log('PASS profile tabs, keyboard, filters, contacts, notes and history persistence, data totals and responsive layout');
} finally { await browser?.close(); await server.close(); }
