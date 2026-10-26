import { Injectable } from '@angular/core';
import { BRANDS, CATEGORIES, PRODUCTS } from '../data/products.data';
import { Category, Product } from '../models/product.model';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
export type PriceRange = 'any' | 'under-100' | '100-150' | 'over-150';

export interface ProductQuery {
  search?: string;
  category?: Category | '';
  brands?: string[];
  priceRange?: PriceRange;
  sort?: SortOption;
}

export const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  newest: 'Newest',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  'name-asc': 'Name: A to Z',
  'name-desc': 'Name: Z to A',
};

export const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: 'any', label: 'Any price' },
  { value: 'under-100', label: 'Under $100' },
  { value: '100-150', label: '$100 to $150' },
  { value: 'over-150', label: 'Over $150' },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = PRODUCTS;
  readonly categories = CATEGORIES;
  readonly brands = BRANDS;

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getBySlug(slug: string | null | undefined): Product | undefined {
    return slug ? this.products.find((p) => p.slug === slug) : undefined;
  }

  getFeatured(): Product[] {
    return this.products.filter((p) => p.featured);
  }

  getNewArrivals(): Product[] {
    return this.sort(this.products.filter((p) => p.newArrival), 'newest');
  }

  countByCategory(category: Category): number {
    return this.products.filter((p) => p.category === category).length;
  }

  getFirstByCategory(category: Category): Product | undefined {
    return this.products.find((p) => p.category === category);
  }

  getRelated(product: Product, limit = 4): Product[] {
    const others = this.products.filter((p) => p.id !== product.id);
    const score = (p: Product) => (p.category === product.category ? 2 : 0) + (p.brand === product.brand ? 1 : 0);
    return others.sort((a, b) => score(b) - score(a) || b.rating - a.rating).slice(0, limit);
  }

  query(q: ProductQuery): Product[] {
    const term = (q.search ?? '').trim().toLowerCase();
    const brands = q.brands ?? [];
    const result = this.products.filter((p) => {
      if (term && !`${p.name} ${p.brand}`.toLowerCase().includes(term)) return false;
      if (q.category && p.category !== q.category) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      switch (q.priceRange) {
        case 'under-100': return p.price < 100;
        case '100-150': return p.price >= 100 && p.price <= 150;
        case 'over-150': return p.price > 150;
        default: return true;
      }
    });
    return this.sort(result, q.sort ?? 'featured');
  }

  sort(list: Product[], by: SortOption): Product[] {
    const copy = [...list];
    switch (by) {
      case 'newest': return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      case 'price-asc': return copy.sort((a, b) => a.price - b.price);
      case 'price-desc': return copy.sort((a, b) => b.price - a.price);
      case 'name-asc': return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return copy.sort((a, b) => b.name.localeCompare(a.name));
      default: return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
    }
  }
}
