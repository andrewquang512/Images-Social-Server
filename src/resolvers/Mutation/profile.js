import { prisma } from '../../prisma/database.js';

const userMutation = {
  /**
   * @param {*} parent
   * @param {{data: {userId: string, content: string}}} args
   * @param {*} info
   * @returns
   */
  addBiography: async (parent, args, info) => {
    const { userId, conent } = args.data;
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        biography: conent,
      },
    });
  },
};

export default userMutation;
