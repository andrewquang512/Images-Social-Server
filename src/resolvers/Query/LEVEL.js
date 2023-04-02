const levelQuery = {
  allUserLevels: async (parent, args, { prisma }, info) => {
    if (!args.userID) {
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
        userID: args.userID,
      },
    });
  },
};

export default levelQuery;
