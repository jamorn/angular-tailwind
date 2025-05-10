# จัดการ Dashboard Service และ Path Mappings

Service Integration for Dashboard and Chart
จากโครงสร้างใหม่และเหตุผลที่นำ services มารวมกัน:

src/app/modules/dashboard/
└─ services/
   ├─ chart.service.ts         # จัดการการแสดงผล charts
   ├─ chart.service.spec.ts
   ├─ dashboard.service.ts     # ดึงข้อมูลจาก API
   └─ dashboard.service.spec.ts

# เหตุผลที่รวม Services:
1. ความสัมพันธ์การทำงาน:
dashboard.service.ts - ดึงข้อมูล OEE และ Giveaway จาก API
chart.service.ts - รับข้อมูลจาก DashboardService มาสร้าง charts
2. Feature Coupling:
ทั้งสอง services ทำงานเฉพาะกับ dashboard feature
มีการแชร์ interfaces และ types เดียวกัน
ใช้งานร่วมกันใน OEE component