import Jimp from 'jimp';
import leven from 'leven';
import { SIMILAR_IMAGE_ALGORITHM } from '../../constants.js';

export function compareImages(
  image1hash,
  image2hash,
  algo = SIMILAR_IMAGE_ALGORITHM.ALL,
) {
  // Perceived distance
  const hammingDistance = Jimp.compareHashes(image1hash, image2hash);
  const levenDistance = leven(image1hash, image2hash);
  console.log(`compareImages: hamming distance: ${hammingDistance.toFixed(3)}`);
  console.log(`compareImages: leven distance: ${levenDistance.toFixed(3)}`);

  switch (algo) {
    case SIMILAR_IMAGE_ALGORITHM.HAMMING:
      if (hammingDistance < 0.15) {
        console.log('compareImages: Images match!');
        return true;
      }
      console.log('compareImages: Images do NOT match!');
      return false;
    case SIMILAR_IMAGE_ALGORITHM.LEVENSHTEIN:
      if (levenDistance <= 12) {
        console.log('compareImages: Images match!');
        return true;
      }
      console.log('compareImages: Images do NOT match!');
      return false;
    case SIMILAR_IMAGE_ALGORITHM.ALL:
      if (hammingDistance < 0.15 || levenDistance <= 12) {
        console.log('compareImages: Images match!');
        return true;
      }
      console.log('compareImages: Images do NOT match!');
      return false;
    default:
      throw Error('Similar Image Algorithm is not specified');
  }
}
