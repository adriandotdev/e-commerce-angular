import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { Product } from '../../models/product';
import { Products } from '../services/products';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="max-w-7xl mx-auto">
      <input
        class="outline outline-slate-400 w-full rounded-md placeholder:text-slate-400 px-4 py-2 focus:ring-4 focus:ring-slate-400/50 transition-all duration-300"
        type="text"
        name="search"
        id="search"
        placeholder="Search product"
      />

      @if (isProductLoading()) {
        <div class="flex flex-col gap-4 justify-center items-center h-[50dvh]">
          <div
            class="animate-spin border-t-3 border-l-2 border-r-2 rounded-full border-black w-10 h-10"
          ></div>
          <span class="font-bold">Please wait...</span>
        </div>
      } @else {
        <ul class="flex flex-wrap items-stretch gap-6 mt-5">
          @for (item of products(); track item.id) {
            <li
              [routerLink]="['/products', item.id]"
              class="flex-1 min-w-62.5 group cursor-pointer"
            >
              <div
                class="border shadow-md p-2 rounded-lg border-gray-300 h-full flex flex-col justify-between group-hover:border-orange-600 transition-transform duration-300"
              >
                <img [src]="item.image" class="h-62.5 aspect-square object-contain" alt="" />
                <span class="max-w-62.5 block mt-2 font-semibold">{{ item.title }}</span>
                <div class="flex items-center mt-3 justify-between">
                  <span class="font-bold text-xl">{{ formatPriceToPeso(item.price) }}</span>
                  <span>{{ item.rating.rate }}</span>
                </div>
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
}
