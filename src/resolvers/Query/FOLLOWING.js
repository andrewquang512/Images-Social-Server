const followingQuery = {
  allFollowing: async (parent, args, { prisma }, info) => {
    return await prisma.following.findMany();
  },
  userFollowingInfo: async (parent, args, { prisma }, info) => {
    return await prisma.following.findUnique({
      where: {
        userId: args.data.userId,
      },
    });
  },
};

export default followingQuery;
