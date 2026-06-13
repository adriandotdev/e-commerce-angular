import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-protected-layout',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
  `,
  styles: ``,
})
export class ProtectedLayout {}
