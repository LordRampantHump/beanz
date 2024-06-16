const fs = require('fs').promises;
const url = require('url');
const path = require('path');
const WebSocket = require('ws');
const logger = require('./logger');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


async function fetchJson(url, headers) {
  const fetch = (await import('node-fetch')).default; // Dynamic import
  try {
    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
  } catch (error) {
    logger.error(error.message);
    return null;
  }
}

async function readTemplate(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    logger.error(`Failed to read file: ${filePath}`, error);
    throw error;
  }
}

async function sendEmail(email, html) {
  const fetch = (await import('node-fetch')).default; // Dynamic import
  const form = new FormData();
  form.append('from', email.from);
  form.append('to', email.to);
  form.append('subject', email.subject);
  form.append('html', html);

  try {
    const response = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`api:${process.env.MAILGUN_API}`)
      },
      body: form
    });

    const text = await response.text(); // Get the raw text response

    if (response.ok) {
      logger.info('Email sent successfully');
      return true;
    } else {
      logger.error(`Failed to send email: ${text}`);
      return false;
    }
  } catch (error) {
    logger.error('Failed to send email', error);
    return false;
  }
}

module.exports = {
  
  beanz: (req, res, next) => {
    res.setHeader('X-Powered-By', `${capitalizeFirstLetter(process.env.APP)} - © Ickle Mouse ${new Date().getFullYear()}`);
    const allowedExtensions = ['.ttf', '.woff', '.woff2'];

    // Parse the URL to get the pathname
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    // Get the file extension from the pathname
    const fileExtension = path.extname(pathname);
    const allowedOrigin = new RegExp(`^https?:\\/\\/([a-z0-9-]+\\.)?${process.env.DOMAIN}(\\/[^?]*)?(\\?.*)?$`, 'i');

    if (allowedExtensions.includes(fileExtension)) {
        const origin = req.headers.origin;
        if (allowedOrigin.test(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Methods', 'GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        }
    } 
    next();
},

  version: async function() {
    const env = process.env;
    logger.info(`Checking ${capitalizeFirstLetter(env.APP)} version...`);
    const headers = {
      'Content-Type': 'application/json',
      'X-ACCESS-KEY': env.JSONBIN
    };
    const finalres = await fetchJson("https://api.jsonbin.io/v3/b/666ab127ad19ca34f8786275", headers);
    if (finalres) {
      const currentVersion = parseFloat(env.VERSION);
      const fetchedVersion = parseFloat(finalres.record.version);
      if (fetchedVersion <= currentVersion) {
        logger.info(`${capitalizeFirstLetter(env.APP)} is up to date!`);
      } else {
        logger.warn(`A newer version ${fetchedVersion} of ${capitalizeFirstLetter(env.APP)} is available. Please update ${capitalizeFirstLetter(env.APP)}.`);
      }
    } else {
      logger.warn(`WARNING: Could not check ${capitalizeFirstLetter(env.APP)} Version`);
    }
  },

  testWS: async function() {
    const env = process.env;
    logger.info('Checking websocket...');
    try {
      const socket = new WebSocket(`ws://ws.${env.DOMAIN}`);

      socket.onmessage = (message) => {
        logger.info(`WebSocket message: ${message.data}`);
      };

      socket.onerror = (event) => {
        logger.error(`WebSocket error: ${event}`);
      };

      socket.onopen = () => {
        logger.info('WebSocket Connection OK');
        socket.close();
      };
    } catch (error) {
      logger.error('WebSocket Connection Failed', error);
    }
  },

  sendMail: async function(email) {
    try {
      const filePath = path.join(__dirname, '..', 'templates', 'email', email.template);
      let html = await readTemplate(filePath);

      if (email.swap && email.swap.length > 0) {
        for (const [key, value] of email.swap) {
          html = html.replace(key, value);
        }
      }

      return await sendEmail(email, html);
    } catch (error) {
      logger.error('Failed to prepare or send email', error);
      return false;
    }
  }
};