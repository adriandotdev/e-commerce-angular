import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { InfoModal } from '../../components/info-modal/info-modal';
import { Modal } from '../../services/modal';

@Component({
  selector: 'app-protected-layout',
  imports: [RouterOutlet, Header, InfoModal],
  template: `
    <app-header />
    <main
      [class]="this.modalService.showAddToCartModal() ? 'overflow-y-hidden' : 'overflow-y-auto'"
    >
      <router-outlet />

      @if (modalService.showAddToCartModal()) {
        <app-info-modal message="Product Added to Cart" />
      }
    </main>
  `,
  styles: ``,
})
export class ProtectedLayout {
  modalService = inject(Modal);

  constructor() {
    effect(() => {
      const isOpen = this.modalService.showAddToCartModal();

      document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    });
  }
}
