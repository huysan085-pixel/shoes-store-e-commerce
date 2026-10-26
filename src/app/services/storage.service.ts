import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * SSR-safe wrapper around localStorage.
 * On the server every call returns the fallback and never touches `localStorage`.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get<T>(key: string, fallback: T): T {
    if (!this.isBrowser) return fallback;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  /** Returns false if the value could not be saved (private mode, quota, server). */
  set(key: string, value: unknown): boolean {
    if (!this.isBrowser) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}
