'use-strict';
const db = require('../db.json');
const pagedb = require('../pages.json');
const fs = require('node:fs');
const { MIME_TYPES } = require('../utils/types');
const path = require('path');
const { httpError } = require('../utils/error');
const { retrieveFile } = require('../files/file.controller');
const { bot } = require('../telegraf/bot.service');

const headers = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
  'Access-Control-Allow-Methods':
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  'Access-Control-Allow-Origin': '*',
};
const routing = {
  '/api/product/*': async ({ req, res }) => {
    switch (req.method) {
      case 'GET':
        const id = req.url.split('/').pop();
        const product = db.find((prod) => prod.id === id);
        res.writeHead(200, headers);

        res.end(JSON.stringify(product));
        break;
      default:
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Request route not found' }));
        break;
    }
  },
  '/api/products': async ({ req, res }) => {
    switch (req.method) {
      case 'GET':
        res.writeHead(200, headers);
        res.end(JSON.stringify(db));
        break;
      default:
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Request route not found' }));
        break;
    }
  },
  '/api/order-create': async ({ req, res }) => {
    switch (req.method) {
      case 'POST':
        try {
          const chunks = [];
          req.on('data', (chunk) => {
            chunks.push(chunk);
          });
          req.on('end', async () => {
            const data = Buffer.concat(chunks);
            const stringData = data.toString();
            const { queryId, products } = JSON.parse(stringData);
            await bot.telegram.answerWebAppQuery(queryId, {
              type: 'article',
              id: queryId,
              title: 'Успешная покупка',
              input_message_content: {
                message_text: `Осталось только оплатить товар: ${products
                  .map((item) => item.name)
                  .join(', ')}`,
              },
            });

            res.writeHead(200, headers);
            res.write(JSON.stringify({ queryId, products }));
            res.end();
          });
        } catch (error) {
          console.log(error);
          res.writeHead(500, headers);
          res.end(JSON.stringify({ message: 'Произошла ошибка на сервере' }));
        }

        break;
      default:
        res.writeHead(200, headers);
        res.end();
        break;
    }
  },
  '/api/page/*': ({ req, res }) => {
    switch (req.method) {
      case 'GET':
        try {
          const name = req.url.split('/').pop();
          let page = pagedb.find((page) => page.name === name);
          if (!page) throw new Error('Page Not Found');
          res.writeHead(200, headers);
          res.end(JSON.stringify(page));
        } catch (error) {
          res.writeHead(404, headers);
          res.end(JSON.stringify({ message: error.message }));
        }

        break;
      default:
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Request route not found' }));
        break;
    }
  },
  '/api/images/*': async ({ req, res }) => {
    const reqFile = req.url.substring(4);
    switch (req.method) {
      case 'GET':
        await retrieveFile(reqFile, res);
        break;
      default:
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Request route not found' }));
        break;
    }
  },
};

const types = {
  object: function (o) {
    return JSON.stringify(o);
  },
  string: function (s) {
    return s;
  },
  number: function (n) {
    return n + '';
  },
  undefined: function () {
    return 'Not found';
  },
  function: function (fn, par, client) {
    return fn(client, par);
  },
};

let matching = [];
for (key in routing) {
  if (key.indexOf('*') !== -1) {
    const rx = new RegExp(key.replace('*', '(.*)'));
    matching.push([rx, routing[key]]);
    delete routing[key];
  }
}

function router(client) {
  let rx,
    par,
    route = routing[client.req.url];

  if (route === undefined) {
    for (let i = 0, len = matching.length; i < len; i++) {
      rx = matching[i];
      par = client.req.url.match(rx[0]);

      if (par) {
        par.shift();
        route = rx[1];
        break;
      }
    }
  }
  const renderer = types[typeof route];
  return renderer(route, par, client);
}

async function sendHTML(res, html) {
  try {
    const filePath = path.join(process.cwd(), `./views/${html}.html`);
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': MIME_TYPES.html,
      'Content-Length': stat.size,
    });
    const rs = fs.createReadStream(filePath);
    return rs.pipe(res);
  } catch (err) {
    httpError(res, 500, JSON.stringify(err));
  }
}

module.exports = { router };
