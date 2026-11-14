import assert from 'node:assert/strict';
import { test } from 'node:test';
import { members } from '../src/components/team/team-data.js';
import { memberIndex, nearestPosition, POSITION_ANGLE, snapPosition, wheelIntent } from '../src/components/team/team-motion.js';

test('mantém a ordem da equipe e completa voltas nos dois sentidos', () => {
  assert.equal(POSITION_ANGLE, 72);
  assert.deepEqual(members.map(member => member.id), ['joao', 'gabriel', 'iago', 'caique', 'diego']);
  assert.deepEqual(Array.from({ length: 6 }, (_, index) => memberIndex(index)), [0, 1, 2, 3, 4, 0]);
  assert.deepEqual(Array.from({ length: 6 }, (_, index) => memberIndex(-index)), [0, 4, 3, 2, 1, 0]);
});

test('usa o percurso mais curto e para em uma posição inteira', () => {
  assert.equal(nearestPosition(0, 4), -1);
  assert.equal(nearestPosition(4, 0), 5);
  assert.equal(nearestPosition(4.25, 0), 5);
  assert.equal(snapPosition(0.3, 0.003), 1);
  assert.equal(snapPosition(-0.3, -0.003), -1);
  assert.equal(snapPosition(0, 100), 1);
});

test('preserva a rolagem vertical e reconhece a intenção horizontal', () => {
  assert.equal(wheelIntent(0, 120, false), false);
  assert.equal(wheelIntent(90, 10, false), true);
  assert.equal(wheelIntent(0, 120, true), true);
});
