const express = require("express");

const http = require("http");
const vhost = require("vhost");
const path = require('path');
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
const { consoleBox } = require("consolebox");


const authController = require("./middlewares/auth");
const indexController = require("./controllers/routes");
const dashboardController = require("./controllers/dashboard");
const wsHandler = require("./ws_handlers/wsHandler");
const errorsController = require("./controllers/errors");
const { beanz, version, testWS } = require("./middlewares/all");

const dotenv = require("dotenv");
const logger = require("./middlewares/logger");
dotenv.config();



async function startServer() {


  // Clear console 
  process.stdout.write("\x1Bc");

  consoleBox(
    "Initializing".white,
    process.env.APP.toUpperCase().cyan,
    process.env.VERSION.green,
    null,
  );

  await version();

  const app = express();
  const server = http.createServer(app);

  // Set EJS as the default view engine
  app.set("view engine", "ejs");
  app.set("views", `./templates/${process.env.THEME}/views`);

  // Create a Redis client
  const redisClient = redis.createClient();

  if (!redisClient.isOpen) {
    await redisClient.connect();
    logger.info("Connected to Redis server!".green);
    // Flush Redis in dev
    if ((process.env.STATE === "dev") & (true === false)) {
      redisClient.flushAll();
      logger.warn(`\n ${'WARNING:'.bold} Redis cache was flushed \n`.bgRed); // will be true if successfull
    }
  }

  app.use(beanz);

  // Configure session middleware with Redis as session store
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        name: "beanz_session",
        secure: process.env.STATE === 'dev' ? false : true, // Change to true if using HTTPS
        domain: "." + process.env.DOMAIN, // Ensures the cookie is accessible across subdomains
        maxAge: 24 * 60 * 60 * 1000 * 365, // 1 year
      },
    }),
  );

  // Handle Redis client events
  redisClient.on("connect", () => {
    logger.info("Connected to Redis server!".green);
  });

  redisClient.on("error", (err) => {
    logger.error("Error connecting to Redis:".bgRed, err);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(vhost(process.env.DOMAIN, indexController));
  app.use(
    vhost(
      "dashboard." + process.env.DOMAIN,
      authController,
      dashboardController,
    ),
  );



app.use(vhost('static.' + process.env.DOMAIN, express.static(__dirname + '/public/' + process.env.THEME)));

 

  wsHandler(server), testWS();
  // Error handling
  app.use(errorsController);

  const port = process.env.PORT || 80;

  await new Promise((resolve, reject) => {
    server.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        logger.info(
          `Server is running on port ${port} Domain: ${process.env.DOMAIN}`
            .blue,
        );
        resolve();
      }
    });
  });
}

startServer().catch((err) => {
  logger.error("Error starting server:".bgRed, err);
  process.exit(1);
});