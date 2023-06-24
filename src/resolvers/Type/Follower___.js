const Follower = {
  userId: async (parent, args, { prisma }, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  userFollower: async (parent, args, { prisma }, info) => {
    return await prisma.user.findMany({
      where: {
        id: { in: parent.userFollower },
      },
    });
  },
};

export default Follower;
