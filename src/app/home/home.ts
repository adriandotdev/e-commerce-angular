import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError } from 'rxjs';
import { Products } from '../services/products';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="max-w-7xl mx-auto">
      <input
        class="outline outline-slate-400 w-full rounded-md placeholder:text-slate-400 px-4 py-2 focus:ring-4 focus:ring-slate-400/50 transition-all duration-300"
        type="text"
        name="search"
        id="search"
        placeholder="Search product"
      />

      <ul class="flex flex-wrap items-stretch gap-10 mt-5">
        @for (item of products(); track item.id) {
          <li class="flex-1 min-w-[250px]">
            <div
              class="border shadow-md p-2 rounded-lg border-gray-300 h-full flex flex-col justify-between"
            >
              <img [src]="item.image" class="h-[250px] aspect-square object-contain" alt="" />
              <span class="max-w-[250px] block mt-2 font-semibold">{{ item.title }}</span>
              <span class="font-bold text-xl mt-3">{{ formatPriceToPeso(item.price) }}</span>
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class Home implements OnInit {
  productService = inject(Products);
  products = signal<Array<Product>>([]);

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
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
