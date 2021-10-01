const express = require('express');
const path = require('path')
const app = express();

const Routing = require('./server/routing/all.js');




const routing = new Routing(app);



app.listen('80',function(){
    console.log('App is listening on port 80')
})