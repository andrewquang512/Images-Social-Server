import Jimp from 'Jimp';

export async function hashImage(imageUrl) {
  try {
    const image = await Jimp.read(imageUrl);
    return image.grayscale().pHash();
  } catch (error) {
    console.log(`hashImage Error: ${JSON.stringify(error)}`);
    throw error;
  }
}
