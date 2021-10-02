const express = require('express');
const session = require('express-session');
const router = {};
router.api = express.Router();
router.web = express.Router();
const Api = require('./api')
const Web = require('./web')
const Ws = require('./ws')

class Routing {
    constructor(app) {
        console.log('[SYSTEM] loading routing')
        this.app = app;
        app.use(session({

            secret: 'kfdbchddh37373kshdkjsdhkj33434',
            resave: false,
            saveUninitialized: false,
            cookie: { 
                secure: false, 
                domain: '*.localhost', 
                maxAge: 1000 * 60 * 60 * 2,
                sameSite: true},
            name: 'sid'
          }))

        /*
        
        TODO:
          what should i do here? 
          Should I auto initalize these?
          I cant for the websocket cos i need to return that... i think...
          oh well, we shall see further on, for now lets comment them and init them in the main app

         
        this.ws = new Ws(router, app, express)  
        this.api = new Api(router, app, express)
        this.web = new Web(router, app, express)

        */ 
        


    }
    ws(){
        return new Ws(router, this.app, express)
    }
    api(){
        return new Api(router, this.app, express)
    }
    web(){
        return new Web(router, this.app, express)
    }
    /*

    * ws(app) {
    return new Web(router, app, express)
    }   

    * api(app) {
        console.log('API Mutherfucker')
            return new Api(router, app, express)
    }
    * web(app) {
            return new Web(router, app, express)
    }

    */

}
module.exports = Routing