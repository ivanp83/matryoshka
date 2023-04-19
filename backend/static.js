'use strict';

const fs = require('node:fs');
const { Readable } = require('node:stream');
const http = require('node:http');
const path = require('node:path');
const STATIC_DIRECTORY = path.join(process.cwd(), 'public', 'images');
const STATIC_PATH_LENGTH = STATIC_DIRECTORY.length;

const cache = new Map();

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  json: 'application/json',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const cacheFile = async (filePath) => {
  const data = await fs.promises.readFile(filePath);
  const key = filePath.substring(STATIC_PATH_LENGTH);

  cache.set(key, data);
};

const cacheDirectory = async (directoryPath) => {
  const files = await fs.promises.readdir(directoryPath, {
    withFileTypes: true,
  });

  for (const file of files) {
    const filePath = path.join(directoryPath, file.name);

    if (file.isDirectory()) {
      await cacheDirectory(path.join(STATIC_DIRECTORY, file.name));
    } else {
      await cacheFile(filePath);
    }
  }
};

const prepareFile = async (url) => {
  const pathTraversal = !url.startsWith(url);
  const exists = await fs.promises
    .access(url, fs.constants.F_OK)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });

  const found = !pathTraversal && exists;
  const streamPath = found ? url : new Error('Not allowed');
  const ext = path.extname(streamPath).substring(1).toLowerCase();

  return { found, ext };
};

const listener = async (req, res) => {
  try {
    const url = req.url.substring(11);

    const pathToFile = path.join(STATIC_DIRECTORY, url);
    await cacheDirectory(STATIC_DIRECTORY);
    const { found, ext } = await prepareFile(pathToFile);
    const statusCode = found ? 200 : 404;
    const mimeType = MIME_TYPES[ext] || MIME_TYPES.default;
    const data = cache.get(url);

    const stream = Readable.from(data);
    res.writeHead(statusCode, { ...HEADERS, 'Content-Type': mimeType });
    return stream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = (root, port) => {
  http.createServer(listener).listen(port);
  console.log(`Static on port ${port}`);
};
