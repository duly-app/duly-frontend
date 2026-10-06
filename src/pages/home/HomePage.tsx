import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSideBar from './AppSideBar';
import NotesViewer from '../notes/NotesViewer';

function HomePage() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="flex min-h-svh flex-1 flex-col">
        <div className="flex items-center border-b p-2">
          <SidebarTrigger />
        </div>
        <NotesViewer />
      </main>
    </SidebarProvider>
  );
}

export default HomePage;
