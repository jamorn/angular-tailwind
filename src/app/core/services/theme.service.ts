import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ThemeConfig {
  mode: 'light' | 'dark';
  color: ButtonToneType;
  direction: 'ltr' | 'rtl';
}

export type ButtonToneType = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly DEFAULT_THEME: ThemeConfig = {
    mode: 'dark',
    color: 'info', // violet default
    direction: 'ltr'
  };

  private themeSubject = new BehaviorSubject<ThemeConfig>(this.getInitialTheme());
  public theme$ = this.themeSubject.asObservable();

  get isDark(): boolean {
    return this.themeSubject.value.mode === 'dark';
  }

  private isValidTheme(theme: any): theme is ThemeConfig {
    return (
      theme &&
      ['light', 'dark'].includes(theme.mode) &&
      ['primary', 'danger', 'success', 'warning', 'info', 'light'].includes(theme.color) &&
      ['ltr', 'rtl'].includes(theme.direction)
    );
  }

  private applyThemeToDOM(theme: ThemeConfig): void {
    console.log('Applying theme:', theme);
    
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
    return this.themeSubject.value;
  }

  setTheme(config: Partial<ThemeConfig>): void {
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
