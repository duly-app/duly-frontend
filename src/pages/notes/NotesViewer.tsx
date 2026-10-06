import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchNotes, type Note, type NotesResponse } from '@/features/auth/api/notes';
import { filterNotes } from './search';
import NewNoteDialog from './NewNoteDialog';
import NotesGrid from './NotesGrid';
import SearchBar from './SearchBar';

function NotesViewer() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    let active = true;

    fetchNotes()
      .then((data: NotesResponse) => {
        if (active) setNotes(data.notes);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Could not load notes');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleNotes = filterNotes(notes, search);
  const noMatches = search.trim() !== '' && visibleNotes.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <SearchBar value={search} onChange={setSearch} />
        <Button onClick={() => setIsCreating(true)}>
          <PlusIcon />
          New note
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="min-h-0 p-1 flex-1 overflow-auto">
        <NotesGrid
          notes={visibleNotes}
          isLoading={isLoading}
          onNewNote={() => setIsCreating(true)}
        />

        {noMatches && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No notes match “{search.trim()}”.
          </p>
        )}
      </div>

      <NewNoteDialog
        open={isCreating}
        onOpenChange={setIsCreating}
        onCreated={(note) => setNotes((current) => [note, ...current])}
      />
    </div>
  );
}

export default NotesViewer;
