import { type Note } from '@/features/auth/api/notes';

export function filterNotes(notes: Note[], search: string): Note[] {
  const term = search.trim().toLowerCase();

  if (!term) {
    return notes;
  }

  return notes.filter(
    (note) => note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term),
  );
}
