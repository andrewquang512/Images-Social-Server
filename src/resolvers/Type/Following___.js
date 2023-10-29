import { prisma } from '../../prisma/database.js';

const Following = {
  userId: async (parent, args, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  userFollowing: async (parent, args, info) => {
    return await prisma.user.findMany({
      where: {
        id: { in: parent.userFollowing },
      },
    });
  },
};

export default Following;
