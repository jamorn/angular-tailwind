# ตรวจสอบโฟลเดอร์ทั้งหมด
Get-ChildItem -Path "D:\dashboard2025\Frontend"

หากไม่มี dist แสดงว่ายังไม่เคย build
# สร้าง dist folder โดยการ build
ng build

# เช็คว่ามี dist แล้ว
Get-ChildItem -Path "D:\dashboard2025\Frontend\dist"

# คำสั่ง ที่ -Path "D:\dashboard2025\Frontend\src\app\modules เพื่อค้นหาและตรวจสอบว่าคำที่ขึ้นต้นด้วยอะไรก็ได้ตามด้วย routes.ts
Get-ChildItem -Path "D:\dashboard2025\Frontend\src\app\modules" -Recurse -Filter "*routes.ts"