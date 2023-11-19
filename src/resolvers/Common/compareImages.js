import Jimp from 'jimp';

export function compareImages(image1hash, image2hash) {
  // Perceived distance
  const vihammingDistance = findHammingDistance(image1hash, image2hash);
  const jimphammingDistance = Jimp.compareHashes(image1hash, image2hash);

  console.log(
    `compareImages: vihammingDistance distance: ${vihammingDistance}`,
  );
  console.log(
    `compareImages: jimphammingDistance distance: ${jimphammingDistance}`,
  );

  if (vihammingDistance <= 10 && jimphammingDistance < 0.15) {
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
//
// const findLevenDistance = (a, b) => {
//   if (a.length == 0) return b.length;
//   if (b.length == 0) return a.length;
//
//   var matrix = [];
//
//   // increment along the first column of each row
//   var i;
//   for (i = 0; i <= b.length; i++) {
//     matrix[i] = [i];
//   }
//
//   // increment each column in the first row
//   var j;
//   for (j = 0; j <= a.length; j++) {
//     matrix[0][j] = j;
//   }
//
//   // Fill in the rest of the matrix
//   for (i = 1; i <= b.length; i++) {
//     for (j = 1; j <= a.length; j++) {
//       if (b.charAt(i - 1) == a.charAt(j - 1)) {
//         matrix[i][j] = matrix[i - 1][j - 1];
//       } else {
//         matrix[i][j] = Math.min(
//           matrix[i - 1][j - 1] + 1, // substitution
//           Math.min(
//             matrix[i][j - 1] + 1, // insertion
//             matrix[i - 1][j] + 1,
//           ),
//         ); // deletion
//       }
//     }
//   }
//
//   return matrix[b.length][a.length];
// };
