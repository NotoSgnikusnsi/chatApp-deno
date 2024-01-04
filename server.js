import { serve } from 'http/server.ts';
import { serveDir } from 'http/file_server.ts';

serve((req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === 'GET' && pathname === '/hello') {
    return new Response('Hello world!');
  }

  return serveDir(req, {
    fsRoot: 'public',
    urlRoot: '',
    showDirListing: true,
    enableCors: true,
  });
});
