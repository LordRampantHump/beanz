const WebSocket = require('ws');
const redis = require('redis');

// Function to parse cookies from the header
const parseCookies = (cookieHeader) => {
  const cookies = {};
  cookieHeader && cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.match(/(.*?)=(.*)$/);
    if (parts) {
      cookies[(parts[1] || '').trim()] = (parts[2] || '').trim();
    }
  });
  return cookies;
};

module.exports = (server, sessionMiddleware) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
   
    ws.send(`Welcome to ${process.env.APP.toUpperCase()} Websocket.`);

    ws.on('message', (message) => {
   
      ws.send(`You said: ${message}`);
    });

  });

 
};
