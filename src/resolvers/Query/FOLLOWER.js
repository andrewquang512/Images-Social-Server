import { prisma } from '../../prisma/database.js';

const followerQuery = {
  allFollower: async (parent, args, info) => {
    return await prisma.follower.findMany();
  },
  userFollowerInfo: async (parent, args, info) => {
    return await prisma.follower.findUnique({
      where: {
        userId: args.data.userId,
      },
    });
  },
};

export default followerQuery;
