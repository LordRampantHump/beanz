const path = require('path');
class Web {
    constructor(router, app, express) {
        console.log('[SYSTEM] web router loaded');
        const webRoot = path.resolve('./server/html/temp/');
        var options = {
            root: webRoot
        };
        app.use(express.static(path.join(webRoot, 'public')))

        app.use('/', router.web);


        router.web.get('/', function(request, response) {
            console.log(request.session)
            response.sendFile('index.html', options);
        })



    }


}

module.exports = Web