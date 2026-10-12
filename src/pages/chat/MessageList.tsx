import { Bubble, BubbleContent } from '@/components/ui/bubble';
import { Spinner } from '@/components/ui/spinner';
import type { ChatMessage } from '@/features/chat/useChat';

interface MessageListProps {
  messages: ChatMessage[];
  isSending: boolean;
}

export default function MessageList({ messages, isSending }: MessageListProps) {
  if (messages.length === 0 && !isSending) {
    return (
      <p className="m-auto max-w-56 text-center text-sm text-muted-foreground">
        Ask about your notes.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <Bubble
          key={message.id}
          align={message.author === 'user' ? 'end' : 'start'}
          variant={message.author === 'user' ? 'default' : 'muted'}
        >
          <BubbleContent className="whitespace-pre-line">{message.text}</BubbleContent>
        </Bubble>
      ))}

      {isSending && (
        <Bubble variant="muted">
          <BubbleContent>
            <Spinner className="size-4" />
          </BubbleContent>
        </Bubble>
      )}
    </div>
  );
}
