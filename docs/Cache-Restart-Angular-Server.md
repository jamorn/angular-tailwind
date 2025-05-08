# ขั้นตอนการลบ Cache และ Restart Angular Server
# วิธีที่ 1: ใช้ Remove-Item
Remove-Item -Path "D:\dashboard2025\Frontend\dist" -Recurse -Force

# วิธีที่ 2: ใช้ rmdir (Windows Command)
rmdir /s /q "D:\dashboard2025\Frontend\dist"

# เพิ่มเติม - ถ้าต้องการล้างทั้งหมด หากจำเป็น
# ลบ node_modules
Remove-Item -Path "D:\dashboard2025\Frontend\node_modules" -Recurse -Force

# ลบ package-lock.json
Remove-Item -Path "D:\dashboard2025\Frontend\package-lock.json"

# ติดตั้ง dependencies ใหม่
npm install