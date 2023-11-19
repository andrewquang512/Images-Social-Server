export function compareImages(image1hash, image2hash) {
  // Perceived distance
  const hammingDistance = findHammingDistance(image1hash, image2hash);
  console.log(`compareImages: hamming distance: ${hammingDistance.toFixed(3)}`);

  if (hammingDistance <= 10) {
    console.log('compareImages: Images match!');
    return true;
  }
  console.log('compareImages: Images do NOT match!');
  return false;
}

const findHammingDistance = (str1 = '', str2 = '') => {
  let distance = 0;
  if (str1.length === str2.length) {
    for (let i = 0; i < str1.length; i++) {
      if (str1[i].toLowerCase() != str2[i].toLowerCase()) {
        distance++;
      }
    }
    return distance;
  }
  return 0;
};
