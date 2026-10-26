// import { Product } from './product.model';

// /** What we store: only IDs and choices. Prices always come from product data. */
// export interface CartEntry {
//   productId: number;
//   size: string;
//   color: string;
//   quantity: number;
//    selected?: boolean; // Controls whether this item is selected for checkout
// }

// /** What the UI shows: an entry joined with trusted product data. */
// export interface CartLine {
//   key: string;
//   product: Product;
//   size: string;
//   color: string;
//   quantity: number;
//   image: string;
//   unitPrice: number;
//   lineTotal: number;
// }

// export interface Totals {
//   itemCount: number;
//   subtotal: number;
//   discount: number;
//   shipping: number;
//   total: number;
//   promoLabel: string | null;
//   freeShippingGap: number;
// }

// export interface ActionResult {
//   ok: boolean;
//   message: string;
// }


/* File: src/app/models/cart.model.ts */
import { Product } from './product.model';

/** What we store: only IDs and choices. Prices always come from product data. */
export interface CartEntry {
  productId: number;
  size: string;
  color: string;
  quantity: number;
  selected?: boolean; // Controls whether this shoe is selected for checkout
}

/** What the UI shows: an entry joined with trusted product data. */
export interface CartLine {
  key: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  image: string;
  unitPrice: number;
  lineTotal: number;
  selected: boolean; // Tick box state in the UI
}

export interface Totals {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoLabel: string | null;
  freeShippingGap: number;
}

export interface ActionResult {
  ok: boolean;
  message: string;
}