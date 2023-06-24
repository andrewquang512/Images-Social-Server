const categoryQuery = {
  allCategories: async (parent, args, { prisma }, info) => {
    return await prisma.category.findMany();
  },
  categoryInfo: async (parent, args, { prisma }, info) => {
    return await prisma.category.findUnique({
      where: {
        id: args.data.categoryId,
      },
    });
  },
};

export default categoryQuery;
