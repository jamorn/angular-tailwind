import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Reports',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Chart',
          route: '/dashboard',
          children: [
            { label: 'Safety', route: '/dashboard/safety' },
            { label: 'OEE', route: '/dashboard/oee' },
            { label: 'Giveaway', route: '/dashboard/giveaway' },
            { label: 'EII', route: '/dashboard/eii' }
          ],
        }
      ]
    },
    {
      group: 'Administration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/admin',
          children: [
            { label: 'Users', route: '/admin/users' },
            { label: 'Roles', route: '/admin/roles' },
            { label: 'Permissions', route: '/admin/permissions' }
          ]
        },
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
}
