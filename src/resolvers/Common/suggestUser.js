/**
 * @typedef {object} UserSuggestionConfig
 * @property {number} following
 * @property {number} interest
 * @property {number} skill
 */

/**
 * @typedef {object} Category
 * @property {string} id
 */

/**
 * @typedef {object} Endorsement
 * @property {string} id
 * @property {string} skillId
 */

/**
 * @typedef {object} Following
 * @property {UserInfo[]} userFollowing
 */

/**
 * @typedef {object} UserInfo
 * @property {string} id
 * @property {Endorsement[]} endorsements
 * @property {Category[]} interestCategories
 * @property {Following} followings
 */

export class UserSuggestion {
  /**
   * @type {UserSuggestionConfig}
   */
  _configs = {};

  constructor() {
    try {
      const userSimilarWeight = JSON.parse(process.env.USER_SIMILAR_WEIGHT);
      this._configs.following = parseFloat(userSimilarWeight.following);
      this._configs.interest = parseFloat(userSimilarWeight.interest);
      this._configs.skill = parseFloat(userSimilarWeight.skill);
    } catch (error) {
      console.error(error);
      throw Error('USER_SIMILAR_WEIGHT env is not a valid JSON');
    }
  }

  /**
   * @param {UserInfo} currentUser
   * @param {UserInfo[]} userList
   * @returns {UserInfo[]}
   */
  getUserSuggestion = (currentUser, userList) => {
    /**
     * @type {Map<string, number>}
     */
    const similarMap = new Map();

    const currUserSkillIds = currentUser.endorsements.map(
      (each) => each.skillId,
    );
    const currUserInterestIds = currentUser.interestCategories.map(
      (each) => each.id,
    );
    const currUserFollowingIds = currentUser.followings.userFollowing.map(
      (each) => each.id,
    );

    userList.forEach((user) => {
      // Getting Similar for skill
      const userSkillIds = user.endorsements.map((each) => each.skillId);
      const skillSimilar = this.#getJaacardIndex(
        currUserSkillIds,
        userSkillIds,
      );
      similarMap.set(user.id, skillSimilar * this._configs.following);

      // Getting Similar for interesst
      const userInterestIds = user.interestCategories.map((each) => each.id);
      const interestSimilar = this.#getJaacardIndex(
        currUserInterestIds,
        userInterestIds,
      );
      similarMap.set(
        user.id,
        similarMap.get(user.id) + interestSimilar * this._configs.interest,
      );

      // Getting Similar for follow
      const userFollowingIds = user.followings.userFollowing.map(
        (each) => each.id,
      );
      const followingSimilar = this.#getJaacardIndex(
        currUserFollowingIds,
        userFollowingIds,
      );
      similarMap.set(
        user.id,
        (similarMap.get(user.id) + followingSimilar * this._configs.following) *
          10,
      );
    });

    const sortedMap = new Map(
      [...similarMap.entries()].sort((a, b) => b[1] - a[1]),
    );

    /**
     * @type {UserInfo[]}
     */
    const result = [];
    sortedMap.forEach((value, key) => {
      const foundUser = userList.find((user) => user.id === key);
      result.push(foundUser);
    });

    return result;
  };

  /**
   * @see https://en.wikipedia.org/wiki/Jaccard_index
   * @param {Ids} dataset1
   * @param {Ids} dataset2
   */
  #getJaacardIndex = (dataset1, dataset2) => {
    if (dataset1.length === 0 || dataset2.length === 0) {
      return 1;
    }
    const intersection = this.#getIntersection(dataset1, dataset2);
    const union = this.#getUnion(dataset1, dataset2);

    return intersection.length / union.length;
  };

  /**
   * @param {Ids} dataset1
   * @param {Ids} dataset2
   */
  #getIntersection = (dataset1, dataset2) => {
    return dataset1.filter((value) => dataset2.includes(value));
  };

  /**
   * @param {Ids} dataset1
   * @param {Ids} dataset2
   */
  #getUnion = (dataset1, dataset2) => {
    return [...new Set([...dataset1, ...dataset2])];
  };
}
