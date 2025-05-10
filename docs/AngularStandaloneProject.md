# สร้าง Angular Standalone Project

C:\Users\likit>ng v

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 19.2.3
Node: 22.14.0
Package Manager: npm 11.2.0
OS: win32 x64

Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1902.3 (cli-only)
@angular-devkit/core         19.2.3 (cli-only)
@angular-devkit/schematics   19.2.3 (cli-only)
@schematics/angular          19.2.3 (cli-only)

# สำหรับ Angular CLI 19.2.3 ใช้คำสั่งต่อไปนี้
# Create new standalone project with minimal structure
ng new demoApp --minimal --routing --style=scss --skip-tests --standalone

arameters Explained:
--minimal: สร้างโครงสร้างโปรเจคแบบขั้นต่ำ
--routing: เพิ่ม routing configuration
--style=scss: ใช้ SCSS สำหรับ styling
--skip-tests: ไม่สร้างไฟล์ test (*.spec.ts)
--standalone: ใช้ standalone architecture
คำถามที่จะถามระหว่างสร้างโปรเจค:
Would you like to add PWA? No
Would you like to add Angular routing? Yes
Which stylesheet format would you like to use? SCSS
โครงสร้างที่ได้
demoApp/
├── src/
│   ├── app/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.component.ts
│   │   └── app.component.html
│   ├── index.html
│   └── main.ts
├── package.json
└── angular.json

# ตัวอย่าง Root Component
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'demoApp';
}

# ตัวอย่าง Bootst
// filepath: src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

# First Run
cd demoApp
ng serve

# ข้อควรระวัง
ต้องระบุ imports ที่จำเป็นในแต่ละ component
ไม่ควรใช้ RouterModule ถ้าต้องการแค่ RouterOutlet
ควรใช้ lazy loading เพื่อประสิทธิภาพ
ระวังเรื่อง circular dependencies
Angular team แนะนำให้ใช้ Standalone Components เป็นตัวเลือกแรกในการพัฒนาแอพใหม่

การสร้าง Component แบบไม่มี Test Files
สำหรับการสร้าง component ใหม่โดยไม่สร้างไฟล์ test มี 2 วิธี:

1. ใช้ --skip-tests flag:
ng generate component my-component --skip-tests
# หรือใช้แบบย่อ
ng g c my-component --skip-tests
2. ใช้ --standalone และ --skip-tests พร้อมกัน:
ng g c my-component --standalone --skip-tests
ตัวอย่างการสร้าง Component ใน Feature Module:
# สร้าง component ในโฟลเดอร์ modules/dashboard/pages
ng g c modules/dashboard/pages/my-page --skip-tests --standalone
Output ที่ได้:
CREATE src/app/modules/dashboard/pages/my-page/my-page.component.ts
CREATE src/app/modules/dashboard/pages/my-page/my-page.component.html
CREATE src/app/modules/dashboard/pages/my-page/my-page.component.scss

#### ตั่งค่าที่เดียวได้เลย
# ตั้งค่าเริ่มต้นใน angular.json
{
  "projects": {
    "your-app": {
      "schematics": {
        "@schematics/angular:component": {
          "skipTests": true,
          "standalone": true
        }
      }
    }
  }
}
# หลังจากตั้งค่านี้ สามารถใช้คำสั่งปกติได้เลยโดยไม่ต้องระบุ flags
ng g c my-component

#### Unordered Lists (+)
                
+ List One
+ List Two
    + List Two-1
    + List Two-2
    + List Two-3
+ List Three
    * List One
    * List Two
    * List Three

#### Ordered Lists (-)
                
1. First Line
2. Second Line
3. Third Line