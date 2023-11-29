import { ChatBody } from '@/types/chat';

import AnthropicBedrock from '@anthropic-ai/bedrock-sdk';
import { ClaudeAIError, ClaudeAIModelID, ClaudeAIModels } from '@/types/claude'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new AnthropicBedrock();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { model, messages, temperature } = req.body as ChatBody;

    // Build prompt to send from object with past messages
    let messagesToSend = ""

    for (const {role, content} of messages) {
      messagesToSend += `${(role === 'user' ? AnthropicBedrock.HUMAN_PROMPT : AnthropicBedrock.AI_PROMPT)} ${content}`
    }
    
    // Send prompt to Claude and stream the response
    const max_tokens_to_sample = ClaudeAIModels[model.id as ClaudeAIModelID].maxLength;

    const stream = await client.completions.create({
      prompt: `${messagesToSend} ${AnthropicBedrock.AI_PROMPT}`,
      model: model.id,
      stream: true,
      temperature,
      max_tokens_to_sample
    });

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Connection', 'keep-alive');

    // Flush response text as it comes into the stream
    for await (const completion of stream) {
      res.write(completion.completion);
      res.flushHeaders();
    }

    res.end(); 

  } catch (error) {
    console.error(error);
    if (error instanceof ClaudeAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;