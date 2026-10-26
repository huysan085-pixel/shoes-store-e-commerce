import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { ImgFallbackDirective } from '../img-fallback.directive';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, RatingStarsComponent, ImgFallbackDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);

  readonly product = input.required<Product>();
  /** Show the size picker and Add to Cart button (used in the shop grid and home sections). */
  readonly quickAdd = input(true);
  /** Lazy-load images below the fold. */
  readonly eager = input(false);

  readonly size = signal('');
  readonly error = signal('');

  readonly soldOut = computed(() => this.product().stock <= 0);
  readonly lowStock = computed(() => this.product().stock > 0 && this.product().stock <= 5);
  readonly discount = computed(() => {
    const p = this.product();
    return p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  });
  readonly sizeRange = computed(() => {
    const s = this.product().sizes;
    return `US ${s[0]} to ${s[s.length - 1]}`;
  });

  onSize(value: string): void {
    this.size.set(value);
    this.error.set('');
  }

  addToCart(): void {
    const p = this.product();
    const result = this.cart.add(p.id, this.size() || null, p.colors[0].name, 1);
    if (result.ok) {
      this.toast.show(result.message);
      this.error.set('');
    } else {
      this.error.set(result.message);
    }
  }
}
