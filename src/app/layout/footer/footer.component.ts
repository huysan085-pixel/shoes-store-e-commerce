import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../shared/logo/logo.component';
import { CATEGORIES } from '../../data/products.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly categories = CATEGORIES;
  readonly year = 2026;
}
