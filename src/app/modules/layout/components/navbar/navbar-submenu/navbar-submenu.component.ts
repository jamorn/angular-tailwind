import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '@models/menu.model';

@Component({
  selector: 'app-navbar-submenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="submenu-container" *ngIf="submenu">
      <a *ngFor="let item of submenu.children"
         [routerLink]="item.route"
         routerLinkActive="active">
        {{ item.label }}
      </a>
    </div>
  `
})
export class NavbarSubmenuComponent {
  @Input() submenu!: MenuItem;
}
