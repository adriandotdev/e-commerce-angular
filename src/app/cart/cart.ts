import { Component, inject } from '@angular/core';
import { CartContainer } from '../components/cart/cart-container/cart-container';
import { CartHeader } from '../components/cart/cart-header/cart-header';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CartHeader, CartContainer],
  template: `
    <div class="bg-[#F5F5F5] min-h-dvh py-4">
      <div class="max-w-7xl mx-auto">
        <app-cart-header />

        <app-cart-container [cartItems]="cartItems()" />

        <footer
          class="min-h-50 sticky bottom-0 flex justify-between items-end border-t border-white bg-white p-5"
        >
          <div class="space-x-6">
            <input type="checkbox" name="" id="" />
            <span class="text-black">Select All ({{ cartItems().length }})</span>
            <button>Delete</button>
          </div>

          <div class="flex gap-4 flex-1 justify-end">
            <div class="flex items-center gap-2">
              <span>Total ({{ 0 }} item):</span>
              <p class="text-orange-600 font-medium text-3xl">{{ formatPriceToPeso(0) }}</p>
            </div>
            <button class="bg-orange-600 text-white px-8 py-4 rounded-sm">Check Out</button>
          </div>
        </footer>
      </div>
    </div>
  `,
  styles: ``,
})
export class Cart {
  cartService = inject(CartService);

  cartItems = this.cartService.computedCart;

  formatPriceToPeso(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
