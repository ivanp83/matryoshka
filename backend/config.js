'use strict';

module.exports = {
  static: {
    port: 8001,
    transport: 'https',
  },
  api: {
    port: 8000,
    transport: 'https',
  },
  sandbox: {
    timeout: 5000,
    displayErrors: false,
  },
  db: {
    host: '127.0.0.1',
    port: 5432,
    database: 'mattest',
    user: 'postgres',
    password: 'postgres',
  },
};
