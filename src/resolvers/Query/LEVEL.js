const levelQuery = {
  allUserLevels: async (parent, args, { prisma }, info) => {
    if (!args.query) {
      const result = await prisma.level.findMany();
      return result;
    }
  },
  userLevel: async (parent, args, { prisma }, info) => {
    // if (!args.data.userID) {
    //   // const result = await prisma.level.findMany();
    //   console.log('No userID');
    //   return null;
    // }

    return prisma.level.findUnique({
      where: {
        userID: args.query.userID,
      },
    });
  },
};

export default levelQuery;
