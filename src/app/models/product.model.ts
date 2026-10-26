export type Category = 'Running' | 'Lifestyle' | 'Basketball' | 'Training';

export interface ProductColor {
  name: string;
  hex: string;
  /** Image shown when this colour is selected. */
  image: string;
}

export interface ProductReview {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  category: Category;
  /** Price in USD. */
  price: number;
  originalPrice?: number;
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  image: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  /** Sample stock for the demo (not live inventory). */
  stock: number;
  /** Sample rating, not from real customers. */
  rating: number;
  reviewCount: number;
  featured: boolean;
  newArrival: boolean;
  /** ISO date, used for the "Newest" sort. */
  createdAt: string;
  reviews: ProductReview[];
}
