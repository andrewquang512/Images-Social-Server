// /**
//  * @typedef {string[]} Ids
//  */
//
// /**
//  *
//  * @param {Ids} followingUsers
//     followingUsers
//  * @param {Ids} similarInterestUsers
//  * @param {Ids} similarSkillUsers
//  * @param {Ids} user
//  */
// export const suggestUser = (followingUsers, similarInterestUsers, similarSkillUsers, user){
//     const allUser = getUnion(getUnion(followingUsers, similarInterestUsers), similarSkillUsers))
//     const following
// }
//
// /**
//  * @see https://en.wikipedia.org/wiki/Jaccard_index
//  * @param {Ids} dataset1
//  * @param {Ids} dataset2
//  */
// const getJaacardIndex = (dataset1, dataset2) => {
//     const intersection  = getIntersection(dataset1, dataset2)
//     const union  = getUnion(dataset1, dataset2)
//
//     return intersection.length / union.length
// }
//
// /**
//  * @param {Ids} dataset1
//  * @param {Ids} dataset2
//  */
// const getIntersection = (dataset1, dataset2) => {
//     return dataset1.filter(value => dataset2.includes(value));
// }
//
//
// /**
//  * @param {Ids} dataset1
//  * @param {Ids} dataset2
//  */
// const getUnion = (dataset1, dataset2) => {
//     return  [...new Set([...dataset1, ...dataset2])];
// }
