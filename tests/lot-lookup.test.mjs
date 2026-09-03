import assert from 'node:assert/strict';
import test from 'node:test';
import { lookupLot, lookupFromSearch, createLookupHref } from '../lib/lot-lookup.mjs';

test('encontra o mesmo acompanhamento pelo pedido ou pelo lote completo', () => {
  for (const code of ['TP-260902-041', 'PED-1084', '  tp-260902-041  ', ' ped-1084 ']) {
    const result = lookupLot(code);
    assert.equal(result.status, 'found');
    assert.equal(result.lot?.lot, 'TP-260902-041');
    assert.equal(result.lot?.order, 'PED-1084');
  }
});

test('não retorna dados para códigos desconhecidos, parciais ou malformados', () => {
  for (const code of ['TP-260902-042', 'PED-108', '260902-041', 'TP-260902-041-extra', '<script>']) {
    const result = lookupLot(code);
    assert.equal(result.status, 'not-found');
    assert.equal(result.lot, null);
  }
});

test('distingue uma consulta vazia de um código não encontrado', () => {
  for (const code of ['', '   ', null, undefined]) {
    assert.equal(lookupLot(code).status, 'empty');
    assert.equal(lookupLot(code).lot, null);
  }
});

test('a página inicial não seleciona automaticamente nenhum lote', () => {
  assert.equal(lookupFromSearch(''), null);
  assert.equal(lookupFromSearch('?origem=pitch'), null);
});

test('o link direto resolve o lote e preserva o erro para um código inválido', () => {
  assert.equal(lookupFromSearch('?codigo=tp-260902-041')?.lot?.lot, 'TP-260902-041');
  assert.equal(lookupFromSearch('?codigo=PED-1084')?.status, 'found');
  assert.equal(lookupFromSearch('?codigo=INVALIDO')?.status, 'not-found');
  assert.equal(lookupFromSearch('?codigo=')?.status, 'empty');
});

test('gera links que preservam o subdiretório do GitHub Pages', () => {
  assert.equal(createLookupHref('https://luanxso.github.io/DALA/#top', ' tp-260902-041 '), '/DALA/?codigo=TP-260902-041');
  assert.equal(createLookupHref('https://example.com/?origem=pitch', 'PED-1084'), '/?origem=pitch&codigo=PED-1084');
});

test('nova consulta remove o código e o fragmento sem perder o caminho do site', () => {
  assert.equal(createLookupHref('https://luanxso.github.io/DALA/?codigo=PED-1084#top'), '/DALA/');
});
