import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { Window } from 'happy-dom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { demoStudents } from '../src/data/students.js';
import { getStudentProfile } from '../src/data/studentProfiles.js';
import { turmasDemo } from '../src/data/sala.js';

const hashes = new Set();
for (const student of demoStudents) {
  const image = await readFile(new URL('../public' + student.photo, import.meta.url));
  assert.equal(image.toString('ascii', 8, 12), 'WEBP');
  assert.ok(image.length < 40000, `${student.id}: optimized image`);
  hashes.add(createHash('sha256').update(image).digest('hex'));
  assert.equal(getStudentProfile(student.key).photo, student.photo);
  const seat = turmasDemo.flatMap((room) => room.estudantes).find((item) => item.id === student.id);
  assert.equal(seat.foto, student.photo);
}
assert.equal(hashes.size, demoStudents.length, 'no repeated portraits');
assert.equal(new Set(demoStudents.map((student) => student.id)).size, demoStudents.length);

const window = new Window({ url: 'http://localhost/', settings: { enableImageFileLoading: false, handleDisabledFileLoadingAsSuccess: true } });
Object.assign(globalThis, { window, document: window.document, IS_REACT_ACT_ENVIRONMENT: true });
const cache = new URL('../node_modules/.cache/portrait-tests/', import.meta.url);
await mkdir(cache, { recursive: true });
const output = new URL('component.mjs', cache);
const result = await build({ entryPoints: ['src/components/students/StudentPortrait.jsx'], bundle: true, outfile: output.pathname, write: false, format: 'esm', packages: 'external', jsx: 'automatic', loader: { '.css': 'empty' }, logLevel: 'silent' });
await writeFile(output, result.outputFiles[0].text);
const { default: Portrait } = await import(output.href);
const host = document.createElement('div');
document.body.append(host);
const root = createRoot(host);
const render = (student, extra = {}) => act(() => root.render(React.createElement(Portrait, { student, ...extra })));
try {
  await render(demoStudents[0]);
  assert.equal(host.querySelector('img').getAttribute('src'), demoStudents[0].photo);
  assert.equal(host.querySelector('img').getAttribute('loading'), 'lazy');
  assert.equal(host.querySelector('img').alt, 'Retrato de Lucas Gomes');
  await act(() => host.querySelector('img').dispatchEvent(new window.Event('error')));
  assert.equal(host.querySelector('img'), null, 'broken image removed');
  assert.ok(host.querySelector('svg'));
  assert.equal(host.querySelector('[role="img"]').getAttribute('aria-label'), 'Avatar ilustrado de Lucas Gomes');
  await render(demoStudents[1]);
  assert.equal(host.querySelector('img').getAttribute('src'), demoStudents[1].photo, 'failure does not leak to next student');
  await render(turmasDemo[0].estudantes[0], { decorative: true });
  assert.equal(host.querySelector('img').getAttribute('src'), demoStudents[0].photo);
  assert.equal(host.firstChild.getAttribute('aria-hidden'), 'true');
  await render({ id: 'local-1', name: 'Estudante local', photo: '/upload.webp' });
  assert.equal(host.querySelector('img').getAttribute('src'), '/upload.webp', 'preserves uploaded photo');
  await render({ id: 'local-1', name: 'Estudante local' });
  const fallback = host.querySelector('svg').outerHTML;
  await render({ id: 'local-2', name: 'Outro estudante' });
  await render({ id: 'local-1', name: 'Estudante local' });
  assert.equal(host.querySelector('svg').outerHTML, fallback, 'stable illustrated fallback');
  await render({ id: 'local-1', name: 'Estudante local', photo: '/new-upload.webp' });
  assert.equal(host.querySelector('img').getAttribute('src'), '/new-upload.webp', 'new upload replaces fallback');
  console.log('PASS: unique local WebP portraits, shared IDs, profile/room consistency, lazy loading, accessible fallback, upload recovery.');
} finally {
  await act(() => root.unmount());
  await window.happyDOM.close();
  await rm(cache, { recursive: true, force: true });
}
