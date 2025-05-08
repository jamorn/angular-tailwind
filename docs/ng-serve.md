# รัน development server
คำสั่ง ng serve --poll=2000 อธิบาย
ความหมาย
ng serve: คำสั่งพื้นฐานสำหรับรัน Angular development server
--poll=2000: ตัวเลือกที่บอกให้ Angular ตรวจสอบการเปลี่ยนแปลงของไฟล์ทุกๆ 2 วินาที (2000 milliseconds)
การทำงาน
รัน development server บน http://localhost:4200/
ตรวจจับการเปลี่ยนแปลงของไฟล์ทุกๆ 2 วินาที
ทำ hot reload เมื่อพบการเปลี่ยนแปลง
เมื่อไหร่ควรใช้
เมื่อทำงานใน environments ที่ไม่รองรับ file watching เช่น

Docker containers
WSL (Windows Subsystem for Linux)
Network drives
บาง cloud development environments
เมื่อ default file watching ไม่ทำงาน หรือทำงานช้า