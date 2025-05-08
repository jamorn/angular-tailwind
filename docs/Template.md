# เปรียบเทียบการเขียน Template ใน Angular Component
มีสองวิธีในการเขียน template ใน Angular
# Inline Template
เหมาะกับ template ขนาดเล็ก
อยู่ในไฟล์ component เดียวกัน
ง่ายต่อการแก้ไขเพราะอยู่ที่เดียวกัน
ใช้ backticks (`) สำหรับ multi-line template
# External Template
เหมาะกับ template ขนาดใหญ่
แยกไฟล์ HTML ต่างหาก
ง่ายต่อการจัดการเมื่อ HTML มีขนาดใหญ่
สนับสนุนการทำงานร่วมกันระหว่างทีม

เนื่องจาก OEE component มี chart ซับซ้อน ควรย้ายจาก inline template ไปเป็น external template