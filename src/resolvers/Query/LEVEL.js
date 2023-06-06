const levelQuery = {
  allLevels: async (parent, args, { prisma }, info) => {
    const result = await prisma.level.findMany();
    return result;
  },
  userLevel: async (parent, args, { prisma }, info) => {
    // if (!args.data.userID) {
    //   // const result = await prisma.level.findMany();
    //   console.log('No userID');
    //   return null;
    // }

    return await prisma.level.findUnique({
      where: {
        userID: args.userID,
      },
    });
  },
};

export default levelQuery;
