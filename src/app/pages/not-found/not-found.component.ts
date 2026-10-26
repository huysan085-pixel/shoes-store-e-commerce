import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="container section">
      <div class="empty-state">
        <i class="bi bi-compass" aria-hidden="true"></i>
        <h1 class="display mt-3">Page not found</h1>
        <p class="text-muted-os">That page does not exist. Head back to the shop to keep browsing.</p>
        <a routerLink="/shop" class="btn-os">Back to shop</a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  constructor() {
    inject(SeoService).set({ title: 'Page not found', description: 'This page could not be found.', path: '/404', noIndex: true });
  }
}
