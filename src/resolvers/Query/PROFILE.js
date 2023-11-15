import _ from 'lodash';
import { prisma } from '../../prisma/database.js';
import { DEFAULT_LIMIT } from '../../constants.js';

const profileQuery = {
  /**
   * @param {*} parent
   * @param {{data: {userId: string}}} args
   * @param {*} info
   * @returns
   */
  getProfile: async (parent, args, info) => {
    const { userId } = args.data;
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!result) return null;
    return result;
  },
};

export default profileQuery;
