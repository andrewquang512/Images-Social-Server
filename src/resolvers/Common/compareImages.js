import Jimp from 'jimp';

export function compareImages(image1hash, image2hash) {
  // Perceived distance
  const distance = Jimp.compareHashes(image1hash, image2hash);
  console.log(`compareImages: distance: ${distance.toFixed(3)}`);

  if (distance < 0.15) {
    console.log('compareImages: Images match!');
    return true;
  } else {
    console.log('compareImages: Images do NOT match!');
    return false;
  }
}
