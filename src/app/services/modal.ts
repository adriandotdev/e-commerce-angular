import { Service, signal } from '@angular/core';

@Service()
export class Modal {
  showAddToCartModal = signal(false);
}
