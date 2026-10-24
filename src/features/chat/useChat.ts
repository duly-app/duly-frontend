import { useRef, useState } from 'react';
import { sendDecisions, sendMessage, type ChatResponse, type PendingAction } from './api/chat';

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
  const [pending, setPending] = useState<PendingAction[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function append(author: ChatMessage['author'], text: string) {
    setMessages((current) => [...current, { id: crypto.randomUUID(), author, text }]);
  }

  /** A turn either answers or stops to ask; never both. */
  function applyTurn({ message, pending: waiting }: ChatResponse) {
    setPending(waiting);

    if (message) append('assistant', message);
  }

  async function run(turn: () => Promise<ChatResponse>) {
    setError(null);
    setIsSending(true);
    setPending([]);

    try {
      applyTurn(await turn());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The assistant could not reply');
    } finally {
      setIsSending(false);
      onTurnComplete?.();
    }
  }

  async function send(text: string) {
    const question = text.trim();

    if (!question || isSending) return;

    append('user', question);

    await run(() => sendMessage(threadId, question));
  }

  /**
   * Answer every pending action at once. The server runs the batch as a unit,
   * so a partial answer is refused rather than half applied.
   */
  async function decide(approved: boolean, reason?: string) {
    if (pending.length === 0 || isSending) return;

    const decisions = pending.map((action) => ({
      tool_use_id: action.tool_use_id,
      approved,
      reason,
    }));

    await run(() => sendDecisions(threadId, decisions));
  }

  return { messages, pending, isSending, error, send, decide };
}
