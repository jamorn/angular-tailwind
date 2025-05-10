import { NgClass, NgIf, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import packageJson from '../../../../../../package.json';
import { MenuService } from '@layout-services/menu.service';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

interface PackageInfo {
  name: string;
  displayName: string;
  version: string;
  description: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgClass, 
    NgIf, 
    AngularSvgIconModule, 
    SidebarMenuComponent
  ],
})
export class SidebarComponent {
  public appJson: PackageInfo = packageJson;

  constructor(public menuService: MenuService) {}

  public toggleSidebar(): void {
    this.menuService.toggleSidebar();
  }
}
