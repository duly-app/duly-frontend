import { useRef, useState } from 'react';
import { sendMessage } from './api/chat';

export interface ChatMessage {
  id: string;
  author: 'user' | 'assistant';
  text: string;
}

/**
 * @param onTurnComplete Called after every turn, successful or not. A turn may
 * have created, updated or deleted notes, and the cost of refetching is nothing
 * against the seconds the turn itself took.
 */
export function useChat(onTurnComplete?: () => void) {
  const threadId = useRef(crypto.randomUUID()).current;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function append(author: ChatMessage['author'], text: string) {
    setMessages((current) => [...current, { id: crypto.randomUUID(), author, text }]);
  }

  async function send(text: string) {
    const question = text.trim();

    if (!question || isSending) return;

    setError(null);
    setIsSending(true);
    append('user', question);

    try {
      const { message } = await sendMessage(threadId, question);
      append('assistant', message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The assistant could not reply');
    } finally {
      setIsSending(false);
      onTurnComplete?.();
    }
  }

  return { messages, isSending, error, send };
}
