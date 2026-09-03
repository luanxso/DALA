import { lotData } from './lot-data.mjs';

/** @param {unknown} value */
export function lookupLot(value) {
  const code = typeof value === 'string' ? value.trim().toUpperCase() : '';
  if (!code) return { status: 'empty', code, lot: null };
  const lot = code === lotData.lot || code === lotData.order ? lotData : null;
  return { status: lot ? 'found' : 'not-found', code, lot };
}

/** @param {string} search */
export function lookupFromSearch(search) {
  const params = new URLSearchParams(search);
  return params.has('codigo') ? lookupLot(params.get('codigo')) : null;
}

/**
 * Keep the deployment subdirectory intact when navigating or sharing a lot.
 * @param {string} currentHref
 * @param {string} [code]
 */
export function createLookupHref(currentHref, code = '') {
  const url = new URL(currentHref);
  const normalized = code.trim().toUpperCase();
  if (normalized) url.searchParams.set('codigo', normalized);
  else url.searchParams.delete('codigo');
  return `${url.pathname}${url.search}`;
}
