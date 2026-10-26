// import { CurrencyPipe } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { ProductService } from '../../services/product.service';
// import { SeoService } from '../../services/seo.service';
// import { ProductCardComponent } from '../../shared/product-card/product-card.component';
// import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
// import { CATEGORIES } from '../../data/products.data';

// @Component({
//   selector: 'app-home',
//   imports: [RouterLink, CurrencyPipe, ReactiveFormsModule, ProductCardComponent, ImgFallbackDirective],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss',
// })
// export class HomeComponent {
//   private readonly products = inject(ProductService);
//   private readonly seo = inject(SeoService);

//   readonly hero = this.products.getBySlug('nike-air-force-1-07')!;
//   readonly featured = this.products.getFeatured().slice(0, 4);
//   readonly newArrivals = this.products.getNewArrivals().slice(0, 4);
//   readonly categories = CATEGORIES.map((name) => ({
//     name,
//     count: this.products.countByCategory(name),
//     image: this.products.getFirstByCategory(name)?.image ?? '',
//   }));

//   readonly email = new FormControl('', {
//     nonNullable: true,
//     validators: [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)],
//   });
//   submitted = false;
//   subscribed = false;

//   constructor() {
//     this.seo.set({
//       title: 'Outsole',
//       description: 'Shop classic and current sneakers from Nike, Adidas, New Balance, ASICS and Converse. Clear sizing, simple checkout and printable invoices (student demo store).',
//       path: '/',
//     });
//   }

//   subscribe(): void {
//     this.submitted = true;
//     if (this.email.valid) this.subscribed = true;
//   }
// }



import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { SeoService } from '../../services/seo.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';
import { CATEGORIES } from '../../data/products.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ReactiveFormsModule, ProductCardComponent, ImgFallbackDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly products = inject(ProductService);
  private readonly seo = inject(SeoService);

  // Hero displays the ASICS GEL-Kayano 14
  readonly hero = this.products.getBySlug('asics-gel-kayano-14') || this.products.getAll()[0];

  readonly categories = CATEGORIES.map((name) => ({
    name,
    count: this.products.countByCategory ? this.products.countByCategory(name) : 0,
    image: this.products.getFirstByCategory ? (this.products.getFirstByCategory(name)?.image ?? '') : '',
  }));

  readonly featured = this.products.getFeatured().slice(0, 4);
  readonly newArrivals = this.products.getNewArrivals().slice(0, 4);

  readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)],
  });
  submitted = false;
  subscribed = false;

  constructor() {
    this.seo.set({
      title: 'Outsole | Premium Sneakers & Streetwear',
      description: 'Shop 10 curated silhouettes across Nike, Adidas, New Balance, ASICS and Converse.',
      path: '/',
    });
  }

  subscribe(): void {
    this.submitted = true;
    if (this.email.valid) this.subscribed = true;
  }
}