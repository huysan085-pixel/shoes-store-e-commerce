import { Directive, HostListener, input } from '@angular/core';
import { PLACEHOLDER_IMAGE } from '../data/products.data';

/** If an image fails to load, show the placeholder instead of a broken icon. */
@Directive({ selector: 'img[appImgFallback]' })
export class ImgFallbackDirective {
  readonly appImgFallback = input<string>(PLACEHOLDER_IMAGE);

  @HostListener('error', ['$event'])
  onError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const fallback = this.appImgFallback() || PLACEHOLDER_IMAGE;
    if (!img.src.endsWith(fallback)) img.src = fallback;
  }
}
