import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LogoComponent } from '../../shared/logo/logo.component';
import { FREE_SHIPPING_THRESHOLD } from '../../data/pricing';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  readonly cart = inject(CartService);
  readonly menuOpen = signal(false);
  readonly freeShipping = FREE_SHIPPING_THRESHOLD;

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onSearch(event: Event, term: string): void {
    event.preventDefault();
    const q = term.trim();
    this.router.navigate(['/shop'], { queryParams: q ? { q } : {} });
    this.closeMenu();
  }
}
