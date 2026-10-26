import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor() {
    inject(SeoService).set({
      title: 'About',
      description: 'Outsole is a demo sneaker store built as a university midterm project with Angular server-side rendering.',
      path: '/about',
    });
  }
}
