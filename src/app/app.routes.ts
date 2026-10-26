import { Routes } from '@angular/router';

/** Every page is lazy-loaded so the first download stays small. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'shop', loadComponent: () => import('./pages/shop/shop.component').then((m) => m.ShopComponent) },
  { path: 'product/:slug', loadComponent: () => import('./pages/product-detail/product-detail.component').then((m) => m.ProductDetailComponent) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then((m) => m.CartComponent) },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent) },
  { path: 'order-confirmation', loadComponent: () => import('./pages/order-confirmation/order-confirmation.component').then((m) => m.OrderConfirmationComponent) },
  { path: 'invoice', loadComponent: () => import('./pages/invoice/invoice.component').then((m) => m.InvoiceComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
