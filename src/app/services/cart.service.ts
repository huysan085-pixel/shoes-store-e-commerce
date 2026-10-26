// import { Injectable, computed, inject, signal } from '@angular/core';
// import { ActionResult, CartEntry, CartLine } from '../models/cart.model';
// import { calculateTotals, normalizePromo, PROMO_CODES } from '../data/pricing';
// import { ProductService } from './product.service';
// import { StorageService } from './storage.service';

// const CART_KEY = 'outsole.cart.v1';

// interface StoredCart {
//   entries: CartEntry[];
//   promo: string | null;
// }

// @Injectable({ providedIn: 'root' })
// export class CartService {
//   private readonly products = inject(ProductService);
//   private readonly storage = inject(StorageService);

//   private readonly entries = signal<CartEntry[]>([]);
//   readonly promoCode = signal<string | null>(null);
//   /** False on the server and until the browser has restored the saved cart. */
//   readonly ready = signal(false);

//   /** Cart lines joined with trusted product data (prices never come from storage). */
//   readonly lines = computed<CartLine[]>(() =>
//     this.entries().flatMap((e) => {
//       const product = this.products.getById(e.productId);
//       if (!product) return [];
//       const color = product.colors.find((c) => c.name === e.color);
//       return [{
//         key: this.keyOf(e),
//         product,
//         size: e.size,
//         color: e.color,
//         quantity: e.quantity,
//         image: color?.image ?? product.image,
//         unitPrice: product.price,
//         lineTotal: product.price * e.quantity,
//       }];
//     }),
//   );

//   readonly totals = computed(() => {
//     const lines = this.lines();
//     const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
//     const count = lines.reduce((sum, l) => sum + l.quantity, 0);
//     return calculateTotals(subtotal, count, this.promoCode());
//   });

//   readonly itemCount = computed(() => this.totals().itemCount);

//   /** Call once in the browser (App does this after first render). */
//   restore(): void {
//     if (this.ready()) return;
//     const saved = this.storage.get<StoredCart>(CART_KEY, { entries: [], promo: null });
//     const clean: CartEntry[] = [];
//     for (const e of Array.isArray(saved.entries) ? saved.entries : []) {
//       const p = this.products.getById(e?.productId);
//       if (!p || !p.sizes.includes(e.size) || !p.colors.some((c) => c.name === e.color)) continue;
//       const used = clean.filter((c) => c.productId === p.id).reduce((s, c) => s + c.quantity, 0);
//       const qty = Math.min(Math.floor(Number(e.quantity)) || 0, p.stock - used);
//       if (qty > 0) clean.push({ productId: p.id, size: e.size, color: e.color, quantity: qty });
//     }
//     this.entries.set(clean);
//     this.promoCode.set(normalizePromo(saved.promo));
//     this.ready.set(true);
//   }

//   /** How many more of this product can be added (stock is shared by all sizes and colours). */
//   remainingStock(productId: number): number {
//     const p = this.products.getById(productId);
//     if (!p) return 0;
//     const inCart = this.entries().filter((e) => e.productId === productId).reduce((s, e) => s + e.quantity, 0);
//     return Math.max(0, p.stock - inCart);
//   }

//   add(productId: number, size: string | null, color: string, quantity = 1): ActionResult {
//     const p = this.products.getById(productId);
//     if (!p) return { ok: false, message: 'This product is no longer available.' };
//     if (p.stock <= 0) return { ok: false, message: `${p.name} is sold out.` };
//     if (!size || !p.sizes.includes(size)) return { ok: false, message: 'Please choose a size first.' };
//     if (!p.colors.some((c) => c.name === color)) return { ok: false, message: 'Please choose a colour.' };
//     if (!Number.isInteger(quantity) || quantity < 1) return { ok: false, message: 'Quantity must be 1 or more.' };
//     const remaining = this.remainingStock(productId);
//     if (quantity > remaining) {
//       return { ok: false, message: remaining === 0 ? `You already have all ${p.stock} available pairs in your cart.` : `Only ${remaining} more available.` };
//     }
//     const entry = { productId, size, color, quantity };
//     const key = this.keyOf(entry);
//     this.entries.update((list) => {
//       const found = list.find((e) => this.keyOf(e) === key);
//       return found ? list.map((e) => (e === found ? { ...e, quantity: e.quantity + quantity } : e)) : [...list, entry];
//     });
//     this.persist();
//     return { ok: true, message: `${p.name} (US ${size}, ${color}) added to your cart.` };
//   }

//   setQuantity(key: string, quantity: number): ActionResult {
//     const entry = this.entries().find((e) => this.keyOf(e) === key);
//     if (!entry) return { ok: false, message: 'Item not found.' };
//     if (quantity < 1) return this.remove(key);
//     const p = this.products.getById(entry.productId)!;
//     const others = this.entries().filter((e) => e.productId === entry.productId && e !== entry).reduce((s, e) => s + e.quantity, 0);
//     const max = p.stock - others;
//     if (quantity > max) return { ok: false, message: `Only ${p.stock} available for ${p.name}.` };
//     this.entries.update((list) => list.map((e) => (e === entry ? { ...e, quantity } : e)));
//     this.persist();
//     return { ok: true, message: 'Quantity updated.' };
//   }

//   increase(key: string): ActionResult {
//     const e = this.entries().find((x) => this.keyOf(x) === key);
//     return e ? this.setQuantity(key, e.quantity + 1) : { ok: false, message: 'Item not found.' };
//   }

//   decrease(key: string): ActionResult {
//     const e = this.entries().find((x) => this.keyOf(x) === key);
//     return e ? this.setQuantity(key, e.quantity - 1) : { ok: false, message: 'Item not found.' };
//   }

//   remove(key: string): ActionResult {
//     this.entries.update((list) => list.filter((e) => this.keyOf(e) !== key));
//     this.persist();
//     return { ok: true, message: 'Item removed from your cart.' };
//   }

//   clear(): void {
//     this.entries.set([]);
//     this.promoCode.set(null);
//     this.persist();
//   }

//   applyPromo(code: string): ActionResult {
//     const normalized = normalizePromo(code);
//     if (!normalized) return { ok: false, message: 'That code is not valid. Try WELCOME10.' };
//     this.promoCode.set(normalized);
//     this.persist();
//     return { ok: true, message: `${normalized} applied: ${PROMO_CODES[normalized].label}.` };
//   }

//   removePromo(): void {
//     this.promoCode.set(null);
//     this.persist();
//   }

//   private keyOf(e: Pick<CartEntry, 'productId' | 'size' | 'color'>): string {
//     return `${e.productId}|${e.size}|${e.color}`;
//   }

//   private persist(): void {
//     this.storage.set(CART_KEY, { entries: this.entries(), promo: this.promoCode() } satisfies StoredCart);
//   }
// }


/* File: src/app/services/cart.service.ts */
import { Injectable, computed, inject, signal } from '@angular/core';
import { ActionResult, CartEntry, CartLine } from '../models/cart.model';
import { calculateTotals, normalizePromo, PROMO_CODES } from '../data/pricing';
import { ProductService } from './product.service';
import { StorageService } from './storage.service';

const CART_KEY = 'outsole.cart.v1';

interface StoredCart {
  entries: CartEntry[];
  promo: string | null;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly products = inject(ProductService);
  private readonly storage = inject(StorageService);

  private readonly entries = signal<CartEntry[]>([]);
  readonly promoCode = signal<string | null>(null);
  /** False on the server and until the browser has restored the saved cart. */
  readonly ready = signal(false);

  /** Cart lines joined with trusted product data */
  readonly lines = computed<CartLine[]>(() =>
    this.entries().flatMap((e) => {
      const product = this.products.getById(e.productId);
      if (!product) return [];
      const color = product.colors.find((c) => c.name === e.color);
      return [{
        key: this.keyOf(e),
        product,
        size: e.size,
        color: e.color,
        quantity: e.quantity,
        image: color?.image ?? product.image,
        unitPrice: product.price,
        lineTotal: product.price * e.quantity,
        selected: e.selected !== false, // Defaults to checked
      }];
    }),
  );

  /** Only ticked shoes */
  readonly selectedLines = computed(() => this.lines().filter((l) => l.selected));

  /** Totals calculated strictly from checked items */
  readonly totals = computed(() => {
    const selected = this.selectedLines();
    const subtotal = selected.reduce((sum, l) => sum + l.lineTotal, 0);
    const count = selected.reduce((sum, l) => sum + l.quantity, 0);
    return calculateTotals(subtotal, count, this.promoCode());
  });

  readonly itemCount = computed(() => this.totals().itemCount);

  /** Call once in the browser (App does this after first render). */
  restore(): void {
    if (this.ready()) return;
    const saved = this.storage.get<StoredCart>(CART_KEY, { entries: [], promo: null });
    const clean: CartEntry[] = [];
    for (const e of Array.isArray(saved.entries) ? saved.entries : []) {
      const p = this.products.getById(e?.productId);
      if (!p || !p.sizes.includes(e.size) || !p.colors.some((c) => c.name === e.color)) continue;
      const used = clean.filter((c) => c.productId === p.id).reduce((s, c) => s + c.quantity, 0);
      const qty = Math.min(Math.floor(Number(e.quantity)) || 0, p.stock - used);
      if (qty > 0) {
        clean.push({
          productId: p.id,
          size: e.size,
          color: e.color,
          quantity: qty,
          selected: e.selected !== false,
        });
      }
    }
    this.entries.set(clean);
    this.promoCode.set(normalizePromo(saved.promo));
    this.ready.set(true);
  }

  /** How many more of this product can be added */
  remainingStock(productId: number): number {
    const p = this.products.getById(productId);
    if (!p) return 0;
    const inCart = this.entries().filter((e) => e.productId === productId).reduce((s, e) => s + e.quantity, 0);
    return Math.max(0, p.stock - inCart);
  }

  add(productId: number, size: string | null, color: string, quantity = 1): ActionResult {
    const p = this.products.getById(productId);
    if (!p) return { ok: false, message: 'This product is no longer available.' };
    if (p.stock <= 0) return { ok: false, message: `${p.name} is sold out.` };
    if (!size || !p.sizes.includes(size)) return { ok: false, message: 'Please choose a size first.' };
    if (!p.colors.some((c) => c.name === color)) return { ok: false, message: 'Please choose a colour.' };
    if (!Number.isInteger(quantity) || quantity < 1) return { ok: false, message: 'Quantity must be 1 or more.' };
    const remaining = this.remainingStock(productId);
    if (quantity > remaining) {
      return { ok: false, message: remaining === 0 ? `You already have all ${p.stock} available pairs in your cart.` : `Only ${remaining} more available.` };
    }
    const entry: CartEntry = { productId, size, color, quantity, selected: true };
    const key = this.keyOf(entry);
    this.entries.update((list) => {
      const found = list.find((e) => this.keyOf(e) === key);
      return found
        ? list.map((e) => (e === found ? { ...e, quantity: e.quantity + quantity, selected: true } : e))
        : [...list, entry];
    });
    this.persist();
    return { ok: true, message: `${p.name} (US ${size}, ${color}) added to your cart.` };
  }

  /** Toggle tick box for a single item */
  toggleSelect(key: string): void {
    this.entries.update((list) =>
      list.map((e) => (this.keyOf(e) === key ? { ...e, selected: e.selected === false ? true : false } : e))
    );
    this.persist();
  }

  /** Select or unselect all items */
  selectAll(selected: boolean): void {
    this.entries.update((list) => list.map((e) => ({ ...e, selected })));
    this.persist();
  }

  setQuantity(key: string, quantity: number): ActionResult {
    const entry = this.entries().find((e) => this.keyOf(e) === key);
    if (!entry) return { ok: false, message: 'Item not found.' };
    if (quantity < 1) return this.remove(key);
    const p = this.products.getById(entry.productId)!;
    const others = this.entries().filter((e) => e.productId === entry.productId && e !== entry).reduce((s, e) => s + e.quantity, 0);
    const max = p.stock - others;
    if (quantity > max) return { ok: false, message: `Only ${p.stock} available for ${p.name}.` };
    this.entries.update((list) => list.map((e) => (e === entry ? { ...e, quantity } : e)));
    this.persist();
    return { ok: true, message: 'Quantity updated.' };
  }

  increase(key: string): ActionResult {
    const e = this.entries().find((x) => this.keyOf(x) === key);
    return e ? this.setQuantity(key, e.quantity + 1) : { ok: false, message: 'Item not found.' };
  }

  decrease(key: string): ActionResult {
    const e = this.entries().find((x) => this.keyOf(x) === key);
    return e ? this.setQuantity(key, e.quantity - 1) : { ok: false, message: 'Item not found.' };
  }

  remove(key: string): ActionResult {
    this.entries.update((list) => list.filter((e) => this.keyOf(e) !== key));
    this.persist();
    return { ok: true, message: 'Item removed from your cart.' };
  }

  clear(): void {
    this.entries.set([]);
    this.promoCode.set(null);
    this.persist();
  }

  applyPromo(code: string): ActionResult {
    const normalized = normalizePromo(code);
    if (!normalized) return { ok: false, message: 'That code is not valid. Try WELCOME10.' };
    this.promoCode.set(normalized);
    this.persist();
    return { ok: true, message: `${normalized} applied: ${PROMO_CODES[normalized].label}.` };
  }

  removePromo(): void {
    this.promoCode.set(null);
    this.persist();
  }

  private keyOf(e: Pick<CartEntry, 'productId' | 'size' | 'color'>): string {
    return `${e.productId}|${e.size}|${e.color}`;
  }

  private persist(): void {
    this.storage.set(CART_KEY, { entries: this.entries(), promo: this.promoCode() } satisfies StoredCart);
  }
}