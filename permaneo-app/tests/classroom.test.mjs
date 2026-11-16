import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';

const server = await createServer({ server: { host: '127.0.0.1', port: 5185, strictPort: true } });
await server.listen();
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 980 } });
  const errors = [];
  const apiRequests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (new URL(request.url()).pathname.startsWith('/api/')) apiRequests.push(request.url());
  });
  await page.route(/userway|vlibras/, (route) => route.abort());
  const base = 'http://127.0.0.1:5185/#/';
  await page.goto(base + 'login');
  await page.getByRole('radio', { name: /Professor/ }).click();
  await page.getByRole('button', { name: 'Explorar sem preencher' }).click();
  await expect(page.getByRole('heading', { name: 'Minhas Turmas', exact: true })).toBeVisible();
  await expect(page.getByText('Demonstração · Dados fictícios')).toBeVisible();
  await page.getByLabel('Série', { exact: true }).selectOption('9º ano');
  await expect(page.getByRole('link', { name: 'Entrar na sala 8º A' })).toHaveCount(0);
  await page.getByLabel('Período', { exact: true }).selectOption('Tarde');
  await expect(page.getByText('Nenhuma turma corresponde aos filtros.')).toBeVisible();
  await page.getByLabel('Período', { exact: true }).selectOption('Manhã');
  await page.getByLabel('Buscar turma').fill('9º');
  await page.getByRole('link', { name: 'Entrar na sala 9º A' }).click();
  await expect(page.getByRole('heading', { name: 'Turma 9º A' })).toBeVisible();

  const mapa = page.getByRole('region', { name: 'Mapa de assentos' });
  await expect(mapa.getByRole('button', { name: 'Lucas Gomes', exact: true })).toHaveAccessibleDescription(/Lucas Gomes.*9º A · 78%/);
  await page.getByRole('button', { name: 'Aumentar zoom' }).click();
  await expect(mapa.getByText('125%')).toBeVisible();
  await page.getByRole('button', { name: 'Restaurar zoom e posição' }).click();
  await page.getByRole('button', { name: 'Editar assentos' }).click();
  const lucas = mapa.getByRole('button', { name: 'Carteira 1: Lucas Gomes' });
  await lucas.focus();
  await page.keyboard.press('Enter');
  await expect(lucas).toHaveAttribute('aria-pressed', 'true');
  await mapa.getByRole('button', { name: 'Carteira 2: Camila Rocha' }).click();
  await page.getByRole('button', { name: 'Salvar mapa' }).click();
  await expect(page.getByText('Mapa de assentos salvo.')).toBeVisible();
  await page.reload();
  await expect(mapa.getByRole('button').filter({ hasText: /Camila|Lucas/ }).first()).toHaveAccessibleName('Camila Rocha');
  await page.getByLabel('Trocar turma').selectOption('8a');
  await expect(mapa.getByRole('button', { name: 'Isabela Santos', exact: true })).toBeVisible();
  await page.getByLabel('Trocar turma').selectOption('9a');
  await expect(mapa.getByRole('button').filter({ hasText: /Camila|Lucas/ }).first()).toHaveAccessibleName('Camila Rocha');

  await mkdir('test-results', { recursive: true });
  await page.screenshot({ path: 'test-results/minha-sala-desktop.png', fullPage: true });
  const salaLucas = mapa.getByRole('button', { name: 'Lucas Gomes', exact: true });
  await salaLucas.focus();
  await page.keyboard.press('Enter');
  const painel = page.getByRole('dialog', { name: 'Lucas Gomes' });
  await expect(painel.getByRole('heading', { name: 'Histórico de observações' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(painel).toHaveCount(0);
  await expect(salaLucas).toBeFocused();
  await salaLucas.click();
  await painel.getByRole('button', { name: 'Adicionar observação' }).click();
  await expect(painel.getByLabel('Categoria')).toBeFocused();
  await painel.getByLabel('Categoria').selectOption('PARTICIPACAO');
  await painel.getByLabel('Nível de atenção').selectOption('PRIORITARIO');
  await painel.getByLabel('Descrição').fill('Participou da atividade e combinou uma revisão.');
  await expect(painel.getByLabel('Professor responsável')).toHaveValue('Renata Oliveira');
  await painel.getByRole('button', { name: 'Salvar observação' }).click();
  await expect(painel.getByText('Observação salva.')).toBeVisible();
  await expect(painel.getByText('Participou da atividade e combinou uma revisão.')).toBeVisible();
  await painel.getByRole('button', { name: 'Ver perfil completo' }).click();
  await expect(page).toHaveURL(/ProfileLucasTeacher/);
  await page.getByRole('tab', { name: 'Observações' }).click();
  await expect(page.getByText('Participou da atividade e combinou uma revisão.')).toBeVisible();
  await page.getByRole('button', { name: 'Voltar à sala' }).click();
  await expect(page).toHaveURL(/teacherRoom\?turma=9a/);

  await page.getByLabel('Buscar estudante').fill('lucas');
  await page.getByLabel('Acompanhamento', { exact: true }).selectOption('priority');
  const visualizacao = page.getByRole('group', { name: 'Visualização' });
  await visualizacao.getByRole('button', { name: 'Carômetro' }).click();
  await expect(page.getByRole('list', { name: 'Estudantes da turma' }).getByRole('button')).toHaveCount(1);
  await visualizacao.getByRole('button', { name: 'Lista' }).click();
  await expect(page.getByRole('list', { name: 'Estudantes da turma' }).getByText('Lucas Gomes')).toBeVisible();
  await page.reload();
  await page.getByRole('list', { name: 'Estudantes da turma' }).getByRole('button', { name: /Lucas Gomes/ }).click();
  await expect(painel.getByText('Participou da atividade e combinou uma revisão.')).toBeVisible();
  await painel.getByRole('button', { name: 'Fechar perfil' }).click();
  await page.getByLabel('Buscar estudante').fill('');
  await page.getByLabel('Acompanhamento', { exact: true }).selectOption('');
  await visualizacao.getByRole('button', { name: 'Sala Virtual' }).click();
  await page.getByLabel('Trocar turma').selectOption('8a');
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 850 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'largura ' + width);
    await expect(mapa.getByRole('button', { name: 'Heitor', exact: true })).toBeVisible();
    if (width === 390) {
      await page.screenshot({ path: 'test-results/minha-sala-mobile-escuro.png', fullPage: true });
      await mapa.getByRole('button', { name: 'Heitor', exact: true }).click();
      await expect(page.getByRole('dialog', { name: 'Heitor' })).toBeVisible();
      await page.screenshot({ path: 'test-results/minha-sala-perfil-mobile.png', animations: 'disabled' });
      await page.keyboard.press('Escape');
    }
  }

  await page.evaluate(() => localStorage.setItem('permaneo-demo-students', JSON.stringify([
    { id: 123, name: 'Rafaela Teste', className: '8º A' },
  ])));
  await page.reload();
  await mapa.getByRole('button', { name: 'Rafaela Teste', exact: true }).click();
  const rafaela = page.getByRole('dialog', { name: 'Rafaela Teste' });
  await expect(rafaela.getByText('Dados insuficientes')).toBeVisible();
  await rafaela.getByRole('button', { name: 'Ver perfil completo' }).click();
  await expect(page.getByRole('heading', { name: 'Rafaela Teste' })).toBeVisible();
  await page.getByRole('button', { name: 'Voltar à sala' }).click();
  await expect(mapa.getByRole('button', { name: 'Rafaela Teste', exact: true })).toBeVisible();

  for (const rota of ['director', 'student']) {
    await page.goto(base + rota);
    await expect(page.getByRole('navigation', { name: 'Menu da plataforma' }).getByRole('link', { name: 'Minha Sala' })).toHaveCount(0);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(apiRequests, [], 'Os fluxos demonstrativos não fazem chamadas à API');
  console.log('PASS Minha Sala: login, filtros, zoom, teclado, assentos, turmas, Carômetro, observações, temas e celular.');
} finally {
  await browser?.close();
  await server.close();
}
