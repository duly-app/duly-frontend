import { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteNote, fetchNotes, type Note, type NotesResponse } from '@/features/auth/api/notes';
import { filterNotes } from './search';
import NoteDialog from './NoteDialog';
import NotesGrid from './NotesGrid';
import SearchBar from './SearchBar';

function NotesViewer() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

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

  function openCreateDialog() {
    setEditingNote(undefined);
    setIsDialogOpen(true);
  }

  function openEditDialog(note: Note) {
    setEditingNote(note);
    setIsDialogOpen(true);
  }

  function handleSaved(saved: Note) {
    setNotes((current) =>
      current.some((note) => note.id === saved.id)
        ? current.map((note) => (note.id === saved.id ? saved : note))
        : [saved, ...current],
    );
  }

  async function handleDelete(id: string) {
    setError(null);

    try {
      await deleteNote(id);
      setNotes((current) => current.filter((note) => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete the note');
    }
  }

  const visibleNotes = filterNotes(notes, search);
  const noMatches = search.trim() !== '' && visibleNotes.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <SearchBar value={search} onChange={setSearch} />
        <Button onClick={openCreateDialog}>
          <PlusIcon />
          New note
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="min-h-0 p-1 flex-1 overflow-auto">
        <NotesGrid
          notes={visibleNotes}
          isLoading={isLoading}
          onNewNote={openCreateDialog}
          onEditNote={openEditDialog}
          onDeleteNote={handleDelete}
        />

        {noMatches && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No notes match “{search.trim()}”.
          </p>
        )}
      </div>

      <NoteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSaved={handleSaved}
        note={editingNote}
      />
    </div>
  );
}

export default NotesViewer;
