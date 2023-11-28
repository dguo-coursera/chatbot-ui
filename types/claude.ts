import { ChatModel } from "./chat";

export enum ClaudeAIModelID {
  CLAUDE_V2 = 'anthropic.claude-v2'
}

export const ClaudeAIModels: Record<ClaudeAIModelID, ChatModel> = {
  [ClaudeAIModelID.CLAUDE_V2]: {
    id: ClaudeAIModelID.CLAUDE_V2,
    name: 'Claude V2',
    maxLength: 2500,
    tokenLimit: 100000,
    requestLimit: 75000,
  },
};

export class ClaudeAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = 'OpenAIError';
    this.type = type;
    this.param = param;
    this.code = code;
  }
}
