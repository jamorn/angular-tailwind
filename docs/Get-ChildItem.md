# ตรวจสอบโฟลเดอร์ทั้งหมด
Get-ChildItem -Path "D:\dashboard2025\Frontend"

หากไม่มี dist แสดงว่ายังไม่เคย build
# สร้าง dist folder โดยการ build
ng build

# เช็คว่ามี dist แล้ว
Get-ChildItem -Path "D:\dashboard2025\Frontend\dist"