import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { catchError, finalize } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../services/cart';
import { Products } from '../services/products';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgmMotionDirective],
  template: `
    <div class="max-w-6xl mx-auto mt-4 my-20 px-4 md:p-0">
      <div class="relative">
        <div ngmMotion [initial]="{ opacity: 0 }" [animate]="{ opacity: 1 }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-4.35-4.35m1.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
            />
          </svg>
        </div>

        <input
          ngmMotion
          [initial]="{ opacity: 0 }"
          [animate]="{ opacity: 1 }"
          class="w-full rounded-xl border border-orange-100 bg-white/95 py-3 pr-4 pl-11 text-slate-800 placeholder:text-slate-400 shadow-[0_10px_24px_rgba(15,23,42,0.08)] focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-200/70 transition"
          type="text"
          name="search"
          id="search"
          placeholder="Search products"
        />
      </div>

      @if (isProductLoading()) {
        <div class="flex flex-col gap-4 justify-center items-center h-[50dvh]">
          <div
            class="animate-spin border-t-3 border-l-2 border-r-2 rounded-full border-black w-10 h-10"
          ></div>
          <span class="font-bold">Please wait...</span>
        </div>
      } @else {
        <ul class="flex flex-wrap items-stretch gap-6 mt-5">
          @for (item of products(); track item.id; let i = $index) {
            <li
              ngmMotion
              [initial]="{ opacity: 0, y: 50 }"
              [animate]="{ opacity: 1, y: 0 }"
              [transition]="{ type: 'spring', stiffness: 300, damping: 24, delay: i * 0.06 }"
              class="flex-1 min-w-62.5 group relative"
            >
              <a [routerLink]="['/products', item.id]" class="block h-full focus:outline-none">
                <div
                  class="h-full rounded-xl border border-orange-100 bg-white/95 p-3 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_rgba(15,23,42,0.12)] group-hover:border-orange-300"
                >
                  <div class="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <img
                      [src]="item.image"
                      class="h-56 w-full aspect-square object-contain"
                      [alt]="item.title"
                    />
                  </div>

                  <span class="block mt-3 min-h-12 font-semibold text-slate-900 leading-5">{{
                    item.title
                  }}</span>

                  <div class="flex items-center mt-3 justify-between">
                    <span class="font-bold text-xl text-slate-900">{{
                      formatPriceToPeso(item.price)
                    }}</span>
                    <span
                      class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700"
                    >
                      <span>★</span>
                      <span>{{ item.rating.rate }}</span>
                    </span>
                  </div>
                </div>
              </a>
              <div
                class="absolute z-50 inset-x-0 overflow-hidden max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-focus-within:max-h-20 group-focus-within:opacity-100 transition-all duration-200"
              >
                <button
                  (click)="addToCart(item)"
                  class="w-full rounded-lg border border-orange-300 bg-orange-600 text-white px-4 py-2.5 font-semibold hover:bg-orange-600/80 transition"
                >
                  Add To Cart
                </button>
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: ``,
})
export class Home implements OnInit {
  productService = inject(Products);
  cartService = inject(CartService);
  products = signal<Array<Product>>([]);
  isProductLoading = signal<Boolean>(false);

  ngOnInit(): void {
    this.isProductLoading.set(true);

    this.productService
      .getProducts()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        }),
        finalize(() => {
          this.isProductLoading.set(false);
        }),
      )
      .subscribe((products) => {
        this.products.set(products);
      });
  }

  formatPriceToPeso(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value);
  }

  addToCart(product: Product) {
    this.cartService.addToProductCart(product, 1);
  }
}
