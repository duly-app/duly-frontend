import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from '@/components/ui/sidebar';
import { HouseIcon, LogOutIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '@/features/auth/context/UseAuth';

function AppSideBar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();

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
      <SidebarContent />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Log out">
              <LogOutIcon />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
