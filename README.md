# Outsole: Shoes E-commerce (Angular SSR)

A modern sneaker store built as a university midterm project. It is **frontend only**: no backend, no database, no admin panel and no real payments. All products come from local TypeScript sample data.

> Sample products only. Brand names belong to their owners and are used for demonstration. Prices, stock, ratings and reviews are illustrative.

## Features

- Home page with hero, categories, featured shoes, new arrivals, promo banner and a newsletter form (frontend validation)
- Shop page with search, category, brand and price filters, sorting (price, name, newest), product count, clear filters and an empty state
- Product detail page with image gallery, colour and size selection, quantity limits from sample stock, Add to cart, Buy now, specs, sample reviews, related products and breadcrumbs
- Cart with quantity controls, remove, clear, promo codes (`WELCOME10`, `SETEC15`), shipping fee and totals
- Checkout with full validation and demo payment options (Cash on Delivery, ABA PayWay demo, Card demo). No card data is ever collected
- Order confirmation and a printable **A4 HTML invoice** (`@media print` styles)
- Cart and demo orders saved in `localStorage` with SSR-safe code
- Page titles, meta descriptions, canonical URLs and product JSON-LD

## Technology

Angular 21 (standalone components, signals), Angular SSR with hybrid rendering, Angular Router (lazy-loaded pages), SCSS, Bootstrap 5, Bootstrap Icons, Archivo variable font (`@fontsource-variable/archivo`).

## Rendering plan (`src/app/app.routes.server.ts`)

| Route | Mode |
|---|---|
| `/`, `/about` | Prerender |
| `/shop`, `/product/:slug` | Server-side rendering |
| `/cart`, `/checkout`, `/order-confirmation`, `/invoice` | Client-side rendering |

## Getting started (Windows PowerShell)

```powershell
cd "D:\school\SETEC\setec_year_4\semester_1\ec\shoes-ecommerce\frontend"
npm install
ng serve
```

Open http://localhost:4200

### Production build and SSR server

```powershell
npm run build
npm run start:ssr
```

Open http://localhost:4000 (set `$env:PORT=3000` first to use another port).

### Tests

```powershell
ng test --watch=false
```

## Project structure

```
src/app/
  models/      product, cart and order types
  data/        products.data.ts (10 sample shoes), pricing.ts (shipping and promo rules)
  services/    product, cart, order, storage (SSR-safe), seo, toast
  layout/      header (announcement bar, nav, search, cart badge), footer
  shared/      product card, rating stars, logo, toast, image fallback
  pages/       home, shop, product-detail, cart, checkout, order-confirmation, invoice, about, not-found
public/images/ sneaker illustrations (SVG) and placeholder
scripts/       generate-shoe-images.mjs (re-creates the SVG illustrations)
```

## Changing things

- **Products:** edit `src/app/data/products.data.ts`. Set `stock: 0` to see the sold-out state.
- **Real photos:** put your images in `public/images/shoes/` and change the paths in the data file.
- **Shipping and promo codes:** `src/app/data/pricing.ts`.
- **Canonical domain:** change `SITE_URL` in `src/app/services/seo.service.ts` after you deploy.

## Deployment

SSR needs a **Node.js host** (Render, Railway, Fly.io, a VPS). A static-only host (GitHub Pages, plain Netlify) cannot run the SSR server.

Render example:
1. Push the repository to GitHub (the `frontend` folder is the app root).
2. New **Web Service**, root directory `frontend`.
3. Build command: `npm install && npm run build`
4. Start command: `node dist/frontend/server/server.mjs`
5. Allowed hosts: `angular.json` already allows `localhost`, `*.onrender.com`, `*.railway.app`, `*.fly.dev` and `*.vercel.app`. Add your own domain to `security.allowedHosts` if you use one.

## Screenshots

Add screenshots of the home page, shop, product page, cart, checkout and invoice here.

## Future backend

Services (`ProductService`, `CartService`, `OrderService`) are the only place that read data, so a real API can replace the local data later without changing the pages.
