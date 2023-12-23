import { prisma } from '../../prisma/database.js';

const followingQuery = {
  allFollowing: async (parent, args, info) => {
    return await prisma.following.findMany();
  },
  userFollowingInfo: async (parent, args, info) => {
    return await prisma.following.findUnique({
      where: {
        userId: args.data.userId,
      },
    });
  },
};

export default followingQuery;
