# วิธีจัดการเมนูตามสิทธิ์
1. สร้าง Service สำหรับจัดการเมนู

import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly baseMenu: MenuItem[] = [
    {
      group: 'Reports',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Reports',
          route: '/dashboard',
          children: [
            { label: 'Safety', route: '/dashboard/safety' },
            { label: 'OEE', route: '/dashboard/oee' },
            { label: 'Giveaway', route: '/dashboard/giveaway' },
            { label: 'EII', route: '/dashboard/eii' }
          ],
        }
      ]
    },
    {
      group: 'Administration',
      separator: true,
      requiresRole: ['admin'], // เพิ่ม property นี้
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/admin',
          children: [
            { label: 'Users', route: '/admin/users' },
            { label: 'Roles', route: '/admin/roles' },
            { label: 'Permissions', route: '/admin/permissions' }
          ]
        },
        {
          icon: 'assets/icons/heroicons/outline/pencil-square.svg',
          label: 'Data Entry',
          route: '/admin/entry',
          children: [
            { label: 'OEE Entry', route: '/admin/entry/oee' },
            { label: 'Safety Entry', route: '/admin/entry/safety' },
            { label: 'Giveaway Entry', route: '/admin/entry/giveaway' }
          ]
        }
      ]
    }
  ];

  constructor(private authService: AuthService) {}

  getAuthorizedMenu(): MenuItem[] {
    return this.baseMenu.filter(menuItem => {
      // ถ้าไม่มี requiresRole ให้แสดงเมนูนั้น
      if (!menuItem.requiresRole) {
        return true;
      }

      // ตรวจสอบว่าผู้ใช้มีสิทธิ์ตามที่กำหนดหรือไม่
      return menuItem.requiresRole.some(role => this.authService.hasRole(role));
    });
  }
}

2. ปรับปรุง Menu Model
export interface MenuItem {
  group: string;
  separator: boolean;
  requiresRole?: string[]; // เพิ่ม optional property
  items: MenuItemDetail[];
}

export interface MenuItemDetail {
  icon: string;
  label: string;
  route: string;
  children?: MenuItemChild[];
  requiresRole?: string[]; // สามารถกำหนดสิทธิ์ระดับ item ได้ด้วย
}

export interface MenuItemChild {
  label: string;
  route: string;
  requiresRole?: string[]; // สามารถกำหนดสิทธิ์ระดับ child ได้ด้วย
}

3. ปรับปรุง Menu Component
import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  template: `
    <nav>
      <ng-container *ngFor="let menuGroup of authorizedMenu">
        <div class="menu-group">
          <h3>{{ menuGroup.group }}</h3>
          <ul>
            <li *ngFor="let item of menuGroup.items">
              <a [routerLink]="item.route">
                <img [src]="item.icon" alt="icon">
                {{ item.label }}
              </a>
              <ul *ngIf="item.children">
                <li *ngFor="let child of item.children">
                  <a [routerLink]="child.route">{{ child.label }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <hr *ngIf="menuGroup.separator">
      </ng-container>
    </nav>
  `
})
export class MenuComponent implements OnInit {
  authorizedMenu: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.authorizedMenu = this.menuService.getAuthorizedMenu();
  }
}

4. การใช้งาน:
เมื่อผู้ใช้เป็น admin จะเห็นทั้งเมนู Reports และ Administration
เมื่อผู้ใช้เป็น user จะเห็นเฉพาะเมนู Reports
สามารถกำหนดสิทธิ์ได้ทั้งระดับ group, item และ child item

ข้อดี:

แยกการจัดการเมนูออกเป็น service ต่างหาก
รองรับการกำหนดสิทธิ์ได้หลายระดับ
ง่ายต่อการบำรุงรักษาและขยายฟีเจอร์
มีความยืดหยุ่นในการกำหนดสิทธิ์