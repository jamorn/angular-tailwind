Component HMR (Hot Module Replacement)
HMR คือความสามารถในการอัพเดทโค้ดขณะที่แอพกำลังทำงาน โดยไม่ต้อง refresh หน้าเว็บใหม่ทั้งหมด

# การทำงานของ HMR
ตรวจจับการเปลี่ยนแปลงของไฟล์:
# รัน Angular ด้วย HMR mode
ng serve --hmr
# 2 เมื่อแก้ไข Component:
-แก้ไข template (.html)
-แก้ไข styles (.css)
-แก้ไข logic (.ts)
-Angular จะ reload เฉพาะ component ที่เปลี่ยนแปลง
# ข้อดีของ HMR
-เร็วกว่าการ refresh ทั้งหน้า
-รักษา state ของ application ไว้
-ลดเวลาในการพัฒนา
-เห็นผลลัพธ์ทันที
# การเปิดใช้งาน HMR
 1. แก้ไข angular.json:
{
  "projects": {
    "plbg-dashboard": {
      "architect": {
        "serve": {
          "options": {
            "hmr": true
          }
        }
      }
    }
  }
}
2. สร้าง hmr.ts:
   2.1 ขั้นตอนการสร้าง คำสั่ง PS
   New-Item -Path "D:\dashboard2025\Frontend\src\hmr.ts" -ItemType File
   2.2 ต้องติดตั้ง package เพิ่มเติม
   npm install --save-dev @angularclass/hmr
3. อัพเดท angular.json




import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (
  module: any,
  bootstrap: () => Promise<NgModuleRef<any>>
) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
};

3. รันด้วย HMR mode
ng serve --hmr