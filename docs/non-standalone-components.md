# Components ที่ยังไม่เป็น Standalone

## Route Modules ที่ต้องแก้ไข:
1. app.routes.ts - ยังใช้ NgModule decorator
2. layout.routes.ts - ตรวจสอบการใช้ RouterModule
3. admin.routes.ts - ตรวจสอบการใช้ RouterModule
4. auth.routes.ts - ตรวจสอบการใช้ RouterModule
5. error.routes.ts - ตรวจสอบการใช้ RouterModule
6. dashboard.routes.ts - ตรวจสอบการใช้ RouterModule
7. uikit.routes.ts - ตรวจสอบการใช้ RouterModule

## Components ที่ต้องตรวจสอบ:
1. Layout Module:
   - LayoutComponent
   - NavbarComponent และ sub-components
   - SidebarComponent และ sub-components
   - FooterComponent

2. Dashboard Module:
   - DashboardComponent
   - OEEComponent
   - SafetyComponent
   - GiveawayComponent

3. Auth Module:
   - AuthComponent
   - LoginComponent
   - SignUpComponent
   - ForgotPasswordComponent

4. Admin Module:
   - AdminComponent
   - OEEEntryComponent

## Services ที่ต้องตรวจสอบ:
1. MenuService
2. AuthService
3. ChartService
4. TableFilterService

## Next Steps:
1. ตรวจสอบการใช้ imports array ใน @Component
2. แก้ไข routes ให้เป็น standalone
3. ปรับ services ให้ใช้ providedIn: 'root'
4. ตรวจสอบ dependency injection
