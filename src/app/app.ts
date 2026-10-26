import { Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToastComponent } from './shared/toast/toast.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly cart = inject(CartService);

  constructor() {
    // Runs only in the browser, after hydration. Keeps the server HTML free of customer data.
    afterNextRender(() => this.cart.restore());
  }
}
