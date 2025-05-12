import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '@layout-services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    NavbarMenuComponent
  ],
  template: `
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Brand -->
            <div class="flex items-center">
              <span class="text-lg font-semibold">plbg-dashboard</span>
            </div>
            <!-- Navigation -->
            <app-navbar-menu class="ml-8"></app-navbar-menu>
          </div>
          <!-- Version -->
          <div class="flex items-center">
            <span class="text-sm text-gray-500">v0.10.1</span>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
  `]
})
export class NavbarComponent {
  constructor(public menuService: MenuService) {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
