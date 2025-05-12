import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubMenuItem } from '@core/models/menu.model';
import { MenuService } from '@layout-services/menu.service'; 

@Component({
  selector: 'app-sidebar-submenu',
  standalone: true,
  templateUrl: './sidebar-submenu.component.html',
  imports: [
    CommonModule,
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    AngularSvgIconModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SidebarSubmenuComponent {
  @Input() submenu!: SubMenuItem;

  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem): void {
    this.menuService.toggleMenu(subMenu);
  }
}
