import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { browserServer } from './browser-server.mjs';

const { baseURL, close } = await browserServer(5187);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const attendanceKey = 'permaneo-demo-class-attendance';

async function configure(page) {
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && new URL(message.location().url || baseURL).origin === new URL(baseURL).origin) errors.push(message.text());
  });
  await page.route(/vlibras|userway/, (route) => route.fulfill({ contentType: 'application/javascript', body: '' }));
}

async function login(page, role, heading) {
  await page.goto(baseURL + '/#/login');
  await page.getByRole('radio', { name: role }).click();
  await page.getByRole('button', { name: 'Explorar sem preencher' }).click();
  await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
}

const seat = (page, index) => page.locator('[data-seat-index="' + index + '"]');
async function center(locator) {
  await locator.scrollIntoViewIfNeeded();
  const rect = await locator.boundingBox();
  assert.ok(rect);
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

async function drag(page, from, to) {
  await center(seat(page, to));
  const source = await center(seat(page, from).getByRole('button'));
  const target = await center(seat(page, to));
  await page.mouse.move(source.x, source.y);
  await page.mouse.down();
  await page.mouse.move(target.x, target.y, { steps: 12 });
  await expect(seat(page, to)).toHaveAttribute('data-drop-target', 'true');
  await page.mouse.up();
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, reducedMotion: 'reduce' });
  page.setDefaultTimeout(12000);
  await configure(page);
  await login(page, /Estudante|Aluno/, 'Meu dia');
  const camila = page.getByRole('img', { name: 'Retrato de Camila Rocha' });
  await expect(camila).toBeVisible();
  const portrait = await camila.getAttribute('src');
  const week = page.getByRole('region', { name: 'Minha semana' });
  await expect(week.locator('[aria-current="date"]')).toHaveCount(1);
  await week.getByRole('button', { name: 'Próxima semana' }).click();
  await expect(week.locator('[aria-current="date"]')).toHaveCount(0);
  await week.getByRole('button', { name: 'Semana anterior' }).click();
  await expect(week.locator('[aria-current="date"]')).toHaveCount(1);
  await expect(page.getByRole('img', { name: '0% das atividades entregues' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileMenu = page.getByRole('navigation', { name: 'Menu da plataforma' });
  for (const item of ['Início', 'Estudos', 'Calendário', 'Avisos', 'Perfil']) {
    await expect(mobileMenu.getByRole('link', { name: item, exact: true })).toBeVisible();
  }
  await expect(mobileMenu.getByRole('link', { name: 'Carômetro' })).toHaveCount(0);
  await mobileMenu.getByRole('link', { name: 'Estudos' }).click();
  await expect(page.getByRole('heading', { name: 'Minhas atividades' })).toBeVisible();

  await page.setViewportSize({ width: 1440, height: 1050 });
  await login(page, /Coordenação|Direção/, 'Visão geral da escola');
  const kpis = page.locator('[data-school-kpis]');
  await expect(kpis.locator('strong')).toHaveText(['8', '92,5%', '2', '7', '0', '0']);
  await page.getByLabel('Turma', { exact: true }).selectOption('9º A');
  await expect(kpis.locator('strong').first()).toHaveText('2');
  await page.getByLabel('Situação', { exact: true }).selectOption('priority');
  await expect(kpis.locator('strong').first()).toHaveText('1');
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await page.evaluate(() => localStorage.setItem('permaneo-demo-records', JSON.stringify([
    { student: 'Camila Rocha', text: 'Retorno fictício agendado', status: 'Em andamento', createdAt: '2026-10-20' },
    { student: 'Lucas Gomes', text: 'Retorno fictício concluído', status: 'Concluída', createdAt: '2026-10-19' },
  ])));
  await page.reload();
  await expect(kpis.locator('strong')).toHaveText(['8', '92,5%', '2', '7', '1', '1']);
  await expect(page.getByRole('img', { name: 'Pendente: 0, Em andamento: 1, Concluída: 1' })).toBeVisible();
  await page.getByLabel('Agrupar por').selectOption('term');
  await expect(page.getByRole('img', { name: 'Gráfico de evolução da frequência' })).toBeVisible();
  await page.getByLabel('De', { exact: true }).fill('2026-10-19');
  await page.getByLabel('Até', { exact: true }).fill('2026-10-22');
  await expect(kpis).toContainText('período anterior');
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await page.goto(baseURL + '/#/carometroManagement');
  await page.getByRole('searchbox', { name: 'Buscar estudante' }).fill('9º A');
  await expect(page.locator('[data-carometro-card]')).toHaveCount(2);
  await page.getByRole('button', { name: /Camila Rocha/ }).click();
  await expect(page.getByRole('img', { name: 'Retrato de Camila Rocha' })).toHaveAttribute('src', portrait);
  await page.evaluate(() => localStorage.setItem('permaneo-profile-notes-Lucas', JSON.stringify([{ id: 'test-note', assunto: 'Observação reservada para teste', descricao: 'Exemplo fictício', visibilidade: 'RESTRITA', atencao: 'PRIORITARIO', data: '2026-10-19' }])));

  await login(page, /Professor/, 'Minhas Turmas');
  await page.getByRole('link', { name: 'Abrir sala virtual 9º A' }).click();
  await expect(seat(page, 1).locator('img')).toHaveAttribute('src', portrait);
  await page.getByRole('button', { name: 'Lucas Gomes', exact: true }).click();
  await expect(page.getByRole('dialog')).not.toContainText('Observação reservada para teste');
  await page.getByRole('button', { name: 'Fechar perfil' }).click();

  await page.getByRole('button', { name: 'Registrar frequência' }).click();
  const call = page.getByRole('dialog', { name: 'Realizar chamada' });
  await call.getByRole('button', { name: 'Lucas Gomes: Atrasado' }).click();
  await call.getByRole('button', { name: 'Camila Rocha: Presente' }).click();
  await call.getByRole('button', { name: /Revisar chamada/ }).click();
  await page.getByRole('button', { name: 'Confirmar e salvar' }).click();
  await page.getByRole('button', { name: 'Concluir' }).click();
  await expect(seat(page, 0).locator('[data-call="ATRASADO"]')).toBeVisible();
  const attendance = await page.evaluate((key) => localStorage.getItem(key), attendanceKey);

  await page.getByRole('button', { name: 'Editar mapa' }).click();
  await drag(page, 0, 2);
  await expect(seat(page, 2)).toHaveAttribute('data-student-id', 'Lucas');
  await drag(page, 2, 1);
  await expect(seat(page, 1)).toHaveAttribute('data-student-id', 'Lucas');
  await expect(seat(page, 2)).toHaveAttribute('data-student-id', 'Camila');
  await page.getByRole('button', { name: 'Desfazer' }).click();
  await expect(seat(page, 2)).toHaveAttribute('data-student-id', 'Lucas');
  await page.getByRole('button', { name: 'Refazer' }).click();
  await expect(seat(page, 1)).toHaveAttribute('data-student-id', 'Lucas');
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(seat(page, 0)).toHaveAttribute('data-student-id', 'Lucas');

  await page.getByRole('button', { name: 'Editar mapa' }).click();
  const origin = seat(page, 0).getByRole('button');
  await origin.focus();
  await page.keyboard.press('Space');
  await expect(origin).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('ArrowRight');
  await expect(seat(page, 1).getByRole('button')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(seat(page, 1)).toHaveAttribute('data-student-id', 'Lucas');
  await page.getByRole('button', { name: 'Salvar mapa' }).click();
  await page.reload();
  await expect(seat(page, 1)).toHaveAttribute('data-student-id', 'Lucas');
  await expect(seat(page, 1).locator('[data-call="ATRASADO"]')).toBeVisible();
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), attendanceKey), attendance);
  await page.getByRole('button', { name: 'Lucas Gomes', exact: true }).click();
  await page.getByRole('button', { name: 'Ver perfil completo' }).click();
  await page.getByRole('tab', { name: 'Frequência' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Atrasado');

  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  await configure(touch);
  await touch.goto(baseURL + '/#/teacherRoom?turma=9a');
  await touch.getByRole('button', { name: 'Editar mapa' }).tap();
  await touch.getByRole('button', { name: 'Reduzir zoom' }).tap();
  await center(seat(touch, 1));
  const start = await center(seat(touch, 0).getByRole('button'));
  const end = await center(seat(touch, 1));
  const cdp = await touch.context().newCDPSession(touch);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] });
  for (let step = 1; step <= 6; step++) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start.x + (end.x - start.x) * step / 6, y: start.y + (end.y - start.y) * step / 6 }] });
  }
  await expect(seat(touch, 1)).toHaveAttribute('data-drop-target', 'true');
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(seat(touch, 1)).toHaveAttribute('data-student-id', 'Lucas');
  await touch.close();

  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 960 });
    for (const theme of ['light', 'dark']) {
      await page.evaluate((theme) => localStorage.setItem('permaneo-theme', theme), theme);
      await page.reload();
      for (const [route, heading] of [['student', 'Meu dia'], ['director', 'Visão geral da escola'], ['carometroTeacher', 'Carômetro'], ['teacherRoom', 'Minha Sala']]) {
        await page.goto(baseURL + '/#/' + route);
        await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route + ' ' + theme + ' overflow at ' + width);
      }
    }
  }
  assert.deepEqual(errors, []);
  console.log('PASS: three demo logins, weekly agenda, mobile navigation, filters, portraits, restricted notes, mouse/touch/keyboard seating, undo/redo/cancel/save/reload, attendance, six viewport sizes in both themes.');
} finally {
  await browser.close();
  await close();
}
