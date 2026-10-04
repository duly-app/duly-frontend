import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { HouseIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function AppSideBar() {
  const { pathname } = useLocation();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link to="/home" />}
              isActive={pathname === '/home'}
              tooltip="Home"
            >
              <HouseIcon />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
}

export default AppSideBar;
