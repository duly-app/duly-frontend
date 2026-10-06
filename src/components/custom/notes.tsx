import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function Notes({ note }: { note: { title: string; content: string } }) {
  return (
    <Card className="min-h-40">
      <CardHeader>
        <CardTitle className="line-clamp-1">{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4 text-sm text-muted-foreground">{note.content}</p>
      </CardContent>
    </Card>
  );
}
