const userQuery = {
  allUsers: async (parent, args, { prisma }, info) => {
    return await prisma.user.findMany();
  },
  userInfo: async (parent, args, { prisma }, info) => {
    return await prisma.user.findUnique({
      where: {
        id: args.data.id,
      },
      include: {
        posts: true,
      },
    });
  },
};

export default userQuery;
