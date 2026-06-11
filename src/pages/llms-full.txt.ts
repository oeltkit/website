import type { APIRoute } from 'astro';
import body from '../content/llms/llms-full.txt?raw';

/** Serves /llms-full.txt from its content source in src/content/llms/. */
export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
