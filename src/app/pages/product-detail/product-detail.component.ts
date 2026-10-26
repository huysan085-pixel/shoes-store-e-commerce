import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { SITE_URL, SeoService } from '../../services/seo.service';
import { ToastService } from '../../services/toast.service';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars.component';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe, ImgFallbackDirective, ProductCardComponent, RatingStarsComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  /** :slug route parameter (bound by withComponentInputBinding). */
  readonly slug = input<string>();

  readonly product = computed(() => this.products.getBySlug(this.slug()));
  readonly related = computed(() => {
    const p = this.product();
    return p ? this.products.getRelated(p, 4) : [];
  });

  // Selections reset when the product changes.
  readonly color = linkedSignal(() => this.product()?.colors[0].name ?? '');
  readonly size = linkedSignal<unknown, string | null>({ source: this.product, computation: () => null });
  readonly quantity = linkedSignal({ source: this.product, computation: () => 1 });
  readonly galleryIndex = linkedSignal({ source: this.product, computation: () => -1 });
  readonly error = signal('');
  readonly tab = signal<'description' | 'specs' | 'reviews'>('description');

  readonly soldOut = computed(() => (this.product()?.stock ?? 0) <= 0);
  readonly remaining = computed(() => {
    const p = this.product();
    return p ? this.cart.remainingStock(p.id) : 0;
  });
  /** Max quantity the customer can still add (sample stock minus what is in the cart). */
  readonly maxQty = computed(() => Math.max(1, this.remaining()));
  readonly discount = computed(() => {
    const p = this.product();
    return p?.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  });
  readonly activeImage = computed(() => {
    const p = this.product();
    if (!p) return '';
    if (this.galleryIndex() >= 0) return p.images[this.galleryIndex()];
    return p.colors.find((c) => c.name === this.color())?.image ?? p.image;
  });
  readonly stockLabel = computed(() => {
    const s = this.product()?.stock ?? 0;
    return s <= 0 ? 'Sold out' : s <= 5 ? `Low stock: only ${s} left` : 'In stock';
  });

  constructor() {
    effect(() => {
      const p = this.product();
      if (!p) {
        this.seo.set({ title: 'Shoe not found', description: 'This shoe could not be found.', path: `/product/${this.slug() ?? ''}`, noIndex: true });
        return;
      }
      this.seo.set({ title: `${p.name} (${p.brand})`, description: `${p.description} From $${p.price}. Sample product for a student demo.`, path: `/product/${p.slug}`, image: p.image });
      this.seo.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        sku: p.sku,
        brand: { '@type': 'Brand', name: p.brand },
        description: p.description,
        image: p.images.map((i) => SITE_URL + i),
        offers: { '@type': 'Offer', priceCurrency: 'USD', price: p.price, availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
      });
    });
  }

  pickColor(name: string): void {
    this.color.set(name);
    this.galleryIndex.set(-1);
  }

  pickSize(size: string): void {
    this.size.set(size);
    this.error.set('');
  }

  changeQty(delta: number): void {
    this.quantity.update((q) => Math.min(this.maxQty(), Math.max(1, q + delta)));
  }

  /** Returns true when the item was added. */
  private add(): boolean {
    const p = this.product();
    if (!p) return false;
    if (this.remaining() === 0 && !this.soldOut()) {
      this.error.set(`You already have all ${p.stock} available pairs in your cart.`);
      return false;
    }
    const result = this.cart.add(p.id, this.size(), this.color(), this.quantity());
    if (!result.ok) {
      this.error.set(result.message);
      return false;
    }
    this.error.set('');
    this.quantity.set(1);
    return true;
  }

  addToCart(): void {
    const p = this.product()!;
    const label = `${p.name} (US ${this.size()}, ${this.color()})`;
    if (this.add()) this.toast.show(`${label} added to your cart.`);
  }

  buyNow(): void {
    if (this.add()) this.router.navigate(['/checkout']);
  }
}
