const levelQuery = {
  allUserLevels: async (parent, args, { prisma }, info) => {
    if (!args.query) {
      const result = await prisma.level.findMany();
      return result;
    }
  },
};

export default levelQuery;
