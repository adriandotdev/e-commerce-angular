import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-header',
  imports: [],
  template: `
    <div class="flex justify-between px-5 bg-white items-center py-3">
      <div class="flex items-center gap-6  max-w-[500px] flex-1">
        <input type="checkbox" name="" id="" />
        <span class="font-semibold text-sm">Product</span>
      </div>
      <div class="grid grid-cols-[1fr_1fr_1fr_1fr] items-center flex-1 w-full gap-20">
        <div class="w-full text-center font-semibold text-sm">Unit Price</div>
        <div class="w-full text-center font-semibold text-sm">Quantity</div>
        <div class="w-full text-center font-semibold text-sm">Total Price</div>
        <div class="w-full text-center font-semibold text-sm">Actions</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CartHeader {}
