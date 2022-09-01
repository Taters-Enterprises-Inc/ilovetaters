export interface SidebarItem {
  name: string;
  link: string;
  icon: any;
  iconClosed?: any;
  iconOpened?: any;
  subNav?: SidebarItem[];
}
