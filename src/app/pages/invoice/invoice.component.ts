import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, afterNextRender, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAYMENT_LABELS } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { SeoService } from '../../services/seo.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-invoice',
  imports: [RouterLink, CurrencyPipe, DatePipe, LogoComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent {
  private readonly orders = inject(OrderService);
  readonly order = input<string>();
  /** ?print=1 opens the browser print dialog automatically. */
  readonly print = input<string>();
  readonly data = computed(() => this.orders.getById(this.order()) ?? (this.order() ? undefined : this.orders.getLatest()));
  readonly paymentLabels = PAYMENT_LABELS;

  constructor() {
    inject(SeoService).set({ title: 'Invoice', description: 'Printable demo invoice.', path: '/invoice', noIndex: true });
    afterNextRender(() => {
      if (this.print() === '1' && this.data()) setTimeout(() => window.print(), 300);
    });
  }

  printPage(): void {
    window.print();
  }
}
