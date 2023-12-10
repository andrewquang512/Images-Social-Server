import { prisma } from '../../prisma/database.js';

const Contest_Prize = {
  contestId: async (parent, args, info) => {
    return await prisma.contest.findMany({
      where: {
        id: parent.contestId,
      },
    });
  },
  userId: async (parent, args, info) => {
    return await prisma.user.findMany({
      where: {
        id: parent.userId,
      },
    });
  },
};

export default Contest_Prize;
