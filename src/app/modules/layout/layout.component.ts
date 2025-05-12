import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from './services/menu.service';
import { AuthService } from '@core/services/auth/auth.service';
import { LoggerService } from '@core/services/logger/logger.service';
import { NavbarMenuComponent } from './components/navbar/navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarMenuComponent
  ],
  template: `
    <div class="layout">
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <app-navbar-menu></app-navbar-menu>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
    }

    .sidebar {
      width: 280px;
      height: 100%;
      flex-shrink: 0;
    }

    .main-content {
      flex: 1;
      overflow: auto;
      padding: 1.5rem;
    }
  `]
})
export class LayoutComponent implements OnInit {
  constructor(
    public menuService: MenuService,
    private authService: AuthService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.initializeMenu();
  }

  private initializeMenu(): void {
    this.logger.log('init', 'Initializing layout menu...');
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.logger.log('auth', 'User authenticated, updating menu');
        this.menuService.setMenu(user);
      },
      error: () => {
        this.logger.log('auth', 'Using public menu');
        this.menuService.setMenu(null);
      }
    });
  }
}
