import { MenuGroup, MenuItem } from '@models/menu.model';

export class Menu {
  /**
   * Public menu items (Available without authentication)
   */
  public static readonly publicMenu: MenuGroup[] = [
    {
      group: 'Reports',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Reports',
          route: '/dashboard',
          children: [
            { 
              label: 'OEE', 
              route: '/dashboard/oee',
              icon: 'assets/icons/heroicons/outline/chart-pie.svg'
            },
            { 
              label: 'Safety', 
              route: '/dashboard/safety',
              icon: 'assets/icons/heroicons/outline/shield-check.svg'
            },
            { 
              label: 'Giveaway', 
              route: '/dashboard/giveaway',
              icon: 'assets/icons/heroicons/outline/gift.svg'
            },
            { 
              label: 'EII', 
              route: '/dashboard/eii',
              icon: 'assets/icons/heroicons/outline/chart-bar.svg'
            }
          ],
        }
      ]
    }
  ];

  /**
   * Protected menu items (Requires authentication)
   */
  private static readonly adminMenu: MenuGroup[] = [
    {
      group: 'Administration',
      separator: true,
      items: [
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

/**
   * Get menu items based on authentication status
   */
public static getMenu(user: { roles?: string[] } | null): MenuGroup[] {
  // No user = public menu only
  if (!user) return this.publicMenu;

  // Has admin role = all menus
  const isAdmin = user.roles?.includes('admin');
  return isAdmin ? [...this.publicMenu, ...this.adminMenu] : this.publicMenu;
}

/**
 * Check if menu item should be visible
 */
public static isVisible(item: MenuItem, user: { roles?: string[] } | null): boolean {
  if (!item.route?.startsWith('/admin')) return true;
  return user?.roles?.includes('admin') || false;
}

/**
 * Get all available routes for sitemap
 */
public static getAllRoutes(): string[] {
  const extractRoutes = (items: MenuItem[]): string[] => {
    return items.reduce((routes: string[], item) => {
      const itemRoutes = [item.route];
      if (item.children) {
        itemRoutes.push(...extractRoutes(item.children));
      }
      return [...routes, ...itemRoutes.filter(Boolean)] as string[];
    }, []);
  };

  const allGroups = [...this.publicMenu, ...this.adminMenu];
  return extractRoutes(allGroups.flatMap(group => group.items));
}

/**
 * Get menu items based on authentication status
 */
public static getMenuByAuth(user: { roles?: string[] } | null): MenuGroup[] {
  if (!user) return this.publicMenu;
  return this.publicMenu; // For now return public menu only
}
}
