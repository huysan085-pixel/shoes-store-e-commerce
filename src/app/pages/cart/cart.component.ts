// import { CurrencyPipe } from '@angular/common';
// import { Component, inject, signal } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { CartService } from '../../services/cart.service';
// import { SeoService } from '../../services/seo.service';
// import { ToastService } from '../../services/toast.service';
// import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

// @Component({
//   selector: 'app-cart',
//   imports: [RouterLink, CurrencyPipe, ImgFallbackDirective],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.scss',
// })
// export class CartComponent {
//   readonly cart = inject(CartService);
//   private readonly toast = inject(ToastService);
//   readonly promoError = signal('');

//   constructor() {
//     inject(SeoService).set({ title: 'Your cart', description: 'Review the shoes in your cart.', path: '/cart', noIndex: true });
//   }

//   change(key: string, action: 'increase' | 'decrease'): void {
//     const result = this.cart[action](key);
//     if (!result.ok) this.toast.show(result.message, 'error');
//   }

//   remove(key: string): void {
//     this.toast.show(this.cart.remove(key).message);
//   }

//   clear(): void {
//     if (confirm('Remove every item from your cart?')) {
//       this.cart.clear();
//       this.toast.show('Your cart is now empty.');
//     }
//   }

//   applyPromo(code: string): void {
//     const result = this.cart.applyPromo(code);
//     this.promoError.set(result.ok ? '' : result.message);
//     if (result.ok) this.toast.show(result.message);
//   }
// }


/* File: src/app/pages/cart/cart.component.ts */
import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SeoService } from '../../services/seo.service';
import { ToastService } from '../../services/toast.service';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ImgFallbackDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);
  readonly promoError = signal('');

  // Checks if all items currently in cart are checked
  readonly allSelected = computed(() => {
    const lines = this.cart.lines();
    return lines.length > 0 && lines.every((l) => l.selected);
  });

  // Number of ticked items
  readonly selectedCount = computed(() => this.cart.selectedLines().length);

  constructor() {
    inject(SeoService).set({ title: 'Your cart', description: 'Review the shoes in your cart.', path: '/cart', noIndex: true });
  }

  toggle(key: string): void {
    this.cart.toggleSelect(key);
  }

  toggleAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.cart.selectAll(isChecked);
  }

  change(key: string, action: 'increase' | 'decrease'): void {
    const result = this.cart[action](key);
    if (!result.ok) this.toast.show(result.message, 'error');
  }

  remove(key: string): void {
    this.toast.show(this.cart.remove(key).message);
  }

  clear(): void {
    if (confirm('Remove every item from your cart?')) {
      this.cart.clear();
      this.toast.show('Your cart is now empty.');
    }
  }

  applyPromo(code: string): void {
    const result = this.cart.applyPromo(code);
    this.promoError.set(result.ok ? '' : result.message);
    if (result.ok) this.toast.show(result.message);
  }
}