## การตรวจสอบ Standalone vs NgModule Components
1. การตรวจสอบ Component:
# NgModule Component ไม่มี standalone: true

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}

# Standalone Component มี standalone: true และ imports ที่จำเป็น

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent {}
########################################################
2. การตรวจสอบ Routing 
# NgModule Routing มี @NgModule decorator

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
# Standalone Routing ไม่มี @NgModule, export routes โดยตรง
 
export const routes: Routes = [
  // route configurations
];
########################################################
3. การตรวจสอบ Bootstrap

# main.ts แบบ NgModule
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

# main.ts แบบ Standalone
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [/* providers */]
});
#######################################################
# ค้นหา NgModule ในโปรเจค
Get-ChildItem -Path "D:\dashboard2025\Frontend\src" -Recurse -Include "*.ts" | Select-String -Pattern "@NgModule"

# ค้นหา Standalone Components
Get-ChildItem -Path "D:\dashboard2025\Frontend\src" -Recurse -Include "*.ts" | Select-String -Pattern "standalone: true"