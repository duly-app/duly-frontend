import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/features/chat/useChat';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

interface ChatPanelProps {
  onClose: () => void;
  onTurnComplete: () => void;
}

export default function ChatPanel({ onClose, onTurnComplete }: ChatPanelProps) {
  const { messages, isSending, error, send } = useChat(onTurnComplete);

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l">
      <div className="flex items-center justify-between border-b p-2">
        <span className="pl-2 text-sm font-medium">Assistant</span>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
          <XIcon />
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-auto p-3">
        <MessageList messages={messages} isSending={isSending} />
      </div>

      {error && <p className="px-3 pb-2 text-sm text-destructive">{error}</p>}

      <ChatInput onSend={send} disabled={isSending} />
    </aside>
  );
}
