import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Menu } from '@core/constants/menu';
import { MenuGroup, MenuItem, SubMenuItem } from '@models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnDestroy {
  // State Management
  private readonly _subscription = new Subscription();
  private readonly _pagesMenu = new BehaviorSubject<MenuGroup[]>([]);
  public readonly pagesMenu$ = this._pagesMenu.asObservable();
  
  // UI State
  public showSideBar = true;
  public showMobileMenu = false;

  constructor() {
    this.initializeMenu();
  }

  // Menu State Getters
  public get pagesMenu(): MenuGroup[] {
    return this._pagesMenu.value;
  }

  public getMenu(): MenuGroup[] {
    return this._pagesMenu.value;
  }

  // Menu State Management
  private initializeMenu(): void {
    this._pagesMenu.next(Menu.publicMenu);
  }

  public setMenu(user: { roles?: string[] } | null): void {
    const menuGroups = Menu.getMenuByAuth(user);
    this._pagesMenu.next(menuGroups);
  }

  // Menu Item Actions
  public toggleMenu(group: MenuGroup): void {
    group.expanded = !group.expanded;
  }

  public toggleSubMenu(item: SubMenuItem): void {
    item.expanded = !item.expanded;
  }

  public toggleSidebar(): void {
    this.showSideBar = !this.showSideBar;
  }

  // Menu Item Helpers
  public isActive(route: string): boolean {
    return window.location.pathname.startsWith(route);
  }

  public filterMenuItems(items: MenuItem[]): MenuItem[] {
    return items.filter((item: MenuItem) => !item.route?.startsWith('/admin'));
  }

  // Type Conversion Helpers
  protected convertToSubMenuItem(item: MenuItem): SubMenuItem {
    if (!item.route) throw new Error('MenuItem must have a route');
    
    return {
      ...item,
      route: item.route,
      children: item.children?.map(child => this.convertToSubMenuItem(child))
    };
  }

  protected convertToSubMenuItems(items: MenuItem[]): SubMenuItem[] {
    return items.map(item => this.convertToSubMenuItem(item));
  }

  // Cleanup
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
