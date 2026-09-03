import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDocumentNotice,
  buildProtocolConfirmation,
  formatTimelineDate,
} from '../lib/request-flow.mjs';

test('formata data e hora da linha do tempo em português', () => {
  assert.equal(formatTimelineDate('2026-09-02T08:15:00-03:00'), '02/09/2026 às 08:15');
});

test('confirma o protocolo sem sugerir um envio real', () => {
  const confirmation = buildProtocolConfirmation('SOL-1042');

  assert.equal(confirmation.protocol, 'SOL-1042');
  assert.match(confirmation.title, /solicitação registrada/i);
  assert.match(confirmation.disclaimer, /demonstração/i);
  assert.match(confirmation.disclaimer, /nenhuma informação foi enviada/i);
});

test('identifica documentos como prévias demonstrativas', () => {
  const notice = buildDocumentNotice('Certificado de inspeção');

  assert.equal(notice.title, 'Certificado de inspeção');
  assert.match(notice.message, /prévia demonstrativa/i);
});

