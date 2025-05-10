# ตรวจสอบ Components ที่ยังไม่เป็น Standalone:
# ค้นหา components ทั้งหมด
Get-ChildItem -Path "D:\dashboard2025\Frontend\src\app\modules" -Recurse -Filter "*.component.ts" | 
ForEach-Object {
    $content = Get-Content $_.FullName
    if ($content -notmatch 'standalone: true') {
        Write-Host "Missing standalone in: $($_.FullName)"
    }
}

# คำสั่งแบบละเอียด
Get-ChildItem -Path "D:\dashboard2025\Frontend\src\app\modules" -Recurse -Filter "*.component.ts" | 
ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch [regex]::Escape('standalone: true')) {
        Write-Host "Missing standalone in: $($_.FullName)"
    }
}

# Report
Components Missing Standalone Configuration
Let's document the components that need to be converted to standalone. Creating a documentation file
# Components to Convert to Standalone

## Auth Module
- [✅] auth.component.ts
- [❌] pages/forgot-password/forgot-password.component.ts
- [❌] pages/login/login.component.ts
- [❌] pages/new-password/new-password.component.ts
- [❌] pages/sign-in/sign-in.component.ts
- [❌] pages/sign-up/sign-up.component.ts
- [❌] pages/two-steps/two-steps.component.ts

## Dashboard Module
-[✅] dashboard.component.ts
### NFT Components
- [❌] components/nft/nft-auctions-table/nft-auctions-table.component.ts
- [❌] components/nft/nft-auctions-table-item/nft-auctions-table-item.component.ts
- [❌] components/nft/nft-chart-card/nft-chart-card.component.ts
- [❌] components/nft/nft-dual-card/nft-dual-card.component.ts
- [❌] components/nft/nft-header/nft-header.component.ts
- [❌] components/nft/nft-single-card/nft-single-card.component.ts
### Pages
-[✅] pages/giveaway/giveaway.component.ts
-[✅] pages/monthlyeii/monthly-eii.component.ts
- [ ] pages/nft/nft.component.ts
-[✅] pages/oee/oee.component.ts
-[✅] pages/oee-entry/oee-entry.component.ts
-[✅] pages/safety/safety.component.ts

## Error Module
- [ ] error.component.ts
- [ ] pages/error404/error404.component.ts
- [ ] pages/error500/error500.component.ts

## Layout Module
- [ ] layout.component.ts
### Components
- [ ] components/bottom-navbar/bottom-navbar.component.ts
- [ ] components/footer/footer.component.ts
- [ ] components/navbar/navbar.component.ts
- [ ] components/navbar/navbar-menu/navbar-menu.component.ts
- [ ] components/navbar/navbar-mobile/navbar-mobile-menu/navbar-mobile-menu.component.ts
- [ ] components/navbar/navbar-mobile/navbar-mobile-submenu/navbar-mobile-submenu.component.ts
- [ ] components/navbar/navbar-submenu/navbar-submenu.component.ts
- [ ] components/navbar/profile-menu/profile-menu.component.ts
- [ ] components/sidebar/sidebar.component.ts
- [ ] components/sidebar/sidebar-menu/sidebar-menu.component.ts
- [ ] components/sidebar/sidebar-submenu/sidebar-submenu.component.ts

## UIKit Module
- [ ] uikit.component.ts
### Table Components
- [ ] pages/table/table.component.ts
- [ ] pages/table/components/table-action/table-action.component.ts
- [ ] pages/table/components/table-footer/table-footer.component.ts
- [ ] pages/table/components/table-header/table-header.component.ts
- [ ] pages/table/components/table-row/table-row.component.ts

## Conversion Template
```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // Add other required imports
  ],
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent { }
```

Would you like to start converting these components module by module?