import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 1;

  show(message: string, type: Toast['type'] = 'success'): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list.slice(-2), { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3500);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
