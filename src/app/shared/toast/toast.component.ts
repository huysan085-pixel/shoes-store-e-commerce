import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-region" aria-live="polite" aria-atomic="false">
      @for (t of toasts.toasts(); track t.id) {
        <div class="toast-item" [class.error]="t.type === 'error'" role="status">
          <i class="bi" [class.bi-check-circle-fill]="t.type === 'success'" [class.bi-exclamation-circle-fill]="t.type === 'error'" aria-hidden="true"></i>
          <span>{{ t.message }}</span>
          <button type="button" aria-label="Dismiss message" (click)="toasts.dismiss(t.id)"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        </div>
      }
    </div>
  `,
  styles: `
    .toast-region { position: fixed; z-index: 1900; right: 1rem; bottom: 1rem; display: grid; gap: 0.5rem; width: min(380px, calc(100vw - 2rem)); }
    .toast-item { display: flex; align-items: center; gap: 0.7rem; background: var(--os-black); color: #fff; padding: 0.85rem 1rem; border-radius: var(--os-radius);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.28); font-size: 0.92rem; animation: rise 0.25s var(--os-ease); }
    .toast-item i:first-child { color: #7dffa8; font-size: 1.1rem; }
    .toast-item.error i:first-child { color: #ff9b9b; }
    .toast-item span { flex: 1; }
    button { background: none; border: 0; color: #fff; opacity: 0.7; cursor: pointer; padding: 0.25rem; &:hover { opacity: 1; } }
    @keyframes rise { from { transform: translateY(10px); opacity: 0; } to { transform: none; opacity: 1; } }
  `,
})
export class ToastComponent {
  readonly toasts = inject(ToastService);
}
