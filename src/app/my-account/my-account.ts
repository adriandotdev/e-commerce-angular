import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  imports: [ReactiveFormsModule],
  template: `<div class="w-full shadow-md border border-gray-200 rounded-md p-4">
    <h1 class="text-lg font-bold">My Profile</h1>
    <p>Manage and protect your account</p>
    <div class="border-[0.5px] border-black/20 mt-3"></div>

    <form [formGroup]="profileForm" class="ml-9" (ngSubmit)="handleSubmit()">
      <fieldset class="mt-4 grid grid-cols-[120px_300px] gap-3 items-center">
        <label for="username" class="text-right">Username</label>
        <input
          id="username"
          type="text"
          formControlName="username"
          class="border border-slate-300 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/35 focus:border-orange-500 transition w-full max-w-[300px]"
        />
      </fieldset>

      <fieldset class="mt-4 grid grid-cols-[120px_300px] gap-3 items-center">
        <label for="name" class="text-right">Name</label>
        <input
          id="name"
          type="text"
          formControlName="name"
          class="border border-slate-300 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/35 focus:border-orange-500 transition w-full max-w-[300px]"
        />
      </fieldset>

      <fieldset class="mt-4 grid grid-cols-[120px_300px] gap-3 items-center">
        <label for="email" class="text-right">Email</label>
        <input
          id="email"
          type="email"
          formControlName="email"
          class="border border-slate-300 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/35 focus:border-orange-500 transition w-full max-w-[300px]"
        />
      </fieldset>

      <fieldset class="mt-4 grid grid-cols-[120px_300px] gap-3 items-center">
        <label for="phoneNumber" class="text-right whitespace-nowrap">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          formControlName="phoneNumber"
          class="border border-slate-300 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/35 focus:border-orange-500 transition w-full max-w-[300px]"
        />
      </fieldset>

      <fieldset class="mt-4 grid grid-cols-[120px_300px] gap-3 items-center">
        <label class="text-right">Gender</label>
        <div>
          <label for="gender-male" class="mr-4">
            <input id="gender-male" type="radio" formControlName="gender" value="male" />
            Male
          </label>
          <label for="gender-female">
            <input id="gender-female" type="radio" formControlName="gender" value="female" />
            Female
          </label>
        </div>
      </fieldset>

      <div class="mt-4 grid grid-cols-[120px_300px] gap-3 items-center">
        <div></div>
        <button
          class="bg-orange-600 w-full max-w-35 py-3 mt-1 text-white font-semibold rounded-lg hover:bg-orange-700 active:scale-[0.99] transition"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  </div>`,
  styles: ``,
})
export class MyAccount {
  private formBuilder = inject(FormBuilder);

  profileForm = this.formBuilder.group({
    username: [''],
    name: [''],
    email: [''],
    phoneNumber: [''],
    gender: ['male'],
  });

  constructor() {
    const data = localStorage.getItem('profile');
    if (!data) {
      return;
    }

    try {
      const parsedData = JSON.parse(data) as ReturnType<typeof this.profileForm.getRawValue>;
      this.profileForm.patchValue(parsedData);
    } catch {
      localStorage.removeItem('profile');
    }
  }

  handleSubmit() {
    const values = this.profileForm.getRawValue();
    localStorage.setItem('profile', JSON.stringify(values));
  }
}
