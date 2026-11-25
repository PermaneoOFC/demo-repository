import { createServer } from 'vite';

export async function browserServer(port) {
  if (process.env.BASE_URL) {
    return { baseURL: process.env.BASE_URL.replace(/\/+$/, ''), close: async () => {} };
  }
  const server = await createServer({ server: { host: '127.0.0.1', port, strictPort: true } });
  await server.listen();
  return { baseURL: 'http://127.0.0.1:' + port, close: () => server.close() };
}
