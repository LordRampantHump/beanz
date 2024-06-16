const usersWsHandler = (ws, req) => {
    console.log('User WebSocket connection established');
    ws.on('message', (message) => {
      console.log(`User WebSocket received message: ${message}`);
      // Handle user WebSocket logic here
    });
  };
  
  module.exports = usersWsHandler;
  