import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartType } from '../../models/product';
import { CartContainer } from '../components/cart/cart-container/cart-container';
import { CartHeader } from '../components/cart/cart-header/cart-header';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CartHeader, CartContainer, RouterLink],
  template: `
    <div class="bg-[#F5F5F5] min-h-dvh py-4">
      <div class="max-w-7xl mx-auto">
        <app-cart-header />

        <app-cart-container [cartItems]="cartItems()" />

        <footer
          class="shadow-sm ring-2 ring-white/20 max-w-6xl mx-auto min-h-50 mt-3 sticky bottom-0 flex justify-between items-end border-t border-white bg-white p-5"
        >
          <div class="space-x-6">
            <input
              name="footer-checkbox"
              id="footer-checkbox"
              type="checkbox"
              class="h-5 w-5 cursor-pointer rounded border-slate-300 accent-orange-600 focus:ring-2 focus:ring-orange-200 focus:ring-offset-1"
              #selectAllCheckbox
              [checked]="this.cartService.isCartEqual() && this.cartService.cartCount() !== 0"
              (change)="this.cartService.handleSelectAllCheckboxEvent(selectAllCheckbox.checked)"
              type="checkbox"
            />
            <label for="footer-checkbox" class="text-black cursor-pointer select-none"
              >Select All ({{ cartItems().length }})</label
            >
            <button (click)="removeSelectedProductsFromCart()" class="cursor-pointer">
              Delete
            </button>
          </div>

          <div class="flex gap-4 flex-1 justify-end items-end">
            <div class="flex items-center gap-2">
              <span>Total ({{ selectedItemCount() }} item):</span>
              <p class="text-orange-600 font-medium text-3xl">
                {{ formatPriceToPeso(this.cartService.totalOfSelectedItems()) }}
              </p>
            </div>
            <button
              (click)="checkout()"
              routerLink="/checkout"
              class="bg-orange-600 text-white px-12 py-3 rounded-sm cursor-pointer hover:bg-orange-600/80 transition-colors duration-200"
            >
              Check Out
            </button>
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
  selectedItemCount = computed(() => this.cartService.toCheckOutItems().length);

  checkout() {
    this.cartService.toOrderItems.set([...this.cartService.toCheckOutItems()]);
  }
  formatPriceToPeso(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  removeSelectedProductsFromCart() {
    const newCart: CartType = structuredClone(
      Object.fromEntries(
        Object.entries(this.cartService.cart()).filter(
          ([key]) => !this.cartService.toBeDeleted().some((num) => num === +key),
        ),
      ),
    );

    const newToCheckoutItems = this.cartService
      .toCheckOutItems()
      .filter(
        (product) => !this.cartService.toBeDeleted().some((num) => num === product.product.id),
      );

    this.cartService.cart.set(newCart);
    this.cartService.toCheckOutItems.set(newToCheckoutItems);

    this.cartService.toBeDeleted.set([]);
  }
}
