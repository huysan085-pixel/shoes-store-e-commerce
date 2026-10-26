import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAYMENT_LABELS } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { SeoService } from '../../services/seo.service';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

@Component({
  selector: 'app-order-confirmation',
  imports: [RouterLink, CurrencyPipe, DatePipe, ImgFallbackDirective],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent {
  private readonly orders = inject(OrderService);
  /** ?order=OS-... in the URL. Falls back to the most recent demo order. */
  readonly order = input<string>();
  readonly data = computed(() => this.orders.getById(this.order()) ?? (this.order() ? undefined : this.orders.getLatest()));
  readonly paymentLabels = PAYMENT_LABELS;

  constructor() {
    inject(SeoService).set({ title: 'Order confirmation', description: 'Your demo order confirmation.', path: '/order-confirmation', noIndex: true });
  }
}
