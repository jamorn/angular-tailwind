import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '@layout-services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule, 
    NavbarMenuComponent, 
    ProfileMenuComponent, 
    NavbarMobileComponent
  ],
})
export class NavbarComponent {
  constructor(private menuService: MenuService) {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
