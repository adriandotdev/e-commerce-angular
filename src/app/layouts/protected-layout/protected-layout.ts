import { Component, effect, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { Header } from '../../components/header/header';
import { Modal } from '../../services/modal';

@Component({
  selector: 'app-protected-layout',
  imports: [RouterOutlet, Header, NgmMotionDirective],
  template: `
    <app-header />
    <main
      [class]="this.modalService.showAddToCartModal() ? 'overflow-y-hidden' : 'overflow-y-auto'"
    >
      <router-outlet />

      @if (modalService.showAddToCartModal()) {
        <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div
            ngmMotion
            [initial]="{ y: 100, opacity: 0 }"
            [animate]="{ y: 0, opacity: 1 }"
            [transition]="{ duration: 0.3, type: 'spring', damping: 15 }"
            class="bg-white shadow-md border border-gray-200 max-w-[300px] w-full min-h-[150px] py-15 rounded-lg flex flex-col justify-center items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-12 text-green-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h1 class="text-orange-600 text-xl font-medium">Product Added to Cart</h1>
          </div>
        </div>
      }
    </main>
  `,
  styles: ``,
})
export class ProtectedLayout implements OnDestroy {
  modalService = inject(Modal);
  private modalTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      if (!this.modalService.showAddToCartModal()) return;

      console.log('useeffect');
      const timeout = this.modalTimeout;

      if (this.modalTimeout !== null) {
        clearTimeout(this.modalTimeout);
      }

      this.modalTimeout = setTimeout(() => {
        this.modalService.showAddToCartModal.set(false);
        this.modalTimeout = null;
      }, 1300);
    });

    effect(() => {
      const isOpen = this.modalService.showAddToCartModal();

      document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    });
  }

  ngOnDestroy(): void {
    if (this.modalTimeout !== null) {
      clearTimeout(this.modalTimeout);

      document.body.style.overflowY = 'auto';
    }
  }
}
