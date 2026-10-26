import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/product.model';
import { PRICE_RANGES, PriceRange, ProductService, SORT_LABELS, SortOption } from '../../services/product.service';
import { SeoService } from '../../services/seo.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  private readonly products = inject(ProductService);
  private readonly seo = inject(SeoService);

  // Bound from the URL (?q=...&category=...&sort=...) by withComponentInputBinding()
  readonly q = input<string>();
  readonly categoryParam = input<string>(undefined, { alias: 'category' });
  readonly sortParam = input<string>(undefined, { alias: 'sort' });

  readonly categories = this.products.categories;
  readonly brands = this.products.brands;
  readonly priceRanges = PRICE_RANGES;
  readonly sortOptions = Object.entries(SORT_LABELS) as [SortOption, string][];

  // Filter state. linkedSignal resets from the URL whenever the URL changes, but can still be edited by the user.
  readonly search = linkedSignal(() => this.q() ?? '');
  readonly category = linkedSignal<Category | ''>(() => (this.categories.includes(this.categoryParam() as Category) ? (this.categoryParam() as Category) : ''));
  readonly sort = linkedSignal<SortOption>(() => (this.sortParam() && this.sortParam()! in SORT_LABELS ? (this.sortParam() as SortOption) : 'featured'));
  readonly selectedBrands = signal<string[]>([]);
  readonly priceRange = signal<PriceRange>('any');
  readonly filtersOpen = signal(false);

  readonly results = computed(() =>
    this.products.query({
      search: this.search(),
      category: this.category(),
      brands: this.selectedBrands(),
      priceRange: this.priceRange(),
      sort: this.sort(),
    }),
  );

  readonly hasFilters = computed(
    () => !!this.search().trim() || !!this.category() || this.selectedBrands().length > 0 || this.priceRange() !== 'any' || this.sort() !== 'featured',
  );

  constructor() {
    this.seo.set({
      title: 'Shop all sneakers',
      description: 'Browse 10 sample sneakers from Nike, Adidas, New Balance, ASICS and Converse. Search, filter by category, brand and price, and sort your results.',
      path: '/shop',
    });
  }

  toggleBrand(brand: string, checked: boolean): void {
    this.selectedBrands.update((list) => (checked ? [...list, brand] : list.filter((b) => b !== brand)));
  }

  clearFilters(): void {
    this.search.set('');
    this.category.set('');
    this.sort.set('featured');
    this.selectedBrands.set([]);
    this.priceRange.set('any');
  }
}
