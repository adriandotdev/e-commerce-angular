import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `<div class="max-w-6xl mx-auto grid grid-cols-[0.3fr_1fr] gap-4">
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
    </div>
  </div>`,
  styles: ``,
})
export class ProfileLayout {}
