import { Totals } from '../models/cart.model';

/** Demo shipping and discount rules. Change them here and the whole site updates. */
export const SHIPPING_FEE = 8;
export const FREE_SHIPPING_THRESHOLD = 150;

export const PROMO_CODES: Record<string, { rate: number; label: string }> = {
  WELCOME10: { rate: 0.1, label: '10% off' },
  SETEC15: { rate: 0.15, label: '15% off' },
};

export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function normalizePromo(code: string | null | undefined): string | null {
  const c = (code ?? '').trim().toUpperCase();
  return c && PROMO_CODES[c] ? c : null;
}

/** Single place where every money total is calculated. */
export function calculateTotals(subtotal: number, itemCount: number, promoCode: string | null): Totals {
  const promo = normalizePromo(promoCode);
  const discount = promo ? round2(subtotal * PROMO_CODES[promo].rate) : 0;
  const qualifiesForFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = itemCount === 0 || qualifiesForFree ? 0 : SHIPPING_FEE;
  return {
    itemCount,
    subtotal: round2(subtotal),
    discount,
    shipping,
    total: round2(subtotal - discount + shipping),
    promoLabel: promo ? `${promo} (${PROMO_CODES[promo].label})` : null,
    freeShippingGap: itemCount === 0 ? FREE_SHIPPING_THRESHOLD : Math.max(0, round2(FREE_SHIPPING_THRESHOLD - subtotal)),
  };
}
