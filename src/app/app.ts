import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <main class="p-4">
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('angular-app');
}
