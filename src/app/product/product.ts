import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { Product as ProductType } from '../../models/product';
import { Products } from '../services/products';
@Component({
  selector: 'app-product',
  imports: [],
  template: `
    @if (isFetching()) {
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row md:gap-4 pt-5">
        <div
          class="md:max-w-[450px] w-full animate-pulse bg-gray-300  aspect-square object-contain"
          alt=""
        ></div>
        <div class="mt-6 w-full">
          <div class="space-y-4">
            <div class="md:text-left animate-pulse bg-gray-300  max-w-[550px] w-full h-10"></div>
            <div class="animate-pulse bg-gray-300 h-10 max-w-100"></div>
            <div class="animate-pulse bg-gray-300 h-10 max-w-200"></div>
          </div>
          <div class="mt-4 animate-pulse bg-gray-300 h-10 max-w-100"></div>

          <div class="mt-5 animate-pulse bg-gray-300 h-10 max-w-50"></div>

          <div class="mt-5 animate-pulse bg-gray-300 h-30 max-w-100"></div>
        </div>
      </div>
    } @else {
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row md:gap-4 pt-5">
        <img
          [src]="product()?.image"
          class="md:max-w-[450px] aspect-square object-contain"
          alt=""
        />
        <div class="mt-6">
          <div class="space-y-4">
            <h1 class="text-3xl font-bold text-center md:text-left">{{ product()?.title }}</h1>
            <div class="space-x-6 flex justify-center md:justify-start">
              <span class="font-semibold underline text-md"
                >{{ product()?.rating?.rate }} Ratings</span
              >
              <div class="flex gap-2">
                <span class="font-semibold text-md">{{ product()?.rating?.count }}</span>
                <div class="flex">
                  @for (item of [1, 2, 3, 4, 5]; track $index) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="yellow"
                      viewBox="0 0 24 24"
                      stroke-width="0.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  }
                </div>
              </div>
            </div>
            <p class="text-center md:text-left">{{ product()?.description }}</p>
          </div>
          <p class="text-5xl text-center my-4 md:text-left">
            {{ formatPriceToPeso(product()?.price ?? 0) }}
          </p>

          <div
            class="mt-4 flex items-center gap-2 items-center flex-col md:flex-row items-center md:gap-6"
          >
            <span class="font-semibold">Quantity</span>
            <div class="flex items-center gap-3 mt-2 border border-gray-300">
              <button
                (click)="decrement()"
                class="w-8 border-r h-8 flex items-center justify-center border-gray-300 text-lg font-bold hover:bg-gray-100 disabled:opacity-40"
                [disabled]="quantity() <= 1"
              >
                −
              </button>
              <span class="w-8 text-center font-semibold">{{ quantity() }}</span>
              <button
                (click)="increment()"
                class="w-8 h-8 border-l flex items-center justify-center border-gray-300 text-lg font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div class="mt-5 flex w-full gap-3 flex-col md:flex-row md:gap-5">
            <button
              class="border-orange-300 border flex px-6 py-4 space-x-3 bg-orange-300/10 md:max-w-[180px] w-full justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 stroke-orange-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span class="text-orange-600">Add To Cart</span>
            </button>
            <button
              class="border border-orange-300 px-6 py-4 bg-orange-600 text-white font-semibold md:max-w-[180px] w-full justify-center cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class Product implements OnInit {
  private productService = inject(Products);
  private route = inject(ActivatedRoute);

  isFetching = signal<Boolean>(false);
  product = signal<ProductType | null>(null);
  quantity = signal(1);
  id = this.route.snapshot.paramMap.get('id');

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

  increment() {
    this.quantity.update((q) => q + 1);
  }

  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  formatPriceToPeso(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value);
  }
}
