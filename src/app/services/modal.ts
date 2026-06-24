import { effect, Service, signal } from '@angular/core';

@Service()
export class Modal {
  showAddToCartModal = signal(false);
  showInfoModal = signal(false);
  infoMessage = signal('');

  private infoModalTimeout: ReturnType<typeof setTimeout> | null = null;
  private cartModalTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      if (!this.showInfoModal()) {
        return;
      }

      if (this.infoModalTimeout !== null) {
        clearTimeout(this.infoModalTimeout);
      }

      this.infoModalTimeout = setTimeout(() => {
        this.showInfoModal.set(false);
        this.infoModalTimeout = null;
      }, 1300);
    });

    effect(() => {
      if (!this.showAddToCartModal()) return;

      console.log('useeffect');
      const timeout = this.cartModalTimeout;

      if (this.cartModalTimeout !== null) {
        clearTimeout(this.cartModalTimeout);
      }

      this.cartModalTimeout = setTimeout(() => {
        this.showAddToCartModal.set(false);
        this.cartModalTimeout = null;
      }, 1300);
    });
  }

  openInfo(message: string) {
    this.infoMessage.set(message);
    this.showInfoModal.set(true);
  }
}
