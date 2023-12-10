import { prisma } from '../../prisma/database.js';

const Contest = {
  joinedUserIds: async (parent, args, info) => {
    return await prisma.user.findMany({
      where: {
        id: { in: parent.joinedUserIds },
      },
    });
  },
  contestPrizeList: async (parent, args, info) => {
    return await prisma.contest_Prize.findMany({
      where: {
        contestId: parent.id,
      },
    });
  },
};

export default Contest;
