import { useState } from 'react';
import { MessageSquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSideBar from './AppSideBar';
import ChatPanel from '../chat/ChatPanel';
import NotesViewer from '../notes/NotesViewer';

function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // Bumped after each chat turn, which the viewer refetches on.
  const [notesVersion, setNotesVersion] = useState(0);

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSideBar />
      <main className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center border-b p-2">
          <SidebarTrigger />
          <Button
            className="ml-auto"
            variant="ghost"
            size="icon"
            onClick={() => setIsChatOpen(true)}
            aria-label="Open chat"
          >
            <MessageSquareIcon />
          </Button>
        </div>
        <NotesViewer refreshKey={notesVersion} />
      </main>
      {isChatOpen && (
        <ChatPanel
          onClose={() => setIsChatOpen(false)}
          onTurnComplete={() => setNotesVersion((version) => version + 1)}
        />
      )}
    </SidebarProvider>
  );
}

export default HomePage;
