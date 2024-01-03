import { prisma } from '../../prisma/database.js';

const Contest_Prize = {
  contestId: async (parent, args, info) => {
    return await prisma.contest.findUnique({
      where: {
        id: parent.contestId,
      },
    });
  },
  userId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};

export default Contest_Prize;
