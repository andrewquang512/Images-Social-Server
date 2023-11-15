import { prisma } from '../../prisma/database.js';

const profileMutation = {
  /**
   * @param {*} parent
   * @param {{data: {userId: string, content: string}}} args
   * @param {*} info
   * @returns
   */
  addBiography: async (parent, args, info) => {
    const { userId, content } = args.data;
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        biography: content,
      },
    });
  },

  /**
   * @param {*} parent
   * @param {{data: {skillId: string, userId: string}}} args
   * @param {*} info
   * @returns
   */
  // TODO add check skill is already added
  addSkill: async (parent, args, info) => {
    const { skillId, userId } = args.data;

    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        user_to_endorsement: {
          create: {
            skill: {
              connect: {
                id: skillId,
              },
            },
          },
        },
      },
    });
  },
};

export default profileMutation;
