# ESM (ECMAScript Modules)
ESM คือ ECMAScript Modules เป็นระบบ modules มาตรฐานของ JavaScript โดยมีลักษณะสำคัญดังนี้:

รูปแบบการ import/export:
# ข้อดีของ ESM:
เป็นมาตรฐานของ JavaScript
โหลดแบบ async โดยธรรมชาติ
Tree-shaking ได้ดีกว่า (ตัดโค้ดที่ไม่ได้ใช้ออก)
การ import เป็น static analysis ได้
# เทียบกับ CommonJS:
// CommonJS style
const Component = require('@angular/core').Component;
module.exports = MyComponent;

ใน Angular:

ใช้ ESM เป็นหลัก
Warning เกิดเมื่อใช้ library ที่ยังเป็น CommonJS
แก้ไขได้โดยเพิ่มใน allowedCommonJsDependencies (ตามที่คุณทำไว้แล้วใน angular.json)