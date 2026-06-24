import { Component, input } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';

@Component({
  selector: 'app-info-modal',
  imports: [NgmMotionDirective],
  template: ` <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
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

      <h1 class="text-orange-600 text-xl font-medium">{{ message() }}</h1>
    </div>
  </div>`,
  styles: ``,
})
export class InfoModal {
  message = input();
}
