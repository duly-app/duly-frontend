import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addNote, updateNote, type Note } from '@/features/auth/api/notes';

interface NoteFormProps {
  /** Present for editing, absent for creating. */
  note?: Note;
  onSaved: (note: Note) => void;
  onClose: () => void;
}

export default function NoteForm({ note, onSaved, onClose }: NoteFormProps) {
  // Mounted only while the dialog is open, so these initialisers run afresh on
  // every open — no effect needed to seed or clear the fields.
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const saved = note
        ? await updateNote(note.id, { title, content })
        : await addNote({ title, content });

      onSaved(saved);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the note');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>{note ? 'Edit note' : 'New note'}</DialogTitle>
        <DialogDescription>Give it a title and some text.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-2">
        <Label htmlFor="note-title">Title</Label>
        <Input
          id="note-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Shopping list"
          required
          autoFocus
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="note-content">Note</Label>
        <Textarea
          id="note-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Milk, bread, coffee"
          className="max-h-[50vh] min-h-32 overflow-y-auto"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save note'}
        </Button>
      </DialogFooter>
    </form>
  );
}
