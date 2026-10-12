import { apiClient } from '@/features/auth/api/client';

export interface ChatResponse {
  thread_id: string;
  message: string;
  token_usage: number;
}

export function sendMessage(threadId: string, message: string): Promise<ChatResponse> {
  return apiClient<ChatResponse>(`/chat/threads/${threadId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}
