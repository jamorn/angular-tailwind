# 1 ถ้าทดสอบ ใน mode dev ของ augular จะอย่างไร ตาม auth: {
testUsers: {
admin: 'kittithuch.u - 557',
user: 'weerachai.in - 1102',
super: 'nirut.p - 2341'
}
2. มุมขวาบนตรงแสดงชื่อ user จะทำอย่างไร





# การทดสอบ Authentication ใน Angular Development Mode
1. การทดสอบ Test Users
สร้าง Service สำหรับจัดการ Authentication:
2. แสดงชื่อ User ที่มุมขวาบน
2.1 สร้าง Component สำหรับแสดงข้อมูล User:
2.2 แก้ไข Navbar Component เพื่อใส่ UserProfile:
2.3 แก้ไข Module เพื่อ Import Components:
# การทดสอบ
เปิด Browser และไปที่ http://localhost:4200
ทดสอบ Login ด้วย Test Users ต่างๆ:
admin: kittithuch.u - 557
user: weerachai.in - 1102
super: nirut.p - 2341
ชื่อ User จะแสดงที่มุมขวาบน พร้อม Dropdown menu สำหรับ Logout
# หมายเหตุ: ต้องแน่ใจว่าได้ติดตั้ง @angular/material และ angular-svg-icon แล้ว ถ้ายังไม่ได้ติดตั้งให้รันคำสั่ง

# ตรวจสอบและแก้ไขไฟล์ auth.service.ts
จากการตรวจสอบพบว่าต้องแก้ไขดังนี้:

-role parameter ใน hasRole method ควรใช้ type ที่มีอยู่แล้วจาก UserInfo    interface
-roles parameter ใน hasAnyRole method ก็เช่นกัน
-เพิ่ม type extraction จาก UserInfo interface เพื่อนำ type ของ roles มาใช้
การแก้ไขนี้จะ:

-ใช้ type ที่มีอยู่แล้วใน UserInfo interface
-ป้องกันการซ้ำซ้อนของ type definitions
-รักษา type safety โดยใช้ type extraction
-ทำให้ code มีความสอดคล้องกันทั้งไฟล์