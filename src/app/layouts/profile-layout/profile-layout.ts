import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InfoModal } from '../../components/info-modal/info-modal';
import { Modal } from '../../services/modal';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, InfoModal],
  template: `<div
    class="max-w-6xl mx-auto grid grid-cols-[0.3fr_1fr] gap-4"
    [class]="this.modalService.showInfoModal() ? 'overflow-y-hidden' : 'overflow-y-auto'"
  >
    <div class="shadow-md rounded-md border border-gray-200">
      <ul class="pl-5 py-5">
        <li class="hover:text-orange-600 cursor-pointer" routerLink="/user/account/profile">
          My Account
        </li>
        <ul class="pl-4 pt-2 space-y-2">
          <li
            class="cursor-pointer hover:text-orange-600"
            routerLink="/user/account/profile"
            routerLinkActive="text-orange-600 font-semibold"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Profile
          </li>
          <li
            class="cursor-pointer hover:text-orange-600 not-active:text-black/50"
            routerLink="/user/account/address"
            routerLinkActive="text-orange-600 font-semibold"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Address
          </li>
        </ul>
      </ul>
    </div>
    <div>
      <router-outlet />
      @if (this.modalService.showInfoModal()) {
        <app-info-modal [message]="this.modalService.infoMessage()" />
      }
    </div>
  </div>`,
  styles: ``,
})
export class ProfileLayout {
  modalService = inject(Modal);

  constructor() {
    effect(() => {
      const isOpen = this.modalService.showAddToCartModal();

      document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    });
  }
}
