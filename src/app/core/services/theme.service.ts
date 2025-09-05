import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ThemeConfig {
  mode: 'light' | 'dark';
  color: ButtonToneType;
  direction: 'ltr' | 'rtl';
}

export type ButtonToneType = 
  | 'violet'    // เปลี่ยนจาก primary
  | 'blue'      // เพิ่มใหม่
  | 'green'     // เปลี่ยนจาก success
  | 'vue'       // เปลี่ยนจาก warning
  | 'orange'    // เพิ่มใหม่
  | 'red';      // เปลี่ยนจาก danger

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly DEFAULT_THEME: ThemeConfig = {
    mode: 'dark',
    color: 'violet',    // เปลี่ยนจาก 'info' เป็น 'violet'
    direction: 'ltr'
  };

  private themeSubject: BehaviorSubject<ThemeConfig>;
  public theme$: Observable<ThemeConfig>;

  constructor() {
    this.themeSubject = new BehaviorSubject<ThemeConfig>(this.getInitialTheme());
    this.theme$ = this.themeSubject.asObservable();
  }

  get isDark(): boolean {
    return this.themeSubject?.value?.mode === 'dark';
  }

  private isValidTheme(theme: any): theme is ThemeConfig {
    return (
      theme &&
      ['light', 'dark'].includes(theme.mode) &&
      ['violet', 'blue', 'green', 'vue', 'orange', 'red'].includes(theme.color) && // อัพเดทรายการสี
      ['ltr', 'rtl'].includes(theme.direction)
    );
  }

  private debugThemeColors(): void {
    if (typeof window === 'undefined' || !document?.documentElement) {
      console.warn('Document not available for theme debugging');
      return;
    }
    console.group('Theme Colors Debug');
    console.log('Current Theme:', this.getCurrentTheme());
    console.log('CSS Variables:', {
      '--violet': getComputedStyle(document.documentElement).getPropertyValue('--violet'),
      '--blue': getComputedStyle(document.documentElement).getPropertyValue('--blue'),
      '--green': getComputedStyle(document.documentElement).getPropertyValue('--green'),
      '--vue': getComputedStyle(document.documentElement).getPropertyValue('--vue'),
      '--orange': getComputedStyle(document.documentElement).getPropertyValue('--orange'),
      '--red': getComputedStyle(document.documentElement).getPropertyValue('--red')
    });
    console.groupEnd();
  }

  private applyThemeToDOM(theme: ThemeConfig): void {
    if (typeof window === 'undefined' || !document?.documentElement) {
      console.warn('Document not available for theme application');
      return;
    }
    
    console.log('Applying theme:', theme);
    
    try {
      // Mode
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme.mode);
      
      // Theme color
      document.documentElement.setAttribute('data-theme', theme.color);
      
      // Direction
      document.documentElement.setAttribute('dir', theme.direction);
      
      // Debug
      console.log('Theme applied:', {
        mode: theme.mode,
        color: document.documentElement.getAttribute('data-theme'),
        direction: theme.direction
      });

      // Debug colors
      this.debugThemeColors();
    } catch (error) {
      console.error('Error applying theme to DOM:', error);
    }
  }

  private getInitialTheme(): ThemeConfig {
    try {
      const saved = localStorage.getItem(this.THEME_KEY);
      if (saved) {
        const parsedTheme = JSON.parse(saved);
        if (this.isValidTheme(parsedTheme)) {
          console.log('Loading saved theme:', parsedTheme);
          this.applyThemeToDOM(parsedTheme);
          return parsedTheme;
        }
      }
      console.log('Using default theme:', this.DEFAULT_THEME);
      this.applyThemeToDOM(this.DEFAULT_THEME);
      return this.DEFAULT_THEME;
    } catch (error) {
      console.warn('Error loading theme:', error);
      this.applyThemeToDOM(this.DEFAULT_THEME);
      return this.DEFAULT_THEME;
    }
  }

  getCurrentTheme(): ThemeConfig {
    return this.themeSubject?.value || this.DEFAULT_THEME;
  }

  setTheme(config: Partial<ThemeConfig>): void {
    if (!this.themeSubject) {
      console.warn('Theme service not properly initialized');
      return;
    }
    const currentTheme = this.themeSubject.value;
    const newTheme = { ...currentTheme, ...config };
    
    if (this.isValidTheme(newTheme)) {
      console.log('Setting new theme:', newTheme);
      localStorage.setItem(this.THEME_KEY, JSON.stringify(newTheme));
      this.applyThemeToDOM(newTheme);
      this.themeSubject.next(newTheme);
    } else {
      console.error('Invalid theme configuration:', newTheme);
    }
  }
}
