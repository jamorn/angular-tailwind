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
  public toggleMenu(item: MenuGroup | MenuItem): void {
    if (this.isMenuGroup(item)) {
      // Handle MenuGroup toggle
      if (!item.expanded) {
        this._pagesMenu.value.forEach(g => {
          if (g !== item) g.expanded = false;
        });
      }
      item.expanded = !item.expanded;
    } else {
      // Handle MenuItem toggle
      if (item.children?.length) {
        item.expanded = !item.expanded;
      }
    }
  }

  private isMenuGroup(item: MenuGroup | MenuItem): item is MenuGroup {
    return 'group' in item && 'items' in item;
  }

  public toggleSubMenu(item: SubMenuItem): void {
    // Close other items at same level when opening one
    if (item.children?.length) {
      const siblings = this.findSiblings(item);
      siblings.forEach(sibling => {
        if (sibling !== item) sibling.expanded = false;
      });
      item.expanded = !item.expanded;
    }
  }

  private findSiblings(item: SubMenuItem): SubMenuItem[] {
    let siblings: SubMenuItem[] = [];
    this._pagesMenu.value.forEach(group => {
      group.items.forEach(menuItem => {
        if (menuItem.children?.includes(item)) {
          siblings = menuItem.children;
        }
      });
    });
    return siblings;
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
