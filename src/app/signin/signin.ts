import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  template: `
    <div class="mx-auto max-w-7xl flex justify-center min-h-dvh items-center px-4 py-8">
      <form
        [formGroup]="signinForm"
        (ngSubmit)="signIn()"
        class="w-full max-w-107.5 rounded-2xl md:border border-orange-100 bg-white/95 p-6 sm:p-8 md:shadow-[0_16px_40px_rgba(15,23,42,0.08)] flex flex-col items-center gap-5"
      >
        <header class="w-full max-w-95 text-left">
          <p class="text-xs uppercase tracking-[0.18em] font-semibold text-orange-600">
            Welcome back
          </p>
          <h1 class="mt-2 text-2xl font-bold text-slate-900">Login to your account</h1>
          <p class="mt-1 text-sm text-slate-500">
            Track orders, manage your cart, and checkout faster.
          </p>
        </header>

        <section class="flex flex-col w-full max-w-95 gap-2">
          <label for="username" class="font-medium text-slate-800">Username</label>
          <input
            formControlName="username"
            placeholder="Phone number / Username / Email"
            class="border border-slate-300 bg-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/35 focus:border-orange-500 transition"
            type="text"
            name="username"
            id="username"
            autocomplete="username"
          />
        </section>

        <section class="flex flex-col w-full max-w-95 gap-2">
          <div class="flex items-center justify-between">
            <label for="password" class="font-medium text-slate-800">Password</label>
            <a href="#" class="text-sm font-medium text-orange-700 hover:text-orange-800"
              >Forgot?</a
            >
          </div>
          <input
            formControlName="password"
            placeholder="Password"
            class="border border-slate-300 bg-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600/35 focus:border-orange-500 transition"
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
          />
        </section>

        <button
          type="submit"
          class="bg-orange-600 w-full max-w-95 py-3 mt-1 text-white font-semibold rounded-lg hover:bg-orange-700 active:scale-[0.99] transition"
        >
          Login
        </button>

        <p class="w-full max-w-95 text-center text-sm text-slate-600">
          New customer?
          <a href="#" class="font-semibold text-orange-700 hover:text-orange-800">Create account</a>
        </p>
      </form>
    </div>
  `,
  styles: ``,
})
export class Signin {
  router = inject(Router);
  signinForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  signIn() {
    if (
      this.signinForm.value.username === 'username' &&
      this.signinForm.value.password === 'password'
    ) {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/products']);
    }
  }
}
