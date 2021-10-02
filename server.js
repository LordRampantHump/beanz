const express = require('express');
const app = express();



const Routing = require('./server/routing/all.js');
const router = new Routing(app);

const webSocket = router.ws();
router.api();
router.web();
webSocket.on("connection", function(socket, req) {
    console.log('Do we have a connection?');
    socket.send()
})

app.listen(80,function(){
    console.log('[SYSTEM] App is listening on port 80')
})
