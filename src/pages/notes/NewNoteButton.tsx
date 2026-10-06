import { PlusIcon } from 'lucide-react';

/** The half-transparent card at the head of the grid. Opens the new note dialog. */
export default function NewNoteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
    >
      <PlusIcon className="size-5" />
      <span className="text-sm font-medium">New note</span>
    </button>
  );
}
