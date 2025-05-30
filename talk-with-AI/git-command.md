# Git Commands Used (2025-05-30)

## 1. Check Status and Branch
```bash
git status  # ตรวจสอบสถานะการเปลี่ยนแปลงของไฟล์
git branch  # ดู branch ทั้งหมด
```

## 2. Create and Switch Branch
```bash
# สร้าง branch ใหม่จาก feature/theme-color-heroicons-20250524T1318V1
git checkout -b IRPC20250530T1737
```

## 3. Stage Changes
```bash
# Add modified files
git add src/app/modules/dashboard/pages/giveaway/giveaway.component.css
git add src/app/modules/dashboard/pages/giveaway/giveaway.component.html
git add src/app/modules/dashboard/pages/giveaway/giveaway.component.ts
git add src/app/modules/dashboard/pages/oee/oee.component.html
git add src/app/modules/dashboard/pages/oee/oee.component.ts
git add src/app/modules/dashboard/services/chart.service.ts
git add src/app/modules/dashboard/services/dashboard.service.ts
git add talk-with-AI/
```

## 4. Commit Changes
```bash
git commit -m "fix: Charts ไม่แสดงผล และ Loading ค้าง

- แก้ไขปัญหา Charts ไม่แสดงผลครั้งแรก
- ปรับปรุงการจัดการ Loading State
- ป้องกันการ Subscribe ข้อมูลซ้ำซ้อน
- เพิ่ม Change Detection ในจุดสำคัญ
- แยก Service Logic จาก Component
- เพิ่ม Debug Info สำหรับการพัฒนา
- ปรับปรุง Performance"
```

## 5. Check Commit
```bash
git log -1  # ดู commit ล่าสุด 1 รายการ
```

## 6. Push to Remote
```bash
# Push และตั้งค่า upstream branch
git push -u origin IRPC20250530T1737
```
# ตรวจสอบว่า push สำเร็จ
git branch -vv

## Notes:
- `-u` หรือ `--set-upstream` คือการตั้งค่า tracking reference ระหว่าง local และ remote branch
- การตั้งค่า tracking reference ทำให้ Git จำการเชื่อมโยงระหว่าง:
  - Local branch (เช่น IRPC20250530T1737)
  - Remote branch (เช่น origin/IRPC20250530T1737)

### ประโยชน์ของการใช้ -u:

# ครั้งต่อไปสามารถใช้แค่ 
 git push  # ไม่ต้องระบุ origin IRPC20250530T1737
 git pull  # ไม่ต้องระบุ origin IRPC20250530T1737
# สามารถดูสถานะการ sync กับ remote ได้ง่ายขึ้น:
 git status  # จะแสดงว่า branch ahead/behind กี่ commit
# ตัวอย่างการใช้งานปกติ
# ครั้งแรกต้องใช้ -u
git push -u origin IRPC20250530T1737
# ครั้งต่อไปใช้แค่
git push

1. ลดการพิมพ์คำสั่ง:
   - หลังจากใช้ `-u` แล้ว สามารถใช้แค่ `git push` หรือ `git pull` ได้เลย
   - ไม่ต้องระบุ origin และชื่อ branch ทุกครั้ง

2. ตรวจสอบสถานะได้ง่ายขึ้น:
   - `git status` จะแสดงว่า branch อยู่ ahead/behind กี่ commit
   - ทำให้รู้ว่าต้อง push หรือ pull หรือไม่

3. ป้องกันความผิดพลาด:
   - ลดโอกาสการ push ไปผิด branch
   - Git จะแจ้งเตือนถ้าพยายาม push ไปยัง branch ที่ไม่ได้ track

- Branch name format: IRPC[YYYYMMDD]T[HHMM]
