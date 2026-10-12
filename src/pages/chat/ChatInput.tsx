import { useState } from 'react';
import { SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [draft, setDraft] = useState('');

  function submit() {
    if (!draft.trim()) return;

    onSend(draft);
    setDraft('');
  }

  return (
    <form
      className="flex items-end gap-2 border-t p-2"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <Textarea
        className="max-h-32 min-h-9 flex-1 resize-none"
        placeholder="Ask about your notes"
        value={draft}
        rows={1}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
      />
      <Button type="submit" size="icon" disabled={disabled || !draft.trim()} aria-label="Send">
        <SendIcon />
      </Button>
    </form>
  );
}
