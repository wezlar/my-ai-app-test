import openai from '../config/openaiConfig';
import OpenAI from 'openai';

interface IGenerateResponse {
  previousMessages?: OpenAI.ChatCompletionMessageParam[],
  newMessage?: string
}

const defaultConfig: OpenAI.ChatCompletionMessageParam[] = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hello, World!" }
];

export const generateCurrentConverstation = ({previousMessages, newMessage}: IGenerateResponse): OpenAI.ChatCompletionMessageParam[] => {
  const messages: OpenAI.ChatCompletionMessageParam[] = previousMessages || defaultConfig;

  if (newMessage) {
    messages.push({ role: "user", content: newMessage });
  }

  return messages;

}

export const generateResponse = async (messages: OpenAI.ChatCompletionMessageParam[]): Promise<OpenAI.Chat.ChatCompletion> => {
  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-4-1106-preview',
  })

  return completion;
}