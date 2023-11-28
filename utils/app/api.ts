import { ClaudeAIModels } from '@/types/claude';
import { Plugin, PluginID } from '@/types/plugin';

export const getEndpoint = (plugin: Plugin | null, modelId: string) => {
  if (!plugin) {
    if (Object.keys(ClaudeAIModels).includes(modelId)) {
      return 'api/chat/claude';
    }
    return 'api/chat/openai';
  }

  if (plugin.id === PluginID.GOOGLE_SEARCH) {
    return 'api/google';
  }

  return 'api/chat/openai';
};
