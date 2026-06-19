import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import type { TargetAndTransition, Transition } from 'motion-dom';
import { catchError, finalize } from 'rxjs';
import { Product as ProductType } from '../../models/product';
import { CartService } from '../services/cart';
import { Products } from '../services/products';
@Component({
  selector: 'app-product',
  imports: [NgmMotionDirective],
  template: `
    @if (isFetching()) {
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div
          class="w-full rounded-2xl md:border border-orange-100 bg-white/95 p-5 sm:p-7 md:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
        >
          <div class="grid gap-6 md:grid-cols-[minmax(280px,380px)_1fr] items-start">
            <div class="animate-pulse bg-slate-200 rounded-xl aspect-square"></div>
            <div class="space-y-4 w-full">
              <div class="animate-pulse bg-slate-200 h-9 rounded-lg w-full max-w-150"></div>
              <div class="animate-pulse bg-slate-200 h-5 rounded w-full max-w-95"></div>
              <div class="animate-pulse bg-slate-200 h-24 rounded-lg w-full"></div>
              <div class="animate-pulse bg-slate-200 h-10 rounded w-32"></div>
              <div class="animate-pulse bg-slate-200 h-11 rounded-lg w-full max-w-64"></div>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="max-w-6xl mx-auto py-6">
        <div class="w-full rounded-2xl border-orange-100 bg-white/95 p-5 sm:p-7">
          <div class="grid gap-6 md:grid-cols-[minmax(280px,380px)_1fr] items-start">
            <div
              ngmMotion
              [initial]="productImageInitial"
              [animate]="productImageAnimate"
              [transition]="productImageTransition"
              class="bg-slate-50 border border-slate-200 rounded-xl p-6"
            >
              <img
                [src]="product()?.image"
                class="w-full aspect-square object-contain"
                [alt]="product()?.title ?? 'Product image'"
              />
            </div>

            <div class="space-y-5">
              <div class="space-y-3">
                <p
                  ngmMotion
                  [initial]="productContentInitial"
                  [animate]="productContentAnimate"
                  [transition]="{ ...productContentTransition, delay: 0 * 0.06 }"
                  class="text-xs uppercase tracking-[0.18em] font-semibold text-orange-600"
                >
                  Product
                </p>
                <h1
                  ngmMotion
                  [initial]="productContentInitial"
                  [animate]="productContentAnimate"
                  [transition]="{ ...productContentTransition, delay: 1 * 0.06 }"
                  class="text-2xl sm:text-3xl font-bold text-slate-900 text-left"
                >
                  {{ product()?.title }}
                </h1>

                <div class="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span
                    ngmMotion
                    [initial]="productContentInitial"
                    [animate]="productContentAnimate"
                    [transition]="{ ...productContentTransition, delay: 2 * 0.06 }"
                    class="font-semibold text-slate-700"
                    >{{ product()?.rating?.rate }} / 5</span
                  >
                  <span class="text-slate-400">|</span>
                  <span
                    ngmMotion
                    [initial]="productContentInitial"
                    [animate]="productContentAnimate"
                    [transition]="{ ...productContentTransition, delay: 3 * 0.06 }"
                    >{{ product()?.rating?.count }} reviews</span
                  >
                  <div class="flex text-amber-400">
                    @for (item of [1, 2, 3, 4, 5]; track $index) {
                      <svg
                        ngmMotion
                        [initial]="productContentInitial"
                        [animate]="productContentAnimate"
                        [transition]="{ ...productContentTransition, delay: $index * 0.06 }"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="0"
                        class="size-4"
                      >
                        <path
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    }
                  </div>
                </div>
              </div>

              <p
                ngmMotion
                [initial]="productContentInitial"
                [animate]="productContentAnimate"
                [transition]="{ ...productContentTransition, delay: 4 * 0.06 }"
                class="text-slate-600 leading-relaxed"
              >
                {{ product()?.description }}
              </p>

              <p
                ngmMotion
                [initial]="productContentInitial"
                [animate]="productContentAnimate"
                [transition]="{ ...productContentTransition, delay: 5 * 0.06 }"
                class="text-3xl sm:text-4xl font-bold text-slate-900"
              >
                {{ formatPriceToPeso(product()?.price ?? 0) }}
              </p>

              <div
                ngmMotion
                [initial]="productContentInitial"
                [animate]="productContentAnimate"
                [transition]="{ ...productContentTransition, delay: 6 * 0.06 }"
                class="flex items-center gap-4"
              >
                <span class="font-semibold text-slate-800">Quantity</span>
                <div class="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    (click)="decrementQuantity()"
                    class="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-slate-100 disabled:opacity-40 transition"
                    [disabled]="quantity() <= 1"
                  >
                    -
                  </button>
                  <span class="w-10 text-center font-semibold">{{ quantity() }}</span>
                  <button
                    (click)="incrementQuantity()"
                    class="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-slate-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="flex w-full gap-3 flex-col sm:flex-row sm:max-w-md">
                <button
                  ngmMotion
                  [initial]="productContentInitial"
                  [animate]="productContentAnimate"
                  [transition]="{ ...productContentTransition, delay: 7 * 0.06 }"
                  (click)="addToCart()"
                  class="border border-orange-300 px-5 py-3 bg-orange-300/10 text-orange-700 font-semibold rounded-lg w-full hover:bg-orange-300/20 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  ngmMotion
                  [initial]="productContentInitial"
                  [animate]="productContentAnimate"
                  [transition]="{ ...productContentTransition, delay: 8 * 0.06 }"
                  class="border border-orange-300 px-5 py-3 bg-orange-600 text-white font-semibold rounded-lg w-full hover:bg-orange-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class Product implements OnInit {
  private productService = inject(Products);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  isFetching = signal<Boolean>(false);
  product = signal<ProductType | null>(null);
  quantity = signal(1);
  id = this.route.snapshot.paramMap.get('id');

  productImageInitial: TargetAndTransition = {
    opacity: 0,
    scale: 0,
  };

  productImageAnimate: TargetAndTransition = {
    opacity: 1,
    scale: 1,
  };

  productImageTransition: Transition = {
    duration: 0.3,
    type: 'spring',
    damping: 15,
  };

  productContentInitial: TargetAndTransition = {
    opacity: 0,
    y: 70,
  };

  productContentAnimate: TargetAndTransition = {
    opacity: 1,
    y: 0,
  };

  productContentTransition: Transition = {
    duration: 0.3,
    type: 'spring',
    damping: 15,
    delay: 0.06,
  };

  ngOnInit(): void {
    this.isFetching.set(true);

    this.productService
      .getProductById(Number(this.id ?? 0))
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),
        finalize(() => {
          this.isFetching.set(false);
        }),
      )
      .subscribe((data) => {
        this.product.set(data);
      });
  }

  incrementQuantity() {
    this.quantity.update((q) => q + 1);
  }

  decrementQuantity() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  formatPriceToPeso(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value);
  }

  addToCart() {
    const product = this.product();
    if (product !== null) {
      this.cartService.addToProductCart(product, this.quantity());
    }
  }
}
