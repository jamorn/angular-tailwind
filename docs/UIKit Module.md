UIKit Module ในโปรเจค Angular
UIKit เป็น module ที่ใช้สำหรับจัดการ UI Components ที่ใช้ร่วมกันในโปรเจค เช่น:

Common UI Components:

Buttons
Cards
Tables
Forms
Modals
Alerts
Demo และ Documentation:

แสดงตัวอย่างการใช้งาน components
รวบรวม design system
style guide สำหรับทีม
การเรียกใช้งาน:
// ตัวอย่างการใช้งานใน template
<app-button variant="primary">Submit</app-button>
<app-card>
  <app-card-header>Title</app-card-header>
  <app-card-content>Content</app-card-content>
</app-card>
src/app/modules/uikit/
├── components/
│   ├── buttons/
│   ├── cards/
│   ├── tables/
│   └── forms/
├── pages/
│   └── showcase/
└── uikit.routes.ts
