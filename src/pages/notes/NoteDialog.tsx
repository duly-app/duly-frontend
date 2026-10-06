import { Dialog, DialogContent } from '@/components/ui/dialog';
import { type Note } from '@/features/auth/api/notes';
import NoteForm from './NoteForm';

interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (note: Note) => void;
  /** Present for editing, absent for creating. */
  note?: Note;
}

export default function NoteDialog({ open, onOpenChange, onSaved, note }: NoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <NoteForm note={note} onSaved={onSaved} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
