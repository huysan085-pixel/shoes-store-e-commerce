import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <span class="logo">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="7" fill="currentColor" />
        <path d="M6 20.5c3.2-.4 5-2.6 6.2-5.8 1.4 1.7 3.4 2.6 6 2.9 2.8.3 5.2 1.1 7.8 3.4v1.8H6z" fill="var(--logo-bg, #fff)" />
        <path d="M6 24.5h20" stroke="var(--os-accent)" stroke-width="2.4" stroke-linecap="round" />
      </svg>
      <span class="word">outsole</span>
    </span>
  `,
  styles: `
    .logo { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--logo-color, var(--os-black)); }
    .word { font-weight: 800; font-size: 1.45rem; letter-spacing: -0.04em; line-height: 1; }
  `,
})
export class LogoComponent {
}
