## คำสั่งที่ใช้ในการค้นข้อความที่ต้องการ จาก power shell

PS D:\dashboard2025\Frontend> Get-ChildItem -Path "D:\dashboard2025\Frontend" -Filter "*.html" -Recurse | Select-String "ลบคำในนี้ออกให้แล้วใส่คำที่ต้องการค้นแทนที่นี่"