# Barrel File Explanation

1. เหตุผลในการสร้าง index.ts
เป็น barrel file ที่รวบรวมการ export modules ไว้ที่เดียว
ช่วยลดความซ้ำซ้อนของ import paths
ทำให้การจัดการ imports ง่ายขึ้น
เป็นจุดศูนย์กลางในการเข้าถึง models ทั้งหมด
2. อธิบาย Barrel File
Barrel file เป็นเทคนิคการรวม exports จากหลายๆ modules ไว้ในไฟล์เดียว

# ตัวอย่างการใช้งาน:
1. แบบไม่ใช้ Barrel File:
# #######################################
 **  ต้อง import แยกทีละไฟล์ **
import { UserInfo } from './auth/auth.model';
import { MachineOEEData } from './oee/oee.model';
import { MenuConfig } from './menu.model';
2. แบบใช้ Barrel File:
# #######################################
** import ทั้งหมดจากที่เดียว ** 
import { UserInfo, MachineOEEData, MenuConfig } from '@models';
# #######################################

### ข้อดีของ Barrel File:
1. ลดความซ้ำซ้อน:
   -ไม่ต้อง import หลายบรรทัด
   -path ที่ใช้สั้นลง
2. จัดการง่าย:
    -เพิ่ม/ลบ exports ที่จุดเดียว
    -ย้ายไฟล์ง่ายขึ้น เพราะแก้แค่ที่ barrel file
3. Path Abstraction:
    -ซ่อนโครงสร้างโฟลเดอร์จริง
    -เปลี่ยนโครงสร้างได้โดยไม่กระทบ imports

โครงสร้างปัจจุบัน:
src/app/core/models/
├── auth/
│   └── auth.model.ts
├── oee/
│   └── oee.model.ts
├── menu.model.ts
├── theme.model.ts
└── index.ts (barrel file)
