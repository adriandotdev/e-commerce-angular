import { Component, effect, inject, signal } from '@angular/core';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-checkout',
  imports: [],
  template: `
    <div class="bg-[#F5F5F5] min-h-dvh py-8">
      <div class="max-w-6xl mx-auto px-4 lg:px-0">
        <!-- Address Section -->
        <div class="address-dashed-border bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-orange-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <h2 class="text-lg text-orange-600">Delivery Address</h2>
          </div>
          <div class="flex justify-between flex-wrap mt-3 gap-3">
            <span>John Doe (+63) 931 234 4431</span>
            <span>Block 131 Lot 2 Cristellana Subdivision, Phase 3, South Hero, 4025</span>
          </div>
        </div>

        <!-- Products Ordered Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="space-y-4">
            <h2 class="text-xl font-md mb-4 text-gray-800 md:hidden">Order Summary</h2>
            <div
              class="hidden md:flex justify-between  bg-white items-center py-3 max-w-6xl mx-auto"
            >
              <div class="flex items-center gap-6  max-w-125 flex-1">
                <h2 class="text-xl font-md mb-4 text-gray-800">Order Summary</h2>
              </div>
              <div class="grid grid-cols-[1fr_1fr_1fr] items-center flex-1 w-full gap-20">
                <div class="w-full text-center font-semibold text-sm">Unit Price</div>
                <div class="w-full text-center font-semibold text-sm">Quantity</div>
                <div class="w-full text-center font-semibold text-sm">Item Subtotal</div>
              </div>
            </div>
            @for (item of cartService.toOrderItems(); track item.product.id) {
              <div
                class="flex items-center justify-between border-b border-gray-200 pb-4 md:hidden"
              >
                <div class="flex items-center gap-4 flex-1">
                  <img
                    [src]="item.product.image"
                    alt="{{ item.product.name }}"
                    class="w-16 h-16 object-contain rounded-md"
                  />
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800">{{ item.product.name }}</h3>
                    <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-orange-600">
                    {{ formatPriceToPeso(item.product.price * item.quantity) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ formatPriceToPeso(item.product.price) }} each
                  </p>
                </div>
              </div>

              <div
                class="hidden md:flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <div class="flex items-center gap-6  max-w-[510px] flex-1">
                  <img
                    [src]="item.product.image"
                    alt="{{ item.product.name }}"
                    class="w-16 h-16 object-contain rounded-md"
                  />
                  <div class="flex-1">
                    <p class="text-sm text-gray-500">Quantity: {{ item.product.title }}</p>
                  </div>
                </div>
                <div class="grid grid-cols-[1fr_1fr_1fr] items-center flex-1 w-full gap-20">
                  <div class="w-full text-center font-semibold text-sm">
                    {{ formatPriceToPeso(item.product.price) }}
                  </div>
                  <div class="w-full text-center font-semibold text-sm">{{ item.quantity }}</div>
                  <div class="w-full text-center font-semibold text-sm">
                    {{ formatPriceToPeso(item.product.price * item.quantity) }}
                  </div>
                </div>
                <!-- <div class="text-right">
                  <p class="font-semibold text-orange-600">
                    {{ formatPriceToPeso(item.product.price * item.quantity) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ formatPriceToPeso(item.product.price) }} each
                  </p>
                </div> -->
              </div>
            }
          </div>
        </div>

        <!-- Payment Methods Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-xl font-md mb-4 text-gray-800">Payment Method</h2>
          <div class="space-y-3">
            <label
              class="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="payment"
                value="credit-card"
                [checked]="selectedPaymentMethod() === 'credit-card'"
                (change)="selectedPaymentMethod.set('credit-card')"
                class="w-4 h-4 accent-orange-600"
              />
              <span class="ml-3 text-gray-800 font-medium">Credit/Debit Card</span>
            </label>
            <label
              class="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="payment"
                value="gcash"
                [checked]="selectedPaymentMethod() === 'gcash'"
                (change)="selectedPaymentMethod.set('gcash')"
                class="w-4 h-4 accent-orange-600"
              />
              <span class="ml-3 text-gray-800 font-medium">GCash</span>
            </label>
            <label
              class="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                [checked]="selectedPaymentMethod() === 'cod'"
                (change)="selectedPaymentMethod.set('cod')"
                class="w-4 h-4 accent-orange-600"
              />
              <span class="ml-3 text-gray-800 font-medium">Cash on Delivery</span>
            </label>
          </div>
        </div>

        <!-- Total and Place Order Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg text-gray-700">Subtotal:</span>
            <span class="text-lg font-semibold text-gray-800">
              {{ formatPriceToPeso(calculateSubtotal()) }}
            </span>
          </div>
          <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <span class="text-lg text-gray-700">Shipping:</span>
            <span class="text-lg font-semibold text-gray-800">
              {{ formatPriceToPeso(0) }}
            </span>
          </div>
          <div class="flex justify-between items-center mb-6">
            <span class="text-xl font-bold text-gray-800">Total:</span>
            <span class="text-3xl font-bold text-orange-600">
              {{ formatPriceToPeso(calculateSubtotal()) }}
            </span>
          </div>
          <button
            class="w-full bg-orange-600 text-white py-3 rounded-md font-semibold cursor-pointer hover:bg-orange-600/80 transition-colors duration-200"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .address-dashed-border {
      position: relative;
      overflow: hidden;
    }

    .address-dashed-border::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        #3b82f6 0 12px,
        transparent 12px 20px,
        #f97316 20px 32px,
        transparent 32px 40px
      );
    }
  `,
})
export class Checkout {
  cartService = inject(CartService);
  selectedPaymentMethod = signal<string>('credit-card');

  constructor() {
    effect(() => {
      console.log(this.cartService.toCheckOutItems());
    });
  }
  formatPriceToPeso(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  calculateSubtotal() {
    return this.cartService.toOrderItems().reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }
}
