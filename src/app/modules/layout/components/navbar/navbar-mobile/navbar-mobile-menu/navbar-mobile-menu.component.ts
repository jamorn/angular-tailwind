import { NgClass, NgFor, NgIf, NgTemplateOutlet, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuItem, SubMenuItem } from '@models/menu.model';
import { MenuService } from '@layout-services/menu.service'; 
import { NavbarMobileSubmenuComponent } from '../navbar-mobile-submenu/navbar-mobile-submenu.component';

@Component({
  selector: 'app-navbar-mobile-menu',
  templateUrl: './navbar-mobile-menu.component.html',
  styleUrls: ['./navbar-mobile-menu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgClass,
    AngularSvgIconModule,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NavbarMobileSubmenuComponent
  ]
})
export class NavbarMobileMenuComponent {
  constructor(public menuService: MenuService) {}

  public toggleMenu(item: MenuItem | SubMenuItem): void {
    this.menuService.toggleMenu(item);
  }

  public closeMenu(): void {
    this.menuService.showMobileMenu = false;
  }

  protected convertToSubMenuItem(item: MenuItem): SubMenuItem {
    return {
      ...item,
      route: item.route || '/',
      label: item.label
    };
  }
}
