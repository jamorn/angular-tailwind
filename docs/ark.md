code เดิม เมื่อ 20250507T2359 สามารถทำงานได้
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

1. app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

2.app.component.html
<div>
  <router-outlet></router-outlet>
  <app-responsive-helper></app-responsive-helper>
  <ngx-sonner-toaster [theme]="themeService.isDark ? 'dark' : 'light'"></ngx-sonner-toaster>
</div>

3.app.component.html
<div>
  <router-outlet></router-outlet>
  <app-responsive-helper></app-responsive-helper>
  <ngx-sonner-toaster [theme]="themeService.isDark ? 'dark' : 'light'"></ngx-sonner-toaster>
</div>
4. app.component.css ยังไม่ได้เขียน code
5.dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

6.dashboard.component.html
<router-outlet></router-outlet>
7.dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [RouterOutlet]
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
8.dashboard.module.ts
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [DashboardRoutingModule],
})
export class DashboardModule {}

9.menu.ts
import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [{ label: 'Nfts', route: '/dashboard/nfts' }
          /**/  ,{ label: 'Safety', route: '/dashboard/safety' }
            ,{ label: 'Oee', route: '/dashboard/oee' }
            ,{ label: 'Giveaway', route: '/dashboard/giveaway' }
            ,{ label: 'Eii', route: '/dashboard/eii' } 
            ],
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
          label: 'Errors',
          route: '/errors',
          children: [
            { label: '404', route: '/errors/404' },
            { label: '500', route: '/errors/500' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Components',
          route: '/components',
          children: [{ label: 'Table', route: '/components/table' }],
        },
      ],
    },
    {
      group: 'Collaboration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Download',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Gift Card',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Users',
          route: '/users',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Folders',
          route: '/folders',
          children: [
            { label: 'Current Files', route: '/folders/current-files' },
            { label: 'Downloads', route: '/folders/download' },
            { label: 'Trash', route: '/folders/trash' },
          ],
        },
      ],
    },
  ];
}

10. เมื่อเปิด page app จะพาไปที่ /dashboard/nfts

11. อยากจะเปลี่ยนหน้า page ใหม่เปลี่ยนหน้าแรกเป็น /dashboard/oee จาก menu ด้านล่าง 
{
      group: 'Production',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'OEE System',
          route: '/dashboard',
          children: [
            { label: 'OEE Dashboard', route: '/dashboard/oee' },
            { label: 'OEE Entry', route: '/dashboard/oee-entry' },
          ],
        }
      ],
    }
