import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgmMotionDirective],
  template: `<header>
    <nav class="p-4 bg-white">
      <ul class="flex justify-between items-center gap-4 font-sans max-w-6xl mx-auto">
        @if (currentPath() === '/checkout') {
          <li routerLink="/products" class="font-medium text-2xl text-orange-600 cursor-pointer">
            Shopping | Checkout
          </li>
        } @else {
          <li routerLink="/products" class="font-medium text-3xl text-orange-600 cursor-pointer">
            Shopping
          </li>
        }

        <div class="flex items-center gap-6">
          <li routerLink="/cart" class="font-semibold cursor-pointer relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <div
              class="absolute -top-2 -right-3 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-orange-600 px-1 text-white shadow-sm ring-2 ring-white"
            >
              <span class="text-[11px] font-semibold leading-none">{{ itemCount() }}</span>
            </div>
          </li>

          <li>
            <div
              class="relative"
              (mouseenter)="showAccountOption(true)"
              (mouseleave)="showAccountOption(false)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              @if (showAccountOptions()) {
                <div
                  ngmMotion
                  [initial]="{ scale: 0 }"
                  [animate]="{ scale: 1 }"
                  [exit]="{ scale: 0 }"
                  class="absolute w-[150px] text-sm right-0 bg-white shadow-md p-4 z-50 border border-gray-300/20 top-full"
                >
                  <div
                    class="absolute right-1 -top-1.5  h-3 w-3 rotate-45 bg-white border-l border-t border-gray-300/20"
                  ></div>
                  <ul class="flex flex-col gap-3">
                    <li
                      routerLink="/user/account/profile"
                      class="cursor-pointer hover:text-orange-600"
                    >
                      My Account
                    </li>
                    <li class="cursor-pointer hover:text-orange-600">My Purchase</li>
                    <li (click)="logout()" class="cursor-pointer hover:text-orange-600">Logout</li>
                  </ul>
                </div>
              }
            </div>
          </li>
        </div>
      </ul>
    </nav>
  </header>`,
  styles: ``,
})
export class Header {
  cartService = inject(CartService);
  itemCount = this.cartService.cartCount;
  currentPath = signal('');
  showAccountOptions = signal(false);

  constructor(private router: Router) {
    // Initial path
    this.currentPath.set(this.router.url);

    // Update whenever route changes
    this.router.events.subscribe(() => {
      this.currentPath.set(this.router.url);
    });
  }

  showAccountOption(show: boolean) {
    this.showAccountOptions.set(show);
  }

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/signin']);
  }
}
