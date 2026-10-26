import { calculateTotals } from './pricing';

describe('calculateTotals', () => {
  it('charges flat shipping under the free-shipping threshold', () => {
    const t = calculateTotals(100, 1, null);
    expect(t.shipping).toBe(8);
    expect(t.total).toBe(108);
  });

  it('gives free shipping at $150 or more', () => {
    expect(calculateTotals(150, 2, null).shipping).toBe(0);
  });

  it('applies WELCOME10 as 10% off the subtotal', () => {
    const t = calculateTotals(200, 2, 'welcome10');
    expect(t.discount).toBe(20);
    expect(t.total).toBe(180);
  });

  it('ignores unknown promo codes and empty carts', () => {
    expect(calculateTotals(100, 1, 'FAKE').discount).toBe(0);
    expect(calculateTotals(0, 0, null).total).toBe(0);
  });
});
