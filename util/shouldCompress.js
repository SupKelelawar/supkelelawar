const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;

function resizeImage(imageData, maxWidth, maxHeight) {
  // Tambahkan logika resize di sini, Anda bisa menggunakan pustaka seperti 'sharp' atau 'gm'.
  // Contoh menggunakan 'sharp':
  const sharp = require('sharp');
  return sharp(imageData).resize({ width: maxWidth, height: maxHeight }).toBuffer();
}

function shouldCompress(originType, originSize, webp, imageData) {
  if (!originType.startsWith("image") || originSize === 0) return false;
  if (webp && originSize < MIN_COMPRESS_LENGTH) return false;
  if (
    !webp &&
    (originType.endsWith("png") || originType.endsWith("gif")) &&
    originSize < MIN_TRANSPARENT_COMPRESS_LENGTH
  ) {
    return false;
  }

  // Tambahkan logika resize di sini sebelum mengembalikan true.
  const resizedImageData = resizeImage(imageData, MAX_WIDTH, MAX_HEIGHT);

  return true;
}

module.exports = shouldCompress;
