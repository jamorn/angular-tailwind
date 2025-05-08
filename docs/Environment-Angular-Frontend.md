# การตั้งค่า Environment สำหรับ Angular Frontend
จากโค้ด Program.cs ของ Backend API ที่ใช้ port 5112 (HTTP) และ 7112 (HTTPS) เราต้องตั้งค่า environment.ts ให้สอดคล้องกัน

# แก้ไขไฟล์ Environment
1. Environment Development (environment.ts)
2. Environment Production (environment.prod.ts)
คำอธิบายเพิ่มเติม:
ในโหมด Development:

1. ใช้ http://localhost:5112 เพราะ Backend ไม่ได้เปิดใช้ HTTPS redirection
มีการกำหนด test users ตามที่ระบุใน Swagger documentation
2. ข้อควรระวัง:

Backend มีการตั้งค่า CORS แบบ AllowAnyOrigin() ใน Development mode
Frontend ที่ port 4200 จะสามารถเรียก API ได้โดยไม่มีปัญหา CORS
การใช้ HTTP แทน HTTPS ใน Development จะทำงานได้เพราะ Backend ปิด HTTPS redirection ไว้
3. ความปลอดภัย:

ใน Production ควรใช้ HTTPS เท่านั้น
ไม่ควรมี test users ใน Production environment
ควรกำหนด CORS policy ที่เข้มงวดขึ้นใน Production