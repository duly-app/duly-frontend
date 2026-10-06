import { apiClient } from './client';

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface NotesResponse {
  notes: Note[];
}

function fetchNotes(): Promise<NotesResponse> {
  return apiClient<NotesResponse>('/notes');
}

function addNote(note: Omit<Note, 'id'>): Promise<Note> {
  return apiClient<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
}

export { fetchNotes, addNote };
