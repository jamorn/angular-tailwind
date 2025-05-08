
# การตั้ง path เพื่อหลีกเลี่ยงการอ้าง Path ในลักษณะนี้ ../../../
### ตั้งค่า path aliases ใน tsconfig.json
การแก้ไข:

1 เปลี่ยนจาก relative path เป็น path aliases
2 ใช้ @services/ แทน ../../../../services/
3 ใช้ @models/ แทน ../../../../models/
4 เพิ่ม path aliases configuration ใน tsconfig.json

"paths": {
      "@models/*": ["src/app/modules/dashboard/models/*"],
      "@services/*": ["src/app/services/*"],
      "@shared/*": ["src/app/shared/*"]
    }
# ตัวอย่างการเรียกใช้งาน
import { ChartService } from '@services/chart.service';
import { DashboardService } from '@services/dashboard.service';
import { MachineOEEData, MachineOrder } from '@models/oee.model';