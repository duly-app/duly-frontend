import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';

interface NotesProps {
  // Structural rather than the Note type, so this shared component stays
  // independent of the notes feature's data layer.
  note: { title: string; content: string; last_updated: string };
  onEdit: () => void;
  onDelete: () => void;
}

export default function Notes({ note, onEdit, onDelete }: NotesProps) {
  const lastUpdated = new Date(note.last_updated).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card className="min-h-40">
      <CardHeader>
        <CardTitle className="line-clamp-1">{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-4 text-sm whitespace-pre-line text-muted-foreground">
          {note.content}
        </p>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <span className="text-xs text-muted-foreground">{lastUpdated}</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onEdit}
            aria-label={`Edit ${note.title}`}
            className="text-muted-foreground hover:text-foreground"
          >
            <PencilIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onDelete}
            aria-label={`Delete ${note.title}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2Icon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
