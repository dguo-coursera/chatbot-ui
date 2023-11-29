export interface Message {
  role: Role;
  content: string;
}

export interface ChatModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
  requestLimit: number;
}

export type Role = 'assistant' | 'user';

export interface ChatBody {
  model: ChatModel;
  messages: Message[];
  key: string;
  prompt: string;
  temperature: number;
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  model: ChatModel;
  prompt: string;
  temperature: number;
  folderId: string | null;
}
