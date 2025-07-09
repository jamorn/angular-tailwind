export class ProfileMenuComponent {
  // ...existing code...

  setThemeColor(color: ThemeType) {
    console.log('ProfileMenu: Changing theme to:', color);
    this.themeService.setTheme(color);
  }
}