import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';


export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,  // เปลี่ยนจาก AdminComponent เป็น LayoutComponent
    children: [
      {
        path: 'entry/oee',
        loadComponent: () => import('./entry/oee/oee-entry.component')
          .then(m => m.OeeEntryComponent)
      }
    ]
  }
];