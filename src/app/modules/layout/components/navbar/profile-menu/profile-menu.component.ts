import { AuthService } from '@core/services/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';  // Add this import
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { UserPhotoResponse } from '@core/interfaces/user-profile.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// Define ButtonToneType before using it
type ButtonToneType = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light';

// Add color mapping type
type ColorToThemeMap = {
  [key: string]: ButtonToneType;
};

type DirectionType = 'ltr' | 'rtl';

// เพิ่ม type definitions
type ThemeColorKey = 'violet' | 'blue' | 'green' | 'orange' | 'red';
type ThemeColorConfig = {
  [K in ThemeColorKey]: {
    tone: ButtonToneType;
    hex: string;
  }
};

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AngularSvgIconModule,
    ClickOutsideDirective
  ],
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
      name: 'violet',    // ย้าย violet ขึ้นมาเป็นค่าเริ่มต้น
      code: '#6d28d9',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
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
    }
  ];

  public themeMode = ['light', 'dark'];
  public themeDirection: DirectionType[] = ['ltr', 'rtl'];

  // Define color mapping with hex values
  public readonly colorToThemeMap: Record<string, ButtonToneType> = {
    'violet': 'info',      // #6d28d9
    'blue': 'primary',     // #3b82f6
    'green': 'success',    // #22c55e
    'orange': 'warning',   // #f59e0b
    'red': 'danger'        // #cc0022
  };

  // แก้ไขการประกาศ themeColorConfig
  public readonly themeColorConfig: ThemeColorConfig = {
    violet: { tone: 'info', hex: '#6E56CF' },      // Violet -> info
    blue: { tone: 'primary', hex: '#3b82f6' },     // Blue -> primary
    green: { tone: 'success', hex: '#22c55e' },    // Green stays same
    orange: { tone: 'warning', hex: '#f59e0b' },   // Orange -> warning (yellow)
    red: { tone: 'danger', hex: '#cc0022' }        // Red stays same
  };

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Fix line 105: Change theme() to getCurrentTheme()
    console.log('Current theme:', this.themeService.getCurrentTheme());
    
    this.authService.getCurrentUserWithPhoto().subscribe(
      (response) => {
        if (response.success) {
          this.userProfile = response;
        }
      }
    );
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
      this.themeService.setTheme({ color: 'info' }); // default to violet
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
  public readonly themeColorKeys: ThemeColorKey[] = ['violet', 'blue', 'green', 'orange', 'red'];
}
