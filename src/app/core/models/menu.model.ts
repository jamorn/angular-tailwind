export interface BaseMenuItem {
    label: string;
    route: string;  // Make route required for all menu items
    icon?: string;  // Move icon to base interface
    expanded?: boolean;
    active?: boolean;
    selected?: boolean;
}

export interface MenuItem extends BaseMenuItem {
    children?: MenuItem[];
}

export interface SubMenuItem extends BaseMenuItem {
    children?: SubMenuItem[];  // Override children type for submenu items
}

export interface MenuGroup {
    group: string;
    separator?: boolean;
    items: MenuItem[];
    selected?: boolean;
    active?: boolean;
}
