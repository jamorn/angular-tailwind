Tailwind CSS Directives vs Plugin Directives
1. Tailwind Directives (@tailwind)
Tailwind directives เป็นคำสั่งพื้นฐานที่จำเป็นสำหรับ Tailwind CSS:

@tailwind base;     /* นำเข้า base styles */
@tailwind components;  /* นำเข้า component classes */
@tailwind utilities;   /* นำเข้า utility classes */

2. Plugin Directives (@plugin)
Plugin directives ไม่ควรใช้ ใน styles.css เพราะต้องกำหนดใน tailwind.config.js:

❌ ไม่ควรใช้แบบนี้ใน styles.css:

@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
@plugin "tailwind-scrollbar";

✅ ควรกำหนดใน tailwind.config.js แทน:
module.exports = {
  // ...existing code...
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')
  ]
}

# ความแตกต่างที่สำคัญ:
Tailwind Directives

เป็นคำสั่งหลักของ Tailwind
ต้องมีใน styles.css
ควบคุมการโหลด CSS layers
Plugin Directives

เป็นการกำหนด plugins เพิ่มเติม
ต้องกำหนดใน config file
จัดการผ่าน Node.js modules