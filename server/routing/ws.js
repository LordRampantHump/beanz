const vhost = require("vhost");
const {
    createProxyMiddleware
} = require('http-proxy-middleware');
const http = require('http');
const WebSocket = require('ws');

class Ws {
    constructor(router, app, express) {
        console.log('[SYSTEM] ws router loaded');
        const server = new http.createServer({});
        this.socket = new WebSocket.Server({
            server,
            maxPayload: 300,
        });

        server.listen(2053);

        const options = {
            target: 'ws://localhost:2053', // target host
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
        };

        const exampleProxy = createProxyMiddleware(options);

        app.use(vhost('ws.*', exampleProxy));
        return this.socket;

    }

}
module.exports = Ws