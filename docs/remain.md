# Remaining Tasks & Changes

## 1. Current Issues
- Non-standalone components need to be converted
- Auth system needs to be replaced with Windows Authentication
- Menu structure needs updating
- Routing needs simplification

## 2. Components to Convert to Standalone
1. **Root Level**
   - app.routes.ts (still using NgModule)

2. **Layout Module**
   - LayoutComponent
   - NavbarComponent and sub-components
   - SidebarComponent and sub-components
   - FooterComponent

3. **Dashboard Module**
   - DashboardComponent
   - OEEComponent
   - SafetyComponent
   - GiveawayComponent

4. **Admin Module**
   - AdminComponent
   - OEEEntryComponent

5. **Error Module**
   - ErrorComponent
   - Error404Component
   - Error500Component

## 3. Routing Changes
1. Remove auth routes (no longer needed with Windows Auth)
2. Update default route to go directly to OEE component
3. Remove dashboard route layer
4. Simplify route structure

## 4. Code Cleanup
1. Remove unused components:
   - All auth-related components
   - Dashboard/components/nft folder
   - Unused services and guards

## 5. Windows Authentication Integration
1. Remove existing auth service
2. Add Windows auth configuration
3. Update guards and interceptors
4. Remove login-related components

## 6. Route Structure Update
Current:
ขั้นตอนการทำงาน
1. Cleanup Phase:
   - ลบโค้ดที่ไม่ใช้แล้ว
   - ปรับโครงสร้างไฟล์ให้เรียบง่าย

2. Route Configuration:
   - แก้ไข app.routes.ts ให้ redirect ไปที่ OEE โดยตรง
   - ลบ auth routes
   - ปรับ layout routes

3. Windows Authentication:
   - เพิ่ม configuration สำหรับ windows auth
   - ปรับ services ให้ทำงานกับ windows auth

4. Testing:
   - ทดสอบ route ใหม่
   - ทดสอบการทำงานกับ windows auth
