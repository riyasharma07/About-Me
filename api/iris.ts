// Vercel serverless function: POST /api/iris
// Body: { messages: [{ role: 'user' | 'assistant', content: string }] }
// Response: a plain-text stream of Iris's answer.
//
// Env vars (set in Vercel → Project → Settings → Environment Variables):
//   GOOGLE_API_KEY (free from https://aistudio.google.com/apikey)
//   GEMINI_MODEL (optional, defaults to gemini-flash-latest)
//   ALLOWED_ORIGINS (optional, comma-separated)
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { systemPrompt } from './_lib/knowledge.js';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const MAX_MESSAGES = 12; // conversation history kept per request
const MAX_CHARS = 800; // per message
const RATE_LIMIT = { windowMs: 60_000, max: 10 }; // per IP, per warm instance

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ?? 'https://riyasharma07.github.io,http://localhost:5173'
)
  .split(',')
  .map((o) => o.trim());

// Best-effort limiter: resets on cold starts and isn't shared across instances.
// Good enough for a portfolio; swap for Upstash/Vercel KV if you ever get abuse.
const hits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { messages?: unknown }).messages)) {
    return null;
  }
  const messages = (body as { messages: unknown[] }).messages.slice(-MAX_MESSAGES);
  const valid = messages.every(
    (m): m is ChatMessage =>
      !!m &&
      typeof m === 'object' &&
      ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant') &&
      typeof (m as ChatMessage).content === 'string' &&
      (m as ChatMessage).content.length <= MAX_CHARS,
  );
  if (!valid || messages.length === 0 || (messages.at(-1) as ChatMessage).role !== 'user') return null;
  return messages as ChatMessage[];
}

let model: ChatGoogleGenerativeAI | undefined;
function getModel(): ChatGoogleGenerativeAI {
  // Reads GOOGLE_API_KEY from the environment automatically.
  model ??= new ChatGoogleGenerativeAI({
    model: process.env.GEMINI_MODEL ?? 'gemini-flash-latest',
    temperature: 0.3,
    maxOutputTokens: 1024,
  });
  return model;
}

export function OPTIONS(request: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
}

export async function POST(request: Request): Promise<Response> {
  const headers = corsHeaders(request.headers.get('origin'));
  const json = (status: number, error: string) =>
    Response.json({ error }, { status, headers });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) return json(429, 'Too many questions — please wait a minute.');

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) return json(400, 'Invalid request.');

  const langchainMessages = [
    new SystemMessage(systemPrompt),
    ...messages.map((m) => (m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content))),
  ];

  let stream;
  try {
    stream = await getModel().stream(langchainMessages);
  } catch (err) {
    console.error('Iris model error', err);
    return json(502, 'Iris is having trouble thinking right now.');
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (typeof chunk.content === 'string' && chunk.content) {
            controller.enqueue(encoder.encode(chunk.content));
          }
        }
      } catch (err) {
        console.error('Iris stream error', err);
        controller.enqueue(encoder.encode('\n\n(Sorry, I lost my train of thought.)'));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
