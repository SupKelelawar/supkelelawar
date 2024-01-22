const MIN_COMPRESS_LENGTH = 204;
const MIN_TRANSPARENT_COMPRESS_LENGTH = MIN_COMPRESS_LENGTH * 100;
const MAX_WIDTH = 240;
const MAX_HEIGHT = 320;

function resizeImage(imageData, maxWidth, maxHeight) {
  try {
    return sharp(imageData).resize({ width: maxWidth, height: maxHeight }).toBuffer();
  } catch (error) {
    console.error('Error resizing image:', error.message);
    throw error; // Rethrow the error to indicate the problem
  }
}

function shouldCompress(originType, originSize, webp, imageData) {
  if (!originType.startsWith('image') || originSize === 0) return false;
  
  if (webp && originSize < MIN_COMPRESS_LENGTH) return false;

  if (
    !webp &&
    (originType.endsWith('png') || originType.endsWith('gif')) &&
    originSize < MIN_TRANSPARENT_COMPRESS_LENGTH
  ) {
    return false;
  }

  try {
    // Attempt to resize the image
    const resizedImageData = resizeImage(imageData, MAX_WIDTH, MAX_HEIGHT);
    // If successful, return true
    return true;
  } catch (error) {
    // Log the error and return false if resizing fails
    console.error('Error in shouldCompress:', error.message);
    return false;
  }
}

module.exports = shouldCompress;
