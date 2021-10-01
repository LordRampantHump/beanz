const express = require('express');

const router = {};
router.api = express.Router();
router.web = express.Router();
const Api = require('./api')
const Web = require('./web')

class Routing {
    constructor(app) {
        console.log('loading new routing')
        this.app = app;
        this.api = new Api(router, app, express)
        this.web = new Web(router, app, express)


    }


    * api(app) {
            console.log('Loading new API')
            return new Api(router, app)
    }
    * web(app) {
            console.log('Loading new Web')
            return new Web(router, app)
    }


}
module.exports = Routing