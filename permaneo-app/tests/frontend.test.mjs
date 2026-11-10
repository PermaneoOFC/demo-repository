import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { Window } from 'happy-dom';
import { createServer } from 'vite';

const window = new Window({ url: 'http://localhost:5173/' });
for (const key of ['window', 'document', 'localStorage', 'navigator', 'Element', 'HTMLElement', 'MutationObserver']) {
  Object.defineProperty(globalThis, key, { value: window[key], configurable: true });
}
const server = await createServer({ server: { middlewareMode: true } });
const React = (await import('react')).default;
const { createRoot } = await import('react-dom/client');
const pause = () => new Promise((resolve) => setTimeout(resolve, 20));
async function waitFor(predicate, description) {
  for (let attempt = 0; attempt < 250; attempt += 1) {
    if (predicate()) return;
    await pause();
  }
  throw new Error('Timeout: ' + description + '\n' + document.body.textContent.slice(0, 300));
}
let root;
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const { default: ErrorBoundary } = await server.ssrLoadModule('/src/components/layout/ErrorBoundary.jsx');
  document.body.innerHTML = '<div id="root"></div>';
  root = createRoot(document.getElementById('root'));
  root.render(React.createElement(ErrorBoundary, null, React.createElement(App)));
  await waitFor(() => document.querySelector('[data-name="CTA / Acessar"][role="link"]'), 'home');
  // Clicking the label inside a control must behave like clicking its boundary.
  document.querySelector('[data-name="CTA / Acessar"] p').click();
  await waitFor(() => document.querySelector('[role="radiogroup"]'), 'login');
  const radios = [...document.querySelectorAll('[role="radio"]')];
  radios[1].querySelector('strong').click();
  await waitFor(() => radios[1].getAttribute('aria-checked') === 'true', 'selected teacher');
  assert.equal(document.querySelectorAll('[role="radio"][aria-checked="true"]').length, 1);
  [...document.querySelectorAll('button')].find((button) => button.textContent === 'Explorar sem preencher').click();
  await waitFor(() => window.location.hash === '#teacher' && document.body.textContent.includes('Minhas turmas'), 'teacher entry');

  async function visit(route, dark = false) {
    localStorage.setItem('permaneo-theme', dark ? 'dark' : 'light');
    root.unmount();
    document.getElementById('root').innerHTML = '';
    window.history.replaceState({ page: route }, '', '#' + route);
    root = createRoot(document.getElementById('root'));
    root.render(React.createElement(ErrorBoundary, null, React.createElement(App)));
    await waitFor(() => document.querySelector('[data-name], [role="radiogroup"]') && !document.body.textContent.includes('Carregando Permaneo'), route);
    assert.ok(document.body.textContent.length > 150, route + ' has content');
    assert.ok(!document.body.textContent.includes('Não foi possível abrir esta tela.'), route + ' has no render error');
    await pause();
  }
  const routes = ['home','login','director','directorFollowup','directorNotifications','reports','directorSettings','teacher','teacherFollowup','teacherNotifications','teacherSettings','student','studentSpace','carometroManagement','carometroTeacher'];
  const profiles = ['Lucas','Camila','Isabela','Eduardo','Yasmin','Livia'];
  for (const name of profiles) routes.push('Profile'+name+'Management', 'Profile'+name+'Teacher');
  routes.push('ProfileAnaBeatrizManagement', 'ProfileHeitorManagement');
  for (const route of routes) for (const dark of [false,true]) await visit(route,dark);
  await visit('carometroManagement');
  await waitFor(() => document.querySelector('[data-name="Ver perfil"][role="button"]'), 'profile buttons');
  const card = document.querySelector('[data-name^="Estudante ·"]');
  const initialHash = window.location.hash;
  card.querySelector('p').click();
  await pause();
  assert.equal(window.location.hash, initialHash, 'card text does not navigate');
  card.querySelector('[data-name="Ver perfil"] p').click();
  await waitFor(() => window.location.hash.startsWith('#ProfileLucas') && !document.body.textContent.includes('Carregando Permaneo'), 'selected student profile');
  await visit('carometroManagement');
  document.querySelector('[data-name^="Buscar por nome"]').click();
  await waitFor(() => document.querySelector('[role="dialog"] input'), 'search modal');
  const search = document.querySelector('[role="dialog"] input');
  assert.ok(search.labels.length, 'search has associated label');
  document.querySelector('[aria-label="Fechar janela"]').click();
  await waitFor(() => !document.querySelector('[role="dialog"]'), 'modal closes');
  // Source conventions and imports are checked separately from rendering.
  function scan(directory) {
    return fs.readdirSync(directory,{withFileTypes:true}).flatMap((entry) => entry.isDirectory() ? scan(path.join(directory,entry.name)) : [path.join(directory,entry.name)]);
  }
  const files = scan('src');
  assert.equal(files.filter((file) => /\.tsx?$/.test(file)).length, 0, 'JavaScript only');
  for (const file of files.filter((file) => file.endsWith('.jsx'))) assert.ok(fs.existsSync(file.replace(/\.jsx$/,'.module.css')), file+' matching CSS Module');
  for (const file of files.filter((file) => file.endsWith('.jsx'))) {
    const source = fs.readFileSync(file, 'utf8');
    assert.ok(!source.includes('figma.com/api/mcp/asset'), file + ' has no temporary image URLs');
    for (const match of source.matchAll(/from ['"]([^'"]+\.(?:svg|png|jpg|gif))['"]/g)) {
      const image = path.resolve(path.dirname(file), match[1]);
      assert.ok(fs.statSync(image).size > 0, image + ' is nonempty');
    }
  }
  for (const file of files.filter((file) => file.endsWith('.svg'))) {
    const xml = new window.DOMParser().parseFromString(fs.readFileSync(file, 'utf8'), 'image/svg+xml');
    assert.equal(xml.documentElement.tagName.toLowerCase(), 'svg', file + ' is an SVG');
    assert.ok(Number.parseFloat(xml.documentElement.getAttribute('width')) > 0, file + ' has width');
    assert.ok(Number.parseFloat(xml.documentElement.getAttribute('height')) > 0, file + ' has height');
  }
  console.log(`PASS: ${routes.length * 2} route/theme renders; home/login/profile/modal interactions; JSX/CSS Modules pairing.`);
} finally {
  root?.unmount();
  await server.close();
  await window.happyDOM.abort();
}
