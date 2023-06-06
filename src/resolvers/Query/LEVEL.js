const levelQuery = {
  allLevels: async (parent, args, { prisma }, info) => {
    return await prisma.level.findMany();
  },
  userLevel: async (parent, args, { prisma }, info) => {
    return await prisma.level.findUnique({
      where: {
        userID: args.userID,
      },
    });
  },
};

export default levelQuery;
