import { serve } from 'http/server.ts';
import { serveDir } from 'http/file_server.ts';

let sockets = [];

serve((req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === 'GET' && pathname === '/hello') {
    return new Response('Hello world!');
  }

  if (pathname === "/ws" && req.headers.get("upgrade") === "websocket") {
    const { response, socket } = Deno.upgradeWebSocket(req);
    sockets.push(socket)

    socket.onmessage = (e) => {
      const message = e.data;
      console.log(`message: ${message}`);
      sockets.forEach((s) => {
        try {
          s.send(message)
        } catch {
          console.error('Failed to send message:', error);
        }
      });
    }

    socket.onclose = () => {
      sockets = sockets.filter((s) => { s !== socket })
    }

    return response;
  }

  return serveDir(req, {
    fsRoot: 'public',
    urlRoot: '',
    showDirListing: true,
    enableCors: true,
  });
});
