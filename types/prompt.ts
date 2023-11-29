import { ChatModel } from "./chat";

export interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  model: ChatModel;
  folderId: string | null;
}
