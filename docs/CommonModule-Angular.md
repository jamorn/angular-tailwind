# ความสำคัญของ CommonModule ใน Angular
CommonModule เป็นโมดูลพื้นฐานที่สำคัญใน Angular เพราะ:

Directives พื้นฐาน: ให้บริการ directives ที่ใช้บ่อยเช่น:

*ngIf - สำหรับการแสดงผลแบบมีเงื่อนไข
*ngFor - สำหรับการวนลูปแสดงข้อมูล
*ngSwitch - สำหรับการแสดงผลแบบเงื่อนไขหลายทาง
Pipes มาตรฐาน: มี pipes ที่ใช้งานบ่อย เช่น:

date - จัดรูปแบบวันที่
uppercase - แปลงข้อความเป็นตัวพิมพ์ใหญ่
lowercase - แปลงข้อความเป็นตัวพิมพ์เล็ก
currency - จัดรูปแบบสกุลเงิน
decimal - จัดรูปแบบตัวเลข
ตัวอย่างการใช้งานใน Template:

ดังนั้น หากไม่มี CommonModule ใน imports จะไม่สามารถใช้ directives และ pipes เหล่านี้ได้ เว้นแต่ว่าเป็น standalone component ที่ import CommonModule โดยตรง