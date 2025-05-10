import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="admin-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 1rem;
    }
  `]
})
export class AdminComponent {}