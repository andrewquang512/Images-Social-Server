const Following = {
  userId: async (parent, args, { prisma }, info) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  userFollowing: async (parent, args, { prisma }, info) => {
    return await prisma.user.findMany({
      where: {
        id: { in: parent.userFollowing },
      },
    });
  },
};

export default Following;
