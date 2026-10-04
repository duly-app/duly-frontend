import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSideBar from './AppSideBar';

function HomePage() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}

export default HomePage;
