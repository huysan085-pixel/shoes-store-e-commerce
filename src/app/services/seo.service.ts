import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Change this to your real domain after deploying (used for canonical links). */
export const SITE_URL = 'https://outsole-demo.example.com';
const SITE_NAME = 'Outsole';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(opts: { title: string; description: string; path: string; image?: string; noIndex?: boolean }): void {
    const fullTitle = opts.title === SITE_NAME ? `${SITE_NAME} | Sneakers, sized right` : `${opts.title} | ${SITE_NAME}`;
    const url = SITE_URL + opts.path;
    const image = SITE_URL + (opts.image ?? '/images/shoes/nike-air-force-1-07-1.svg');
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: opts.description });
    this.meta.updateTag({ name: 'robots', content: opts.noIndex ? 'noindex,nofollow' : 'index,follow' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: opts.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.setCanonical(url);
    this.setJsonLd(null);
  }

  /** Adds product structured data for search engines. Pass null to remove it. */
  setJsonLd(data: object | null): void {
    const id = 'ld-json';
    this.doc.getElementById(id)?.remove();
    if (!data) return;
    const script = this.doc.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
