import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import { initializeAccessibility } from '../src/services/accessibility.js';

const window = new Window({settings: {disableJavaScriptFileLoading: true, handleDisabledFileLoadingAsSuccess: true}});
globalThis.document = window.document;
try {
  initializeAccessibility('csVkjYy3VL');
  initializeAccessibility('csVkjYy3VL');
  assert.equal(document.querySelectorAll('#permaneo-vlibras').length, 1);
  assert.equal(document.querySelectorAll('#permaneo-userway').length, 1);
  const userway = document.getElementById('permaneo-userway');
  assert.equal(userway.dataset.position, '2');
  assert.equal(userway.dataset.size, 'small');
  assert.equal(userway.dataset.language, 'pt');
  assert.equal(userway.async, true);
  assert.ok(!document.getElementById('root'), 'widgets do not require or modify the React root');
  userway.dispatchEvent(new window.Event('error'));
  assert.equal(document.getElementById('permaneo-userway'), null);
  initializeAccessibility('csVkjYy3VL');
  assert.equal(document.querySelectorAll('#permaneo-userway').length, 1, 'failed load can retry');
  document.head.innerHTML = '';
  initializeAccessibility('');
  assert.ok(document.getElementById('permaneo-vlibras'), 'VLibras works independently');
  assert.equal(document.getElementById('permaneo-userway'), null);
  initializeAccessibility(null);
  console.log('PASS: widget loading, idempotency, independent configuration and retry.');
} finally {
  delete globalThis.document;
  await window.happyDOM.abort();
}
