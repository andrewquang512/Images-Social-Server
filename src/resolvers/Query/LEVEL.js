const levelQuery = {
  allLevels: async (parent, args, { prisma }, info) => {
    return await prisma.level.findMany();
  },
  userLevel: async (parent, args, { prisma }, info) => {
    return await prisma.level.findUnique({
      where: {
        userId: args.data.userId,
      },
    });
  },
};

export default levelQuery;
