import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PAYMENT_LABELS, PaymentMethod } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { SeoService } from '../../services/seo.service';
import { ImgFallbackDirective } from '../../shared/img-fallback.directive';

export const COUNTRIES = ['Cambodia', 'Thailand', 'Vietnam', 'Laos', 'Singapore', 'Malaysia', 'Philippines', 'Indonesia', 'Japan', 'South Korea', 'Australia', 'United Kingdom', 'United States', 'Other'];

/** 8 to 15 digits; allows +, spaces, dashes, dots and brackets. */
export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const v = String(control.value ?? '').trim();
  if (!v) return null;
  if (!/^\+?[0-9\s().-]+$/.test(v)) return { phone: true };
  const digits = v.replace(/\D/g, '').length;
  return digits >= 8 && digits <= 15 ? null : { phone: true };
}

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe, NgClass, ImgFallbackDirective],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly orders = inject(OrderService);
  readonly cart = inject(CartService);

  readonly countries = COUNTRIES;
  readonly payments: { value: PaymentMethod; title: string; text: string; icon: string }[] = [
    { value: 'cod', title: PAYMENT_LABELS.cod, text: 'Pay the courier when your shoes arrive.', icon: 'bi-cash-coin' },
    { value: 'aba', title: 'ABA PayWay', text: 'Demo option only. No real payment is made.', icon: 'bi-qr-code' },
    { value: 'card', title: 'Credit or debit card', text: 'Demo option only. We never ask for card numbers.', icon: 'bi-credit-card' },
  ];

  readonly submitting = signal(false);
  readonly formError = signal('');

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    phone: ['', [Validators.required, phoneValidator]],
    address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    city: ['', [Validators.required, Validators.maxLength(60)]],
    province: ['', [Validators.required, Validators.maxLength(60)]],
    postalCode: ['', [Validators.pattern(/^[A-Za-z0-9][A-Za-z0-9\s-]{1,9}$/)]],
    country: ['Cambodia', [Validators.required]],
    payment: ['cod' as PaymentMethod, [Validators.required]],
  });

  constructor() {
    // Hide the red banner as soon as the form becomes valid again.
    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe((status) => {
      if (status === 'VALID') this.formError.set('');
    });
    inject(SeoService).set({ title: 'Checkout', description: 'Demo checkout for the Outsole student store.', path: '/checkout', noIndex: true });
  }

  invalid(name: keyof CheckoutComponent['form']['controls']): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    this.formError.set('');
    if (this.submitting()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formError.set('Please fix the highlighted fields and try again.');
      queueMicrotask(() => this.host.nativeElement.querySelector<HTMLElement>('.is-invalid, [aria-invalid="true"]')?.focus());
      return;
    }
    this.submitting.set(true);
    const { payment, ...customer } = this.form.getRawValue();
    const result = this.orders.createOrder({ ...customer, fullName: customer.fullName.trim(), email: customer.email.trim(), phone: customer.phone.trim() }, payment);
    if (!result.ok) {
      this.formError.set(result.message);
      this.submitting.set(false);
      return;
    }
    this.router.navigate(['/order-confirmation'], { queryParams: { order: result.order.id } });
  }
}
