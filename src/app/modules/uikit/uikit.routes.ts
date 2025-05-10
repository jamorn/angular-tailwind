import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';

export const UIKIT_ROUTES: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(UIKIT_ROUTES)],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
