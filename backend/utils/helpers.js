const Jimp = require('jimp');
const path = require('path');
const FILES_PATH = path.join(process.cwd(), 'public', 'images');
const convert = require('heic-convert');

async function heicToJpg(inputBuffer) {
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 1,
  });
  return outputBuffer;
}
const convertImage = async (base64, folder, size) =>
  new Promise(async (reslove, reject) => {
    const returnPath = path.join('images', folder, `${size}.jpg`);
    const filePath = `${FILES_PATH}/${folder}/${size}.jpg`;
    const fileFromBase64 = Buffer.from(
      base64.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
      'base64',
    );
    let fileToConvert = fileFromBase64;
    if (base64.split(',')[0].includes('image/heic')) {
      fileToConvert = await heicToJpg(fileFromBase64);
    }

    Jimp.read(fileToConvert)
      .then((image) => {
        const w = image.bitmap.width;
        const h = image.bitmap.height;
        const aspectRation = h / w;
        image.resize(size, size * aspectRation).write(filePath);
        return reslove(returnPath);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { convertImage };
