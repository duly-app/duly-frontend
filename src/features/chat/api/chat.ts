import { apiClient } from '@/features/auth/api/client';

/** An action the assistant wants to take, waiting on the user. */
export interface PendingAction {
  tool_use_id: string;
  name: string;
  input: Record<string, unknown>;
}

export interface Decision {
  tool_use_id: string;
  approved: boolean;
  reason?: string;
}

export interface ChatResponse {
  thread_id: string;
  message: string;
  token_usage: number;
  /** Non-empty when the turn stopped to ask. The message is then empty. */
  pending: PendingAction[];
}

export function sendMessage(threadId: string, message: string): Promise<ChatResponse> {
  return apiClient<ChatResponse>(`/chat/threads/${threadId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

/**
 * Answer the actions a turn stopped for, which carries that turn on.
 *
 * Only ids travel: what runs is read from the thread on the server, so the
 * action taken is the one that was shown.
 */
export function sendDecisions(threadId: string, decisions: Decision[]): Promise<ChatResponse> {
  return apiClient<ChatResponse>(`/chat/threads/${threadId}/approvals`, {
    method: 'POST',
    body: JSON.stringify({ decisions }),
  });
}
