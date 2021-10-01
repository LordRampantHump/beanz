const vhost = require("vhost");

class Api {
    constructor(router, app, express) {
        console.log('api router loaded');
      
        app.use(vhost('api.localhost', router.api));
        router.api.use(express.urlencoded({
            extended: true
        }))
        router.api.use(express.json())

        // Check for some general errors 
        router.api.use(function(req, res, next) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-Powered-By', 'SpotiSpy');

            if (req.method === "GET")
                return res.status(400).json({
                    error: 'invalid method',
                    status: 400
                })

            if (!req.body || Object.keys(req.body).length === 0)
                return res.status(400).json({
                    error: 'no data could be parsed, check Content-Type is application/json',
                    status: 400
                })



            next();
        });

        router.api.use('/titty', function(request, response) {
            response.end('api bollox')
        })

    }


}

module.exports = Api