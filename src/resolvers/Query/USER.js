const userQuery = {
  allUsers: async (parent, args, { prisma }, info) => {
    const result = await prisma.user.findMany();
    return result;
  },
  userInfo: async (parent, args, { prisma }, info) => {
    const result = prisma.user.findUnique({
      where: {
        // id: args.query.userID,
        id: args.id,
      },
    });
    return result;
  },
};

export default userQuery;
