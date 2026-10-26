import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  template: `
    <span class="stars" role="img" [attr.aria-label]="'Sample rating ' + rating() + ' out of 5'">
      @for (s of stars(); track $index) {
        <i class="bi" [class.bi-star-fill]="s === 'full'" [class.bi-star-half]="s === 'half'" [class.bi-star]="s === 'empty'" aria-hidden="true"></i>
      }
    </span>
    @if (count() !== null) {
      <span class="count" title="Sample data, not real customer reviews">{{ rating() }} ({{ count() }})</span>
    }
  `,
  styles: `
    :host { display: inline-flex; align-items: center; gap: 0.4rem; }
    .stars { color: var(--os-black); font-size: 0.8rem; letter-spacing: 1px; white-space: nowrap; }
    .count { font-size: 0.8rem; color: var(--os-gray-600); }
  `,
})
export class RatingStarsComponent {
  readonly rating = input.required<number>();
  readonly count = input<number | null>(null);

  readonly stars = computed(() => {
    const r = this.rating();
    return Array.from({ length: 5 }, (_, i) => (r >= i + 0.75 ? 'full' : r >= i + 0.25 ? 'half' : 'empty'));
  });
}
