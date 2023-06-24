const followerQuery = {
  allFollower: async (parent, args, { prisma }, info) => {
    return await prisma.follower.findMany();
  },
  userFollowerInfo: async (parent, args, { prisma }, info) => {
    return await prisma.follower.findUnique({
      where: {
        userId: args.data.userId,
      },
    });
  },
};

export default followerQuery;
