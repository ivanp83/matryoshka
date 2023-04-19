'use strict';

const http = require('node:http');
const { checkHashToken } = require('../utils/crypto');
const { httpError } = require('../utils/error');
const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();

  return JSON.parse(data);
};
const crud = { get: 'read', post: 'create', put: 'update', delete: 'delete' };

module.exports = (routing, port, console) => {
  const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };
  http
    .createServer(async (req, res) => {
      const { method, url, headers, socket } = req;
      if (req.method === 'OPTIONS') {
        res.writeHead(204, HEADERS);
        res.end();
        return;
      }

      try {
        const [name, id] = url.substring(5).split('/');
        const entity = routing[name];

        if (!entity) return res.end('Route not found');
        const procedure = crud[method.toLowerCase()];
        const handler = entity[procedure];
        if (!handler) return res.end('Not found');
        const src = handler.toString();

        const signature = src.substring(0, src.indexOf(')'));

        const args = [];
        if (signature.includes('(id')) {
          args.push(id);
        }

        if (signature.includes('{') || signature.includes('data')) {
          args.push(await receiveArgs(req));
        }
        const token = headers?.authorization?.split(' ')[1];
        let isAdmin = true;
        if (token) {
          isAdmin = checkHashToken(token) === process.env.ADMIN_ID;
        }

        const result = await handler(...args, isAdmin);

        if (!result) {
          httpError(res, 500, 'Server error');
          return;
        }
        res.writeHead(200, {
          ...HEADERS,
        });

        res.end(JSON.stringify(result, null, 2));
      } catch (error) {
        console.dir({ error });
        httpError(res, 500, 'Server error');
      }
    })
    .listen(port);

  console.log(`Listen on port ${port}`);
};
