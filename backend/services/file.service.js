const { httpError } = require('../utils/error');
const fs = require('fs');
const path = require('path');
const PUBLIC_PATH = path.join(process.cwd(), './public/');

const prepareFile = async (url) => {
  const paths = [PUBLIC_PATH, url];
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(PUBLIC_PATH);
  const exists = await fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });

  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : new Error('Not allowed');
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

module.exports = { prepareFile };
