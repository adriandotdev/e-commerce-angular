import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `<header>
    <nav class="p-4 bg-slate-950 text-white">
      <ul class="flex items-center gap-4 font-sans max-w-7xl mx-auto">
        <li routerLink="/products" class="font-semibold cursor-pointer">Products</li>
        <li routerLink="/cart" class="font-semibold cursor-pointer">Cart</li>
      </ul>
    </nav>
  </header>`,
  styles: ``,
})
export class Header {}
