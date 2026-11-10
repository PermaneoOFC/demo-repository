import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const server=await createServer({server:{host:'127.0.0.1',port:5174,strictPort:true}});
await server.listen();
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const routes=['home','login','director','directorFollowup','directorNotifications','reports','directorSettings','teacher','teacherFollowup','teacherNotifications','teacherSettings','student','studentSpace','carometroManagement','carometroTeacher'];
routes.push('studentActivities','studentCalendar','studentSubjects','studentNotices','studentPlan','studentSupport');
for(const name of ['Lucas','Camila','Isabela','Eduardo','Yasmin','Livia'])routes.push('Profile'+name+'Management','Profile'+name+'Teacher');
routes.push('ProfileAnaBeatrizManagement','ProfileHeitorManagement');
async function visit(route,theme='light'){
 console.log('Checking',route,theme);
 await page.goto('http://127.0.0.1:5174/',{waitUntil:'domcontentloaded'});
 await page.evaluate(theme=>localStorage.setItem('permaneo-theme',theme),theme);
 await page.goto('http://127.0.0.1:5174/#/'+route,{waitUntil:'domcontentloaded'});await page.reload({waitUntil:'domcontentloaded'});
 await page.waitForSelector('[data-name], [role="radiogroup"]');
 await page.waitForFunction(()=>!document.body.innerText.includes('Carregando Permaneo'));
 assert.ok((await page.locator('body').innerText()).length>150,route);
 await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
}
try{
 if(!process.argv.includes('--flows')){
  for(const route of routes)for(const theme of ['light','dark'])await visit(route,theme);
  console.log(`PASS: ${routes.length*2} route/theme renders with local images.`);
 }
 await visit('login');await page.getByRole('radio').nth(1).click();
 assert.equal(await page.getByRole('radio').nth(1).getAttribute('aria-checked'),'true');
 await page.getByRole('button',{name:'Explorar sem preencher',exact:true}).click();await page.waitForURL('**/#/teacher');
 await visit('carometroManagement');
 await page.locator('[data-name="Ver perfil"]').first().click();await page.waitForURL('**/#/ProfileLucasManagement');
 await visit('carometroManagement');await page.locator('[data-name^="Buscar por nome"]').click();
 await page.getByRole('dialog').getByRole('textbox').fill('Lucas');
 await page.getByRole('dialog').getByRole('button',{name:/Lucas Gomes/}).click();await page.waitForURL('**/#/ProfileLucasManagement');
 await visit('carometroManagement');await page.locator('[data-name="+ Adicionar aluno"]').click();
 await page.getByLabel('Nome completo',{exact:true}).fill('Rafaela Teste');
 await page.getByLabel('Série e turma',{exact:true}).selectOption('8º A');
 await page.getByRole('button',{name:'Salvar aluno',exact:true}).click();
 await page.locator('[data-name="Estudante · Rafaela Teste"]').waitFor();
 assert.ok(await page.locator('[data-name="Estudante · Rafaela Teste"]').isVisible());
 await page.locator('[data-name="Estudante · Rafaela Teste"]').getByRole('button',{name:'Ver perfil',exact:true}).click();
 await page.getByRole('button',{name:'Registrar acompanhamento',exact:true}).click();
 await page.getByLabel('Registro de acompanhamento',{exact:true}).fill('Combinar uma rotina de estudo.');
 await page.getByRole('button',{name:'Salvar registro demonstrativo',exact:true}).click();
 assert.ok(await page.getByText('Combinar uma rotina de estudo.',{exact:true}).isVisible());
 await page.reload();await page.locator('[data-name="Estudante · Rafaela Teste"]').waitFor({state:'attached'});
 await visit('student');await page.getByLabel('Assunto',{exact:true}).selectOption('Frequência');
 await page.getByLabel('Como podemos ajudar?',{exact:true}).fill('Gostaria de conversar sobre minha rotina.');
 await page.getByRole('button',{name:'Enviar pedido demonstrativo',exact:true}).click();
 assert.ok(await page.getByText('Pedido demonstrativo registrado. Nenhuma mensagem foi enviada.',{exact:true}).isVisible());
 fs.mkdirSync('test-results',{recursive:true});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['home','login','director','carometroManagement','directorNotifications','directorSettings','teacher','student']){
   await visit(route);await page.screenshot({path:`test-results/${route}-${width}.png`,fullPage:true});
   const size=await page.evaluate(()=>({view:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(size.scroll<=size.view+1,`${route} at ${width}: overflow ${size.scroll}`);
  }
 }
 const scan=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?scan(path.join(dir,e.name)):[path.join(dir,e.name)]);
 const files=scan('src');assert.equal(files.filter(f=>/\.tsx?$/.test(f)).length,0);
 for(const file of files.filter(f=>f.endsWith('.jsx'))){
  const imports = [...fs.readFileSync(file,'utf8').matchAll(/from ['"]([^'"]+\.module\.css)['"]/g)];
  assert.ok(imports.length > 0, file+' CSS Module');
  for (const [, stylesheet] of imports) assert.ok(fs.existsSync(path.resolve(path.dirname(file), stylesheet)), file+' stylesheet exists');
  assert.ok(!fs.readFileSync(file,'utf8').includes('figma.com/api/mcp/asset'),file+' temporary URLs');
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: login, profile, search, local registration, refresh persistence, responsive layouts and console.');
}finally{await browser.close();await server.close();}
