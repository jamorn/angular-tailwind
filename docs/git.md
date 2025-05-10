
# ตรวจสอบ Commit 
git log -1 --pretty=format:"%B"

# ตัวอย่างการ สร้าง Commit ด้วย Message ที่ละเอียด

git commit -m "feat: implement OEE dashboard as default route

- Route Changes:
  * Update dashboard-routing to redirect to OEE
  * Remove NFTs related routes
  * Add OEE and OEE-entry routes

- Menu Structure:
  * Reorganize menu.ts
  * Add Production group as primary menu
  * Update route paths for consistency

- Component Updates:
  * Convert dashboard.component to standalone
  * Add RouterOutlet configuration
  * Update component styling

- HMR Implementation:
  * Add @angularclass/hmr package
  * Create hmr.ts configuration
  * Enable HMR in angular.json

Breaking Changes:
- Default route changed from NFTs to OEE
- Menu structure reorganized

Related: #issue-number (if applicable)"

# คำอธิบายด้านบน ตัวอย่างการ สร้าง Commit ด้วย Message ที่ละเอียด
# ใช้ Conventional Commits format:

1. feat: สำหรับ feature ใหม่
2. เขียนรายละเอียดแยกหมวดหมู่
3. ระบุ Breaking Changes
4. อ้างอิง issue ที่เกี่ยวข้อง (ถ้ามี)

# คำสั่งตรวจสอบ Commit
git log -1 --pretty=format:"%B"