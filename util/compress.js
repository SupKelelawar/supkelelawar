const sharp = require("sharp");

function resizeDanCompress(input, webp, grayscale, quality, originSize, maxWidth, maxHeight) {
  const format = webp ? "webp" : "jpeg";

  return sharp(input)
    .grayscale(grayscale)
    .resize({ width: maxWidth, height: maxHeight, fit: 'inside' }) // Logika resize gambar
    .toFormat(format, {
      quality: quality,
      progressive: true,
      optimizeScans: true,
    })
    .toBuffer({ resolveWithObject: true })
    .then(({ data: output, info }) => {
      return {
        err: null,
        headers: {
          "content-type": `image/${format}`,
          "content-length": info.size,
          "x-original-size": originSize,
          "x-bytes-saved": originSize - info.size,
        },
        output: output,
      };
    })
    .catch((err) => {
      return {
        err: err,
      };
    });
}

module.exports = resizeDanCompress;
