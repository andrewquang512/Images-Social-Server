const tagQuery = {
  allTags: async (parent, args, { prisma }, info) => {
    return await prisma.tag.findMany();
  },
  tagInfo: async (parent, args, { prisma }, info) => {
    return await prisma.tag.findUnique({
      where: {
        id: args.data.tag.toLowerCase(),
      },
    });
  },
};

export default tagQuery;
