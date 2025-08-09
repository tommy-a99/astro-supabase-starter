import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

export const prerender = false;

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export async function POST({ request }: { request: Request }) {
  const { messages } = await request.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
