import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Hybrid rendering plan:
 *  - Prerender: pages that never change (built once into static HTML)
 *  - Server:    pages rendered on each request (catalog and product pages)
 *  - Client:    pages that depend on the visitor's browser data (cart, checkout, orders)
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'shop', renderMode: RenderMode.Server },
  { path: 'product/:slug', renderMode: RenderMode.Server },
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'checkout', renderMode: RenderMode.Client },
  { path: 'order-confirmation', renderMode: RenderMode.Client },
  { path: 'invoice', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
