import { prisma } from '../../prisma/database.js';

const levelQuery = {
  allLevels: async (parent, args, info) => {
    return await prisma.level.findMany();
  },
  userLevel: async (parent, args, info) => {
    return await prisma.level.findUnique({
      where: {
        userId: args.data.userId,
      },
    });
  },
};

export default levelQuery;
