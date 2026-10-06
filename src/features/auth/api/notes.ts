import { apiClient } from './client';

export interface Note {
  id: string;
  title: string;
  content: string;
  last_updated: string;
}

/** What a write accepts, which is narrower than what a read returns. */
export interface NoteInput {
  title: string;
  content: string;
}

export interface NotesResponse {
  notes: Note[];
}

function fetchNotes(): Promise<NotesResponse> {
  return apiClient<NotesResponse>('/notes');
}

function addNote(note: NoteInput): Promise<Note> {
  return apiClient<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
}

function updateNote(id: string, note: NoteInput): Promise<Note> {
  return apiClient<Note>(`/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  });
}

function deleteNote(id: string): Promise<void> {
  return apiClient<void>(`/notes/${id}`, { method: 'DELETE' });
}

export { fetchNotes, addNote, updateNote, deleteNote };
