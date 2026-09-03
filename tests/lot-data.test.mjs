import test from 'node:test';
import assert from 'node:assert/strict';
import { lotData } from '../lib/lot-data.mjs';

test('o lote demonstra os identificadores apresentados ao usuário', () => {
  assert.equal(lotData.lot, 'TP-260902-041');
  assert.equal(lotData.order, 'PED-1084');
  assert.equal(lotData.status, 'Em expedição');
  assert.equal(lotData.deliveryEstimate, '05/09/2026');
});

test('a linha do tempo tem uma única etapa atual em ordem cronológica', () => {
  assert.equal(lotData.timeline.filter((stage) => stage.state === 'current').length, 1);
  const timestamps = lotData.timeline.map((stage) => new Date(stage.timestamp).getTime());
  assert.deepEqual(timestamps, [...timestamps].sort((a, b) => a - b));
});

test('a ocorrência registra identificação, correção e aprovação', () => {
  assert.match(lotData.qualityOccurrence.summary, /divergência dimensional/i);
  assert.match(lotData.qualityOccurrence.resolution, /corrigido/i);
  assert.match(lotData.qualityOccurrence.resolution, /aprovado/i);
});

