import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '@layout-services/menu.service';
import { MenuItem } from '@models/menu.model';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar-menu">
      <div *ngFor="let group of menuService.pagesMenu" 
           class="menu-group">
        <div class="group-header" (click)="menuService.toggleMenu(group)">
          <span class="group-title">{{ group.group }}</span>
          <span class="expand-icon" [class.expanded]="group.expanded">+</span>
        </div>
        
        <div class="menu-items" [class.expanded]="group.expanded">
          <a *ngFor="let item of group.items"
             [routerLink]="item.route"
             routerLinkActive="active"
             class="menu-item">
            <img [src]="item.icon" class="menu-icon" alt="">
            <span class="menu-label">{{ item.label }}</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-menu {
      width: 280px;
      height: 100%;
      border-right: 1px solid #e5e7eb;
      background: #fff;
    }

    .menu-group {
      padding: 0.5rem 0;
    }

    .group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .group-title {
      font-weight: 600;
      color: #374151;
    }

    .expand-btn {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid #e5e7eb;
      background: transparent;
      cursor: pointer;
    }

    .expanded {
      transform: rotate(45deg);
    }

    .menu-items {
      display: none;
      padding: 0.5rem 0;
    }

    .menu-items.expanded {
      display: block;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      color: #4b5563;
      text-decoration: none;
      transition: all 0.2s;
    }

    .menu-icon {
      width: 20px;
      height: 20px;
      margin-right: 0.75rem;
    }

    .menu-item:hover {
      background-color: #f3f4f6;
      color: #111827;
    }

    .menu-item.active {
      background-color: #f3f4f6;
      color: #111827;
      font-weight: 600;
    }
  `]
})
export class NavbarMenuComponent {
  constructor(public menuService: MenuService) {}
}
