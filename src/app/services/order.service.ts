import { Injectable, inject } from '@angular/core';
import { Order, OrderItem, CustomerInfo, PaymentMethod } from '../models/order.model';
import { CartService } from './cart.service';
import { StorageService } from './storage.service';

const ORDERS_KEY = 'outsole.orders.v1';
const MAX_SAVED_ORDERS = 20;

export type CreateOrderResult = { ok: true; order: Order } | { ok: false; message: string };

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly cart = inject(CartService);
  private readonly storage = inject(StorageService);

  /** In-memory copy, so confirmation still works if localStorage is unavailable. */
  private orders: Order[] | null = null;

  /**
   * Builds a demo order. Prices and totals are recalculated from trusted cart lines
   * (which use local product data), never from the form.
   */
  createOrder(customer: CustomerInfo, paymentMethod: PaymentMethod): CreateOrderResult {
    const lines = this.cart.lines();
    if (!lines.length) return { ok: false, message: 'Your cart is empty. Add a pair before checking out.' };

    for (const l of lines) {
      if (l.product.stock <= 0) return { ok: false, message: `${l.product.name} is sold out. Remove it to continue.` };
      if (!Number.isInteger(l.quantity) || l.quantity < 1 || l.quantity > l.product.stock) {
        return { ok: false, message: `Please check the quantity for ${l.product.name}.` };
      }
    }

    const totals = this.cart.totals();
    const code = this.generateCode();
    const items: OrderItem[] = lines.map((l) => ({
      productId: l.product.id,
      name: l.product.name,
      brand: l.product.brand,
      sku: l.product.sku,
      image: l.image,
      size: l.size,
      color: l.color,
      quantity: l.quantity,
      unitPrice: l.unitPrice,
      lineTotal: l.lineTotal,
    }));

    const order: Order = {
      id: `OS-${code}`,
      invoiceNumber: `INV-${code}`,
      createdAt: new Date().toISOString(),
      customer: { ...customer },
      paymentMethod,
      items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      promoCode: this.cart.promoCode(),
      total: totals.total,
      status: paymentMethod === 'cod' ? 'Demo order placed (pay on delivery)' : 'Demo order placed (no payment taken)',
    };

    this.orders = [order, ...this.all()].slice(0, MAX_SAVED_ORDERS);
    this.storage.set(ORDERS_KEY, this.orders);
    // Only clear the cart after the order exists.
    this.cart.clear();
    return { ok: true, order };
  }

  getById(id: string | null | undefined): Order | undefined {
    return id ? this.all().find((o) => o.id === id) : undefined;
  }

  getLatest(): Order | undefined {
    return this.all()[0];
  }

  private all(): Order[] {
    if (this.orders === null) {
      const saved = this.storage.get<Order[]>(ORDERS_KEY, []);
      this.orders = Array.isArray(saved) ? saved : [];
    }
    return this.orders;
  }

  private generateCode(): string {
    const d = new Date();
    const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 5; i++) suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    return `${date}-${suffix}`;
  }
}
