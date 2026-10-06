import { Skeleton } from '@/components/ui/skeleton';
import Notes from '@/components/custom/notes';
import { type Note } from '@/features/auth/api/notes';
import NewNoteButton from './NewNoteButton';

const SKELETON_COUNT = 3;

interface NotesGridProps {
  notes: Note[];
  isLoading: boolean;
  onNewNote: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesGrid({
  notes,
  isLoading,
  onNewNote,
  onEditNote,
  onDeleteNote,
}: NotesGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
      <NewNoteButton onClick={onNewNote} />

      {isLoading
        ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} className="min-h-40 rounded-xl" />
          ))
        : notes.map((note) => (
            <Notes
              key={note.id}
              note={note}
              onEdit={() => onEditNote(note)}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))}
    </div>
  );
}
