const chatWsHandler = (ws, req) => {
    console.log('Chat WebSocket connection established');
    ws.on('message', (message) => {
      console.log(`Chat WebSocket received message: ${message}`);
      // Handle chat WebSocket logic here
    });
  };
  
  module.exports = chatWsHandler;
  