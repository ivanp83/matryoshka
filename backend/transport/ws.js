'use strict';

const { Server } = require('ws');

module.exports = (routing, port, console) => {
  const ws = new Server({ port });

  ws.on('connection', (connection, req) => {
    const ip = req.socket.remoteAddress;
    connection.on('message', async (message) => {
      const obj = JSON.parse(message);

      const { name, method, args = [] } = obj;

      const entity = routing[name];
      console.log(name, method, args);
      if (!entity) return connection.send('"Not found"', { binary: false });
      const handler = entity[method];

      if (!handler) return connection.send('"Not found"', { binary: false });
      const json = JSON.stringify(args);

      const parameters = json.substring(1, json.length - 1);

      try {
        const result = await handler(...args);

        connection.send(JSON.stringify(result), { binary: false });
      } catch (err) {
        console.error(err);
        connection.send('"Server error"', { binary: false });
      }
    });
  });

  console.log(`API on port ${port}`);
};
