ตอนนี้ผมจะเริ่ม พัฒนาจาก * feature/fix-navbar-menu-structure-20250512T2058
โดยจะแก้ไขดังนี้ 
1. จะยกเลิกการ login หน้าแรก และหน้าแรกจะยังคงยึดตามเดิมไม่เปลี่ยนแปลง คือ /dashboard/oee
2. จะเปลี่ยน menu ให้เป็น auto menu  ตาม windows authen 
3. เมื่อโหลดหน้าแรก angular จะเรียกไปที่ GetCurrentUser() จาก backend
4. project tree สามารถดูได้จาก README.md
5. path ดูได้จาก tsconfig.json

# JSON Response จาก GetCurrentUser()
1. Success Response (200 OK)
    {
        "success": true,
        "user": {
            "empId": "1102",
            "name": "Mr. Weerachai Inthirach",
            "email": "weerachai.in@irpc.co.th",
            "roles": ["user"]
        }
    }
2. Error Responses
ไม่ได้ Authentication (401 Unauthorized)
{
    "message": "Not authenticated"
}

3. Server Error (500 Internal Server Error)
{
    "message": "Error message details..."
}

หมายเหตุ:
roles จะเป็น ["admin", "user"] ถ้า employee.Role เป็น "admin"
roles จะเป็น ["user"] สำหรับ role อื่นๆ
Response ทั้งหมดจะเป็น application/json content type

menu.ts
import { MenuItem } from '../models/menu.model';
export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Reports',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Reports',
          route: '/dashboard',
          children: [
            { label: 'Safety', route: '/dashboard/safety' },
            { label: 'OEE', route: '/dashboard/oee' },
            { label: 'Giveaway', route: '/dashboard/giveaway' },
            { label: 'EII', route: '/dashboard/eii' }
          ],
        }
      ]
    },
    {
      group: 'Administration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/admin',
          children: [
            { label: 'Users', route: '/admin/users' },
            { label: 'Roles', route: '/admin/roles' },
            { label: 'Permissions', route: '/admin/permissions' }
          ]
        },
        {
          icon: 'assets/icons/heroicons/outline/pencil-square.svg',
          label: 'Data Entry',
          route: '/admin/entry',
          children: [
            { label: 'OEE Entry', route: '/admin/entry/oee' },
            { label: 'Safety Entry', route: '/admin/entry/safety' },
            { label: 'Giveaway Entry', route: '/admin/entry/giveaway' }
          ]
        }
      ]
    }
  ];
}

# หาก การตอบกลับมาเป็น Authentication (401 Unauthorized) จะแสดง menu 

[
            { label: 'Safety', route: '/dashboard/safety' },
            { label: 'OEE', route: '/dashboard/oee' },
            { label: 'Giveaway', route: '/dashboard/giveaway' },
            { label: 'EII', route: '/dashboard/eii' }
          ]
เท่านั้น เพราะ เป็นการ แสดง chart เท่านั้นทุกคนในองค์กร สามารถเข้ามาดูได้

# หาก การตอบกลับมาเป็น  Success Response (200 OK)
ให้แสดงทุก menu 

