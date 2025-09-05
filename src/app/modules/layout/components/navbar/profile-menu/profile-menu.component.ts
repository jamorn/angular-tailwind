import { AuthService } from '@core/services/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common'; // Add this import
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { UserPhotoResponse } from '@core/interfaces/user-profile.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// Define ButtonToneType before using it
type ButtonToneType = 'violet' | 'blue' | 'green' | 'vue' | 'orange' | 'red';

// Add color mapping type
type ColorToThemeMap = {
  [key: string]: ButtonToneType;
};

type DirectionType = 'ltr' | 'rtl';

// เพิ่ม type definitions
type ThemeColorKey = 'violet' | 'blue' | 'green' | 'vue' | 'orange' | 'red';
type ThemeColorConfig = {
  [K in ThemeColorKey]: {
    tone: ButtonToneType;
    hex: string;
  };
};

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, AngularSvgIconModule, ClickOutsideDirective],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  public userProfile?: UserPhotoResponse;
  public profileMenu = [
    {
      title: 'Your Profile',
      icon: './assets/icons/heroicons/outline/user-circle.svg',
      link: '/profile',
    },
    {
      title: 'Settings',
      icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
      link: '/settings',
    },
    {
      title: 'Log out',
      icon: './assets/icons/heroicons/outline/logout.svg',
      link: '/auth',
    },
  ];

  public themeColors = [
    {
      name: 'violet', // ย้าย violet ขึ้นมาเป็นค่าเริ่มต้น
      code: '#6d28d9',
    },
    {
      name: 'vue', // เปลี่ยนจาก yellow เป็น vue
      code: '#42b883', // เปลี่ยน hex code เป็นสี Vue
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
  ];

  public themeMode = ['light', 'dark'];
  public themeDirection: DirectionType[] = ['ltr', 'rtl'];

  // Define color mapping with hex values
  public readonly colorToThemeMap: Record<string, ButtonToneType> = {
    violet: 'violet', // เปลี่ยนจาก 'info'
    blue: 'blue', // เปลี่ยนจาก 'primary'
    green: 'green', // เปลี่ยนจาก 'success'
    vue: 'vue', // เพิ่มใหม่ แทน yellow
    orange: 'orange', // เปลี่ยนจาก 'warning'
    red: 'red', // เปลี่ยนจาก 'danger'
  };

  // แก้ไขการประกาศ themeColorConfig
  public readonly themeColorConfig: ThemeColorConfig = {
    violet: { tone: 'violet', hex: '#6E56CF' }, // เปลี่ยนจาก info เป็น violet
    blue: { tone: 'blue', hex: '#3b82f6' }, // เปลี่ยนจาก primary เป็น blue
    green: { tone: 'green', hex: '#22c55e' }, // เปลี่ยนจาก success เป็น green
    vue: { tone: 'vue', hex: '#42b883' }, // เพิ่ม vue แทน orange
    orange: { tone: 'orange', hex: '#f97316' }, // เปลี่ยนจาก warning เป็น orange
    red: { tone: 'red', hex: '#cc0022' }, // เปลี่ยนจาก danger เป็น red
  };

  constructor(public themeService: ThemeService, private authService: AuthService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Fix line 105: Change theme() to getCurrentTheme()
    console.log('Current theme:', this.themeService.getCurrentTheme());

    this.authService.getCurrentUserWithPhoto().subscribe(response => {
      if (response.success) {
        this.userProfile = response;
      }
    });
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  // Fix line 123: Update toggleThemeMode to use setTheme
  toggleThemeMode(): void {
    const newMode = this.themeService.isDark ? 'light' : 'dark';
    this.themeService.setTheme({ mode: newMode });
  }

  // Fix line 131: Update setThemeColor to use setTheme
  setThemeColor(color: string): void {
    // เพิ่ม debug logs
    console.log('Setting color:', color);
    const themeColor = this.colorToThemeMap[color];

    if (themeColor) {
      console.log(`Mapped ${color} to ${themeColor}`);
      this.themeService.setTheme({ color: themeColor });
    } else {
      console.warn(`Invalid color: ${color}, using default`);
      this.themeService.setTheme({ color: 'violet' }); // default to violet
    }
  }

  // Fix setDirection to use setTheme
  setDirection(value: DirectionType): void {
    this.themeService.setTheme({ direction: value });
  }

  public getProfileImage(): SafeUrl {
    if (this.userProfile?.user?.photo) {
      // Sanitize and return the base64 image
      return this.sanitizer.bypassSecurityTrustUrl(this.userProfile.user.photo);
    }
    // Return default icon if no photo
    return './assets/icons/heroicons/outline/user-circle.svg';
  }

  // Helper methods
  public getThemeTone(color: ThemeColorKey): ButtonToneType {
    return this.themeColorConfig[color].tone;
  }

  public getColorHex(color: ThemeColorKey): string {
    return this.themeColorConfig[color].hex;
  }

  public isActiveColor(color: ThemeColorKey): boolean {
    return this.themeService.getCurrentTheme().color === this.getThemeTone(color);
  }

  // เพิ่ม property สำหรับใช้ใน template
  public readonly themeColorKeys: ThemeColorKey[] = ['violet', 'blue', 'green', 'vue', 'orange', 'red'];
}
